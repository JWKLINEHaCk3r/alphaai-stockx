# Netlify Build Fix Guide

## Issues Found:
1. Tailwind CSS missing from production dependencies
2. Invalid next.config.js with deprecated appDir option
3. Module resolution issues with @/ imports

## Fixed Files:

### 1. Root package.json 
Move these to dependencies (not devDependencies):
- tailwindcss
- autoprefixer 
- postcss
- typescript

### 2. Root next.config.mjs
Remove deprecated experimental.appDir option

### 3. Root tsconfig.json
Ensure proper path mapping for @/* imports

### 4. Required Files in Root:
- app/ directory with all pages
- components/ directory with UI components
- lib/ directory with utilities
- public/ directory with static assets
- middleware.ts for security headers

## Netlify Configuration:
- Build command: npm install && npm run build
- Publish directory: .next
- Node version: 18+

## Deploy Commands:
```bash
# Copy all files from workspace to root
cp -r __tests__/components/AlphaAiStockX4/* ./
# Update package.json dependencies
# Update next.config.mjs
# Commit and push to trigger rebuild
```
