#!/bin/bash

echo "🔧 COMPREHENSIVE BUILD & DEPLOYMENT FIX"
echo "========================================"

# Navigate to project directory
cd /Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com/__tests__/components/AlphaAiStockX4

echo "🧹 Cleaning build artifacts..."
rm -rf .next
rm -rf node_modules/.cache
rm -f tsconfig.tsbuildinfo

echo "📦 Installing/updating dependencies..."
npm install

echo "🔍 Checking for TypeScript errors..."
npx tsc --noEmit --skipLibCheck

echo "🛠️ Running ESLint to fix code issues..."
npm run lint:fix

echo "🎨 Formatting code..."
npm run format

echo "🔨 Testing build..."
npm run build

echo ""
echo "✅ BUILD FIX COMPLETE!"
echo "If there are still errors, they will be shown above."
