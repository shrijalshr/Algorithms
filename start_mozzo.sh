#!/bin/bash
set -e

# Navigate to project directory
cd mozzo-cafe

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Run development server
echo "Starting development server..."
npm run dev
