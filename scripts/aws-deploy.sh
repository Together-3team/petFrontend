#!/bin/bash
set -e

REPOSITORY=/home/ubuntu/pawing-fe

cd $REPOSITORY

echo "Removing existing node_modules..."
rm -rf ./node_modules

echo "Installing npm dependencies..."
npm install

echo "Reloading PM2 process..."
pm2 restart pawing-fe-app || (pm2 delete pawing-fe-app && pm2 start "npm run start" --name pawing-fe-app)

echo "Saving PM2 process list..."
pm2 save

echo "Deployment completed successfully."