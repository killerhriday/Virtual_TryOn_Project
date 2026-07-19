#!/bin/bash

# A quick script to add, commit, and push code to GitHub

if [ -z "$1" ]; then
    COMMIT_MSG="Update project files"
else
    COMMIT_MSG="$1"
fi

echo "📦 Staging all files..."
git add .

echo "📝 Committing with message: '$COMMIT_MSG'"
git commit -m "$COMMIT_MSG"

echo "☁️  Pushing to GitHub..."
git push

echo "✅ Done!"
