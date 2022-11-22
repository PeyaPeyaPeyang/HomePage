#!/usr/bin/env bash

echo "Running pre.sh..."
bash scripts/deploy/pre.sh

echo "Installing pnpm..."
npm install -g pnpm

echo "Installing dependencies..."
pnpm install

echo "Building..."
pnpm build

echo "Running post.sh..."
bash scripts/deploy/post.sh
