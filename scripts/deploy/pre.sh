#!/usr/bin/env bash

echo "Creating github deployment..."

normalize_and_encode() (
  json=$(cat \
    | sed 's/\\"/\\042/g' \
    | sed 's/"[^"]*"/\n&\n/g' \
    | sed '/^"/!s/ //g' \
    | sed '/^"/{
      s/,/\\054/g
      s/\[/\\133/g
      s/\]/\\135/g
      s/{/\\173/g
      s/}/\\175/g
    }' \
    | tr -d '\n'
  )
  while printf %s "$json" | grep '[[{]' > /dev/null; do
    json=$(printf %s "$json" \
      | sed 's/[[{][^][}{]*[]}]/\n&\n/g' \
      | sed '/^[[{].*[]}]$/{
        s/\\/\\\\/g
        s/,/\\054/g
        s/\[/\\133/g
        s/\]/\\135/g
        s/{/\\173/g
        s/}/\\175/g
      }' \
      | tr -d '\n'
    )
  done
  printf %s "$json"
)

# Create a deployment
root=$(printf %b $(curl \
   -X POST \
   -H "Accept: application/vnd.github+json" \
   -H "Authorization: Bearer $GITHUB_TOKEN" \
   https://api.github.com/repos/"$GITHUB_REPOSITORY"/deployments \
   -d '{
       "ref": "'"$CF_PAGES_COMMIT_SHA"'",
       "environment": "'"$DEPLOYMENT_MODE"'",
       "description": "Deploy to Cloudflare Pages",
       "required_contexts": [],
       "auto_merge": false
       }' | normalize_and_encode) | tr -d '{}' | sed 's/,/\n/g')

printf %s "$root" | sed -n 's/^"id"://p' > .github/deployment_id

DEPLOYMENT_ID=$(cat .github/deployment_id)

# Set the deployment status to in_progress

curl \
    -X POST \
    -H "Authorization: Bearer $GITHUB_TOKEN "\
    https://api.github.com/repos/"$GITHUB_REPOSITORY"/deployments/"$DEPLOYMENT_ID"/statuses \
    -d '{
        "state": "in_progress",
        "description": "Deploying to Cloudflare Pages",
        "environment_url": "'"$CF_PAGES_URL"'"
        }'
