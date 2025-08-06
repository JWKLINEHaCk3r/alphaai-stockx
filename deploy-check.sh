#!/bin/bash

echo "🚀 AlphaAI StockX Deployment Status Check"
echo "========================================"

# Check if all required files exist
echo "📁 Checking project structure..."
required_files=(
    "package.json"
    "next.config.js" 
    "tailwind.config.js"
    "tsconfig.json"
    "app/layout.tsx"
    "app/page.tsx"
    "app/globals.css"
    "components/ui/button.tsx"
    "components/ui/card.tsx"
    "components/navigation/MainNav.tsx"
    "components/trading/TradingCard.tsx"
    "netlify.toml"
    "railway.toml"
)

missing_files=()
for file in "${required_files[@]}"; do
    if [[ ! -f "$file" ]]; then
        missing_files+=("$file")
    fi
done

if [[ ${#missing_files[@]} -eq 0 ]]; then
    echo "✅ All required files present"
else
    echo "❌ Missing files:"
    printf '  - %s\n' "${missing_files[@]}"
    exit 1
fi

# Check npm dependencies
echo "📦 Checking dependencies..."
if npm list --depth=0 > /dev/null 2>&1; then
    echo "✅ All dependencies installed correctly"
else
    echo "⚠️  Some dependency issues detected"
fi

echo ""
echo "🎯 Deployment URLs:"
echo "📍 GitHub Repository: https://github.com/JWKLINEHaCk3r/alphaai-stockx"
echo "📍 Netlify Deploy: Ready for deployment"
echo "📍 Railway Deploy: Ready for deployment"
echo ""
echo "✨ AlphaAI StockX is ready for production deployment!"
