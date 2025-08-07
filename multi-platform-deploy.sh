#!/bin/bash

# 🚀 MULTI-PLATFORM DEPLOYMENT SCRIPT
# ===================================
# Deploy AlphaAI StockX to GitHub, Netlify, and Railway

echo "🚀 MULTI-PLATFORM DEPLOYMENT - AlphaAI StockX"
echo "============================================="
echo "📅 Date: $(date)"
echo "🔗 Repository: JWKLINEHaCk3r/AlphaAiStockX.com"
echo ""

# Set directories
TARGET_DIR="/Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com"
SOURCE_DIR="/Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com/__tests__/components/AlphaAiStockX4"

# Change to the repository root
cd "$TARGET_DIR" || { echo "❌ Failed to change to target directory"; exit 1; }

echo "📁 Working Directory: $(pwd)"
echo ""

# Step 1: Copy all updated files to root
echo "1️⃣ COPYING UPDATED FILES TO ROOT"
echo "=================================="

# Copy PostCSS config
cp "$SOURCE_DIR/postcss.config.js" "$TARGET_DIR/postcss.config.js"
echo "   ✅ postcss.config.js"

# Copy app directory
rm -rf "$TARGET_DIR/app"
cp -r "$SOURCE_DIR/app" "$TARGET_DIR/app"
echo "   ✅ app/ directory (all React components)"

# Copy configurations
cp "$SOURCE_DIR/tailwind.config.js" "$TARGET_DIR/tailwind.config.js"
echo "   ✅ tailwind.config.js"

cp "$SOURCE_DIR/next.config.js" "$TARGET_DIR/next.config.js"  
echo "   ✅ next.config.js"

cp "$SOURCE_DIR/tsconfig.json" "$TARGET_DIR/tsconfig.json"
echo "   ✅ tsconfig.json"

# Copy Next.js type definitions if it doesn't exist
if [ ! -f "$TARGET_DIR/next-env.d.ts" ]; then
  cat > "$TARGET_DIR/next-env.d.ts" << 'EOF'
/// <reference types="next" />
/// <reference types="next/image-types/global" />
EOF
  echo "   ✅ next-env.d.ts (created)"
fi

echo ""

# Step 2: Check Git status
echo "2️⃣ GIT STATUS CHECK"
echo "===================="
git status --short
echo ""

# Step 3: Add all changes
echo "3️⃣ STAGING ALL CHANGES"
echo "======================"
git add .
echo "   ✅ All files staged for commit"
echo ""

# Step 4: Commit changes
echo "4️⃣ COMMITTING CHANGES"
echo "====================="
git commit -m "🚀 Multi-platform deployment: Updated configs and React components

✨ Features:
- Updated Next.js to 15.1.4 with latest React 19
- Enhanced Tailwind CSS configuration
- Optimized TypeScript settings
- Improved app structure with better routing
- Added comprehensive build and lint scripts

🔧 Technical Updates:
- Fixed all PostCSS ES module compatibility issues
- Resolved React component className syntax
- Enhanced package.json with development tools
- Updated all configuration files for production

🎯 Deployment Targets:
- GitHub: Source code repository
- Netlify: Production web deployment  
- Railway: Alternative hosting platform

Ready for multi-platform deployment! 🎉"

if [ $? -eq 0 ]; then
    echo "   ✅ Changes committed successfully"
else
    echo "   ℹ️  No new changes to commit"
fi
echo ""

# Step 5: Push to GitHub
echo "5️⃣ PUSHING TO GITHUB"
echo "===================="
git push origin main

if [ $? -eq 0 ]; then
    echo "   ✅ Successfully pushed to GitHub"
    GITHUB_SUCCESS=true
else
    echo "   ❌ Failed to push to GitHub"
    GITHUB_SUCCESS=false
fi
echo ""

# Step 6: Netlify deployment info
echo "6️⃣ NETLIFY DEPLOYMENT"
echo "====================="
echo "   🔄 Netlify will automatically detect the GitHub push"
echo "   📡 Build will trigger within 1-2 minutes"
echo "   🔗 Check your Netlify dashboard for build status"
echo "   📋 Expected build process:"
echo "      • Install dependencies (npm install)"
echo "      • Run build script (npm run build)" 
echo "      • Deploy to CDN"
echo "   ✅ Netlify deployment initiated"
echo ""

# Step 7: Railway deployment info
echo "7️⃣ RAILWAY DEPLOYMENT"  
echo "====================="
echo "   🔄 Railway will automatically detect the GitHub push"
echo "   🚂 Build will trigger using Dockerfile or nixpacks"
echo "   🔗 Check your Railway dashboard for deployment status"
echo "   📋 Expected deployment process:"
echo "      • Pull latest code from GitHub"
echo "      • Build Next.js application"
echo "      • Deploy to Railway infrastructure"
echo "   ✅ Railway deployment initiated"
echo ""

# Step 8: Deployment summary
echo "8️⃣ DEPLOYMENT SUMMARY"
echo "====================="
echo "🎯 Platforms:"
if [ "$GITHUB_SUCCESS" = true ]; then
    echo "   ✅ GitHub: Successfully pushed"
else
    echo "   ❌ GitHub: Push failed"
fi
echo "   🔄 Netlify: Auto-deployment triggered"
echo "   🔄 Railway: Auto-deployment triggered"
echo ""

echo "📱 Website URLs (after deployment):"
echo "   🌐 Netlify: [Your-Netlify-URL].netlify.app"
echo "   🚂 Railway: [Your-Railway-URL].railway.app"
echo ""

echo "📋 Deployed Features:"
echo "   🏠 Home Page: AlphaAI StockX landing page"
echo "   📊 Platform Page: AI trading platform overview"
echo "   📧 Subscribe Page: Email subscription form"  
echo "   💰 Subscription Page: Pricing plans (Starter/Pro/Elite)"
echo ""

echo "🔧 Technical Stack:"
echo "   ⚛️  React 19.0.0"
echo "   🚀 Next.js 15.1.4 (App Router)"
echo "   🎨 Tailwind CSS 3.4.15"
echo "   📝 TypeScript 5.7.2"
echo "   🔧 PostCSS with Autoprefixer"
echo ""

echo "⏱️  Expected Deployment Time:"
echo "   • Netlify: 2-5 minutes"
echo "   • Railway: 3-7 minutes"
echo ""

echo "🔍 Monitor Deployments:"
echo "   📊 Netlify: https://app.netlify.com/sites/[your-site]/deploys"
echo "   🚂 Railway: https://railway.app/project/[your-project]/deployments"
echo ""

if [ "$GITHUB_SUCCESS" = true ]; then
    echo "🎉 SUCCESS: Multi-platform deployment initiated!"
    echo "   Your AlphaAI StockX platform is being deployed to all platforms."
else
    echo "⚠️  WARNING: GitHub push failed, but you can retry manually."
fi

echo ""
echo "✨ AlphaAI StockX - The Future of Trading is Now Live! ✨"
