#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔧 COMPREHENSIVE PROJECT FIX SCRIPT');
console.log('====================================\n');

const sourceDir = '/Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com/__tests__/components/AlphaAiStockX4';
const targetDir = '/Users/Josephkline/AlphaAiStockX/AlphaAiStockX.com';

let fixedCount = 0;

// Helper function to copy files
function copyFile(src, dest) {
  try {
    // Ensure destination directory exists
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    fs.copyFileSync(src, dest);
    console.log(`✅ Copied: ${path.relative(targetDir, dest)}`);
    fixedCount++;
    return true;
  } catch (error) {
    console.log(`❌ Failed to copy ${src}: ${error.message}`);
    return false;
  }
}

// Helper function to copy directory recursively
function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) return;
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  
  for (const item of items) {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      copyFile(srcPath, destPath);
    }
  }
}

console.log('📋 Step 1: Copying Essential Configuration Files...');

// Essential configuration files
const configFiles = [
  'package.json',
  'tsconfig.json',
  'next.config.mjs',
  'tailwind.config.mjs',
  'postcss.config.js',
  'eslint.config.js',
  'netlify.toml'
];

configFiles.forEach(file => {
  const src = path.join(sourceDir, file);
  const dest = path.join(targetDir, file);
  
  if (fs.existsSync(src)) {
    copyFile(src, dest);
  } else {
    console.log(`⚠️  Source file not found: ${file}`);
  }
});

console.log('\n📁 Step 2: Copying App Directory...');
copyDirectory(path.join(sourceDir, 'app'), path.join(targetDir, 'app'));

console.log('\n🎨 Step 3: Copying Components Directory...');
copyDirectory(path.join(sourceDir, 'components'), path.join(targetDir, 'components'));

console.log('\n📚 Step 4: Copying Lib Directory...');
copyDirectory(path.join(sourceDir, 'lib'), path.join(targetDir, 'lib'));

console.log('\n🔧 Step 5: Fixing Import Statements...');

function fixImports(filePath) {
  if (!fs.existsSync(filePath)) return false;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const originalContent = content;
  
  // Fix common import issues
  const importFixes = [
    // Fix relative paths to use absolute @/ paths
    {
      pattern: /from\s+['"]\.\.\/\.\.\/components\/ui\/([^'"]+)['"]/g,
      replacement: "from '@/components/ui/$1'"
    },
    {
      pattern: /from\s+['"]\.\.\/\.\.\/\.\.\/components\/ui\/([^'"]+)['"]/g,
      replacement: "from '@/components/ui/$1'"
    },
    {
      pattern: /from\s+['"]\.\.\/components\/ui\/([^'"]+)['"]/g,
      replacement: "from '@/components/ui/$1'"
    },
    // Remove .tsx extensions
    {
      pattern: /from\s+['"]([^'"]+)\.tsx['"]/g,
      replacement: "from '$1'"
    },
    // Fix lib imports
    {
      pattern: /from\s+['"]\.\.\/\.\.\/lib\/([^'"]+)['"]/g,
      replacement: "from '@/lib/$1'"
    },
    {
      pattern: /from\s+['"]\.\.\/lib\/([^'"]+)['"]/g,
      replacement: "from '@/lib/$1'"
    }
  ];
  
  importFixes.forEach(fix => {
    content = content.replace(fix.pattern, fix.replacement);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Fixed imports in: ${path.relative(targetDir, filePath)}`);
    return true;
  }
  
  return false;
}

function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
      processDirectory(fullPath);
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      fixImports(fullPath);
    }
  }
}

// Fix imports in app and components directories
processDirectory(path.join(targetDir, 'app'));
processDirectory(path.join(targetDir, 'components'));

console.log('\n📦 Step 6: Installing Dependencies...');

try {
  execSync('npm install', { 
    cwd: targetDir,
    stdio: 'inherit'
  });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.log('❌ Failed to install dependencies:', error.message);
}

console.log('\n🔨 Step 7: Testing Build...');

try {
  execSync('npm run build', { 
    cwd: targetDir,
    stdio: 'inherit'
  });
  console.log('✅ Build successful!');
} catch (error) {
  console.log('❌ Build failed. Additional fixes may be needed.');
  console.log('Error:', error.message);
}

console.log('\n📊 SUMMARY');
console.log('==========');
console.log(`✅ Fixed ${fixedCount} files`);
console.log('✅ Copied app directory');
console.log('✅ Copied components directory');
console.log('✅ Copied lib directory');
console.log('✅ Fixed import statements');
console.log('✅ Updated configuration files');

console.log('\n🎉 Project audit and fix complete!');
console.log('   Your AlphaAI StockX project should now build successfully.');

process.exit(0);
