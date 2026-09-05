# #!/bin/bash
# # save as: quickpush.sh (place at repo root or somewhere in PATH)

# set -e  # stop on first error

# # Use passed message, or default to a timestamped one
# MSG=${1:-"update: $(date '+%Y-%m-%d %H:%M')"}

# git add .
# git commit -m "$MSG"
# git push

# echo "✅ Pushed with message: $MSG"


#!/bin/bash

set -e  # Stop on first error

# Get current branch

BRANCH=$(git branch --show-current)

# Prevent accidental pushes directly to main

if [ "$BRANCH" = "main" ]; then
echo "❌ ERROR: You are currently on the main branch!"
echo "Switch to develop before pushing changes."
exit 1
fi

# Use passed message, or default to a timestamped one

MSG=${1:-"update: $(date '+%Y-%m-%d %H:%M')"}

echo "📂 Current branch: $BRANCH"

git add .
git commit -m "$MSG"
git push

echo "✅ Pushed to $BRANCH with message: $MSG"
