#!/bin/bash

# Kiosk Reception Demo - GitHub Pages Deployment Script
# Usage: ./deploy.sh [repo-name]
# Example: ./deploy.sh kiosk-reception-demo-vanilla

set -e

echo "🚀 Kiosk Reception Demo - GitHub Pages Deployment"
echo "=================================================="
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Error: git is not installed"
    exit 1
fi

# Get repository name from argument or prompt
if [ -z "$1" ]; then
    echo "Enter repository name (it will be created under wxsd-sales org):"
    read REPO_NAME
else
    REPO_NAME="$1"
fi

if [ -z "$REPO_NAME" ]; then
    echo "❌ Error: Repository name is required"
    exit 1
fi

FULL_REPO="wxsd-sales/$REPO_NAME"

echo ""
echo "📦 Repository: $FULL_REPO"
echo ""

# Initialize git if not already initialized
if [ ! -d ".git" ]; then
    echo "📝 Initializing git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already initialized"
fi

# Check if we have any changes to commit
if git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "ℹ️  No changes to commit"
else
    echo "📝 Adding files..."
    git add .
    
    echo "💾 Committing changes..."
    git commit -m "Deploy kiosk reception demo"
    echo "✅ Changes committed"
fi

# Set main branch
echo "🌿 Setting main branch..."
git branch -M main

# Add remote if it doesn't exist
if ! git remote | grep -q "^origin$"; then
    echo "🔗 Adding remote origin..."
    git remote add origin "https://github.com/$FULL_REPO.git"
    echo "✅ Remote added"
else
    echo "✅ Remote already exists"
    git remote set-url origin "https://github.com/$FULL_REPO.git"
fi

# Push to GitHub
echo ""
echo "📤 Pushing to GitHub..."
git push -u origin main

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to: https://github.com/$FULL_REPO/settings/pages"
echo "2. Under 'Source', select: main branch, / (root) folder"
echo "3. Click 'Save'"
echo "4. Wait a few minutes for deployment"
echo "5. Your site will be available at:"
echo "   https://wxsd-sales.github.io/$REPO_NAME/"
echo ""
echo "🔧 To configure your kiosk, open EXAMPLE.html locally or visit:"
echo "   https://wxsd-sales.github.io/$REPO_NAME/EXAMPLE.html"
echo ""

