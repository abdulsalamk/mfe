#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * Setup script for GitHub Pages deployment
 * This script:
 * 1. Copies all dist subdirectories to the root dist folder for GitHub Pages
 * 2. Creates proper index.html routing
 */

const distDir = path.join(__dirname, '../dist');
const sourceDirectories = ['host', 'left', 'middle', 'right'];

console.log('Setting up GitHub Pages deployment structure...');

// Ensure dist directory exists
if (!fs.existsSync(distDir)) {
  console.error('Error: dist directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// Create .nojekyll file to disable Jekyll processing
const noJekyllPath = path.join(distDir, '.nojekyll');
fs.writeFileSync(noJekyllPath, '');
console.log('✓ Created .nojekyll file');

// Copy host contents to root
const hostDir = path.join(distDir, 'host');
if (fs.existsSync(hostDir)) {
  const files = fs.readdirSync(hostDir);
  files.forEach(file => {
    const src = path.join(hostDir, file);
    const dest = path.join(distDir, file);
    
    if (fs.lstatSync(src).isDirectory()) {
      // Create directory if it doesn't exist
      if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
      }
    } else {
      fs.copyFileSync(src, dest);
    }
  });
  console.log('✓ Copied host files to dist root');
}

// Create 404.html for single-page app routing
const notFoundHtml = fs.readFileSync(path.join(hostDir, 'index.html'), 'utf8');
fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml);
console.log('✓ Created 404.html for SPA routing');

console.log('\n✓ GitHub Pages setup complete!');
console.log(`  Deployment directory: ${distDir}`);
console.log('\nTo deploy, push to GitHub and enable GitHub Pages in repository settings.');
console.log('Set the source to "Deploy from a branch" and select the "main" branch with "/root" folder.');
