#!/bin/bash

# Configuration - Set these or use environment variables
REMOTE_USER="bankng15"  # Replace or export as environment variable
REMOTE_HOST="bank360.ng"        # Replace or export as environment variable
REMOTE_PATH="/home/bankng15/public_html"  # Replace or export as environment variable

# Check if SSH_KEY is set
if [ -z "$SSH_KEY" ]; then
  echo "Error: SSH_KEY is not set. Please set it as an environment variable."
  exit 1
fi

# Step 1: Build the React app
echo "Building the React app..."
npm install && npm run build || { echo "Build failed. Exiting."; exit 1; }

# Step 2: Deploy via rsync
echo "Deploying files to the server..."
rsync -avz --delete -e "ssh -i $SSH_KEY" ./build/ $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH || { echo "Deployment failed. Exiting."; exit 1; }

echo "Deployment complete!"
