#!/bin/bash
# save as: quickpush.sh (place at repo root or somewhere in PATH)

set -e  # stop on first error

# Use passed message, or default to a timestamped one
MSG=${1:-"update: $(date '+%Y-%m-%d %H:%M')"}

git add .
git commit -m "$MSG"
git push

echo "✅ Pushed with message: $MSG"