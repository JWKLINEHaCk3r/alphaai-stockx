#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 Starting Comprehensive Project Audit...\n');

const issues = [];
const fixes = [];

// 1. Check for missing essential files
const essentialFiles = [
  'app/layout.tsx',
  'app/page.tsx',
  'app/globals.css',
  'tsconfig.json',
  'next.config.mjs',
  'tailwind.config.mjs',
  'postcss.config.js',
  'package.json'
];

console.log('📋 Checking Essential Files...');
essentialFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    issues.push(`Missing essential file: ${file}`);
  } else {
    console.log(`✅ Found: ${file}`);
  }
});

// 2. Check for malformed imports
console.log('\n🔗 Checking Import Statements...');

function findMalformedImports(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      findMalformedImports(filePath, fileList);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for problematic import patterns
      const problematicPatterns = [
        /from\s+['"]\.\.\/\.\.\/\.\.\/components/g,
        /from\s+['"][^'"]*\.tsx['"]/g,
        /from\s+['"][^'"]*\.ts['"]/g,
        /import.*\{.*\}.*from\s+['"][^'"]*components\/ui\/[^'"]*['"]/g
      ];
      
      problematicPatterns.forEach((pattern, index) => {
        const matches = content.match(pattern);
        if (matches) {
          issues.push(`Malformed imports in ${filePath}: ${matches.join(', ')}`);
        }
      });
    }
  }
  
  return fileList;
}

findMalformedImports('app');
findMalformedImports('components');

// 3. Check for TypeScript configuration issues
console.log('\n⚙️  Checking TypeScript Configuration...');

if (fs.existsSync('tsconfig.json')) {
  try {
    const tsConfig = JSON.parse(fs.readFileSync('tsconfig.json', 'utf8'));
    
    // Check for proper path mapping
    if (!tsConfig.compilerOptions?.paths?.['@/*']) {
      issues.push('Missing @/* path mapping in tsconfig.json');
    }
    
    // Check for proper target
    if (tsConfig.compilerOptions?.target !== 'ES2022' && tsConfig.compilerOptions?.target !== 'es2022') {
      issues.push('TypeScript target should be ES2022');
    }
    
    console.log('✅ TypeScript configuration looks good');
  } catch (error) {
    issues.push('Invalid tsconfig.json: ' + error.message);
  }
}

// 4. Check for Next.js configuration issues
console.log('\n⚡ Checking Next.js Configuration...');

const nextConfigFiles = ['next.config.js', 'next.config.mjs', 'next.config.ts'];
let hasValidNextConfig = false;

nextConfigFiles.forEach(configFile => {
  if (fs.existsSync(configFile)) {
    const content = fs.readFileSync(configFile, 'utf8');
    
    // Check for deprecated options
    if (content.includes('appDir')) {
      issues.push(`Deprecated appDir option found in ${configFile}`);
    }
    
    if (content.includes('swcMinify')) {
      issues.push(`Deprecated swcMinify option found in ${configFile}`);
    }
    
    hasValidNextConfig = true;
    console.log(`✅ Found Next.js config: ${configFile}`);
  }
});

if (!hasValidNextConfig) {
  issues.push('No Next.js configuration file found');
}

// 5. Check for package.json issues
console.log('\n📦 Checking Package Dependencies...');

if (fs.existsSync('package.json')) {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    
    // Check for required dependencies
    const requiredDeps = ['next', 'react', 'react-dom', 'tailwindcss', 'typescript'];
    requiredDeps.forEach(dep => {
      if (!packageJson.dependencies?.[dep] && !packageJson.devDependencies?.[dep]) {
        issues.push(`Missing required dependency: ${dep}`);
      }
    });
    
    // Check for required scripts
    const requiredScripts = ['dev', 'build', 'start', 'lint'];
    requiredScripts.forEach(script => {
      if (!packageJson.scripts?.[script]) {
        issues.push(`Missing required script: ${script}`);
      }
    });
    
    console.log('✅ Package.json looks good');
  } catch (error) {
    issues.push('Invalid package.json: ' + error.message);
  }
}

// 6. Check for UI component structure
console.log('\n🎨 Checking UI Components...');

const uiComponents = ['button', 'card', 'input', 'label'];
uiComponents.forEach(component => {
  const componentPath = `components/ui/${component}.tsx`;
  if (!fs.existsSync(componentPath)) {
    issues.push(`Missing UI component: ${componentPath}`);
  }
});

// 7. Try to run build and capture errors
console.log('\n🔨 Testing Build Process...');

try {
  execSync('npm run build', { 
    stdio: 'pipe',
    timeout: 60000
  });
  console.log('✅ Build successful');
} catch (error) {
  const errorOutput = error.stdout?.toString() || error.stderr?.toString() || error.message;
  issues.push(`Build failed: ${errorOutput.substring(0, 500)}...`);
}

// 8. Generate summary report
console.log('\n' + '='.repeat(60));
console.log('📊 COMPREHENSIVE AUDIT RESULTS');
console.log('='.repeat(60));

if (issues.length === 0) {
  console.log('🎉 NO ISSUES FOUND! Project is ready for deployment.');
} else {
  console.log(`❌ Found ${issues.length} issues:`);
  issues.forEach((issue, index) => {
    console.log(`${index + 1}. ${issue}`);
  });
  
  console.log('\n🔧 Recommended fixes:');
  console.log('1. Run the comprehensive fix script');
  console.log('2. Update import statements to use @/ paths');
  console.log('3. Ensure all UI components exist');
  console.log('4. Update TypeScript and Next.js configurations');
  console.log('5. Install missing dependencies');
}

console.log('\n✨ Audit complete!');

// Exit with error code if issues found
process.exit(issues.length > 0 ? 1 : 0);
