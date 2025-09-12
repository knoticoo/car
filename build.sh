#!/bin/bash

echo "Building Mitsubishi ASX 2011 Helper App..."

# Compile TypeScript
echo "Compiling TypeScript..."
npx tsc

if [ $? -eq 0 ]; then
    echo "✅ TypeScript compilation successful"
else
    echo "❌ TypeScript compilation failed"
    exit 1
fi

# Copy static files to dist
echo "Copying static files..."
mkdir -p dist
cp -r icons dist/
cp manifest.json dist/
cp sw.js dist/

echo "✅ Build complete!"
echo "You can now serve the app from the root directory"