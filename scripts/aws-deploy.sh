#!/bin/bash
set -e

REPOSITORY=/home/ubuntu/deploy-fe

cd $REPOSITORY

echo "Removing existing node_modules..."
rm -rf ./node_modules

echo "Installing npm dependencies..."
npm install

echo "Deployment completed successfully."