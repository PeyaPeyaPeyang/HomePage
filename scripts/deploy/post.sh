#!/usr/bin/env bash

echo "Posting deployment status(Success)..."

DEPLOYMENT_ID=$(cat .github/deployment_id)

# Create a deployment status

curl \
    -X POST \
    -H "Accept: application/vnd.github+json" \
    -H "Authorization: Bearer $GITHUB_TOKEN" \
    https://api.github.com/repos/"$GITHUB_REPOSITORY"/deployments/"$DEPLOYMENT_ID"/statuses \
    -d '{
        "state": "success",
        "description": "Deployed to Cloudflare Pages",
        "environment_url": "'"$CF_PAGES_URL"'"
        }'
