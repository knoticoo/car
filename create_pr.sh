#!/bin/bash

# Create Pull Request Script for Mitsubishi ASX 2011 App
# This script provides instructions for creating a PR manually

echo "🚗 Mitsubishi ASX 2011 Helper - Pull Request Creation"
echo "======================================================"
echo ""

# Get repository information
REPO_URL=$(git remote get-url origin 2>/dev/null)
if [ $? -eq 0 ]; then
    echo "📋 Repository: $REPO_URL"
else
    echo "❌ Not in a Git repository"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current)
echo "🌿 Current Branch: $CURRENT_BRANCH"
echo ""

# Check if we're on a feature branch
if [[ "$CURRENT_BRANCH" == "main" || "$CURRENT_BRANCH" == "master" ]]; then
    echo "⚠️  Warning: You're on the main branch. Create a feature branch first:"
    echo "   git checkout -b feature/mitsubishi-asx-2011-app"
    exit 1
fi

echo "✅ Ready to create pull request!"
echo ""

# Display PR information
echo "📝 Pull Request Details:"
echo "   Title: feat: Add comprehensive Mitsubishi ASX 2011 Helper application"
echo "   Description: See GITHUB_PR_TEMPLATE.md for full details"
echo "   Base Branch: main"
echo "   Head Branch: $CURRENT_BRANCH"
echo ""

# Check if we can push
echo "🔍 Checking if branch is pushed to remote..."
if git push --dry-run origin $CURRENT_BRANCH >/dev/null 2>&1; then
    echo "✅ Branch is up to date with remote"
else
    echo "📤 Pushing branch to remote..."
    git push origin $CURRENT_BRANCH
fi

echo ""
echo "🌐 To create the pull request:"
echo "   1. Go to: https://github.com/$(echo $REPO_URL | sed 's/.*github.com[:/]\([^/]*\/[^/]*\)\.git/\1/')/compare/main...$CURRENT_BRANCH"
echo "   2. Use the title: 'feat: Add comprehensive Mitsubishi ASX 2011 Helper application'"
echo "   3. Copy the content from GITHUB_PR_TEMPLATE.md as the description"
echo "   4. Add any additional reviewers or labels"
echo "   5. Click 'Create Pull Request'"
echo ""

# Try to open the URL if possible
if command -v xdg-open >/dev/null 2>&1; then
    PR_URL="https://github.com/$(echo $REPO_URL | sed 's/.*github.com[:/]\([^/]*\/[^/]*\)\.git/\1/')/compare/main...$CURRENT_BRANCH"
    echo "🔗 Opening PR creation page..."
    xdg-open "$PR_URL" 2>/dev/null || echo "   Please open the URL manually: $PR_URL"
elif command -v open >/dev/null 2>&1; then
    PR_URL="https://github.com/$(echo $REPO_URL | sed 's/.*github.com[:/]\([^/]*\/[^/]*\)\.git/\1/')/compare/main...$CURRENT_BRANCH"
    echo "🔗 Opening PR creation page..."
    open "$PR_URL" 2>/dev/null || echo "   Please open the URL manually: $PR_URL"
else
    echo "🔗 Please open this URL to create the PR:"
    echo "   https://github.com/$(echo $REPO_URL | sed 's/.*github.com[:/]\([^/]*\/[^/]*\)\.git/\1/')/compare/main...$CURRENT_BRANCH"
fi

echo ""
echo "📋 PR Summary:"
echo "   - Complete web application for Mitsubishi ASX 2011 owners"
echo "   - 500+ error codes with Russian descriptions"
echo "   - Interactive troubleshooting and repair guides"
echo "   - Parts catalog with 1000+ items"
echo "   - Mobile-responsive design"
echo "   - Safe service management on port 3050"
echo "   - Comprehensive documentation and testing"
echo ""
echo "✅ Ready to create pull request!"