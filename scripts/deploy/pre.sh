#!/usr/bin/env bash

echo "Creating github deployment..."

apt install jq

# Create a deployment
curl \
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
       }' | jq -r '.id' > .github/deployment_id

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
