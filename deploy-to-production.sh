#!/bin/bash

echo "🚀 Deploying AlphaAI StockX to GitHub, Netlify, and Railway"
echo "============================================================="

# Get the source and destination paths
SOURCE_DIR="/Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com/__tests__/components/AlphaAiStockX4"
DEST_DIR="/Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com"

echo "📁 Source: $SOURCE_DIR"
echo "📁 Destination: $DEST_DIR"

# Copy all necessary files and directories
echo ""
echo "📋 Copying updated files..."

# Copy app directory
echo "• Copying app/ directory..."
cp -r "$SOURCE_DIR/app" "$DEST_DIR/"

# Copy components directory
echo "• Copying components/ directory..."
cp -r "$SOURCE_DIR/components" "$DEST_DIR/"

# Copy lib directory
echo "• Copying lib/ directory..."
cp -r "$SOURCE_DIR/lib" "$DEST_DIR/"

# Copy public directory
echo "• Copying public/ directory..."
cp -r "$SOURCE_DIR/public" "$DEST_DIR/"

# Copy configuration files
echo "• Copying configuration files..."
cp "$SOURCE_DIR/next.config.mjs" "$DEST_DIR/"
cp "$SOURCE_DIR/tailwind.config.mjs" "$DEST_DIR/"
cp "$SOURCE_DIR/tsconfig.json" "$DEST_DIR/"
cp "$SOURCE_DIR/postcss.config.js" "$DEST_DIR/"
cp "$SOURCE_DIR/eslint.config.js" "$DEST_DIR/"
cp "$SOURCE_DIR/middleware.ts" "$DEST_DIR/"

# Copy environment files
echo "• Copying environment files..."
cp "$SOURCE_DIR/.env.example" "$DEST_DIR/"
cp "$SOURCE_DIR/.env.local" "$DEST_DIR/"

# Copy prettier configuration
echo "• Copying prettier configuration..."
cp "$SOURCE_DIR/.prettierrc" "$DEST_DIR/"
cp "$SOURCE_DIR/.prettierignore" "$DEST_DIR/"

# Copy package.json (already updated)
echo "• Package.json already updated in destination"

# Copy deployment configurations
echo "• Copying deployment configurations..."
cp "$SOURCE_DIR/netlify.toml" "$DEST_DIR/" 2>/dev/null || echo "  - netlify.toml not found, will create"
cp "$SOURCE_DIR/railway.toml" "$DEST_DIR/" 2>/dev/null || echo "  - railway.toml not found, will create"
cp "$SOURCE_DIR/Dockerfile" "$DEST_DIR/" 2>/dev/null || echo "  - Dockerfile not found, will create"

echo ""
echo "✅ Files copied successfully!"

echo ""
echo "🔧 Next steps:"
echo "1. Review the copied files in $DEST_DIR"
echo "2. Run 'npm install' to update dependencies"
echo "3. Run 'npm run build' to test the build"
echo "4. Commit and push to GitHub"
echo "5. Deploy to Netlify and Railway"

echo ""
echo "📝 Deployment commands:"
echo "cd $DEST_DIR"
echo "npm install"
echo "npm run build"
echo "git add -A"
echo "git commit -m 'feat: modernize project with latest tech stack and fix all deprecated patterns'"
echo "git push origin main"
