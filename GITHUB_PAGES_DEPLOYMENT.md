# GitHub Pages Deployment Guide

## Overview

This MFE application uses **Module Federation** with dynamic URL resolution to work in both local development and GitHub Pages production environments.

## How It Works

### Environment Detection

The application automatically detects its environment at runtime:

- **Local Development**: Uses `http://localhost:PORT` URLs
- **GitHub Pages**: Uses GitHub Pages URLs based on repository name

### Configuration Files

1. **`config.js`** - Build-time configuration
   - Determines URLs based on `NODE_ENV` and `GITHUB_PAGES` environment variables
   - Used during webpack build process

2. **`src/host/mfe-config.js`** - Runtime configuration
   - Detects GitHub Pages environment via `window.location`
   - Dynamically resolves remote module URLs
   - Stores configuration in `window.__MFE_CONFIG__`

## Deployment Steps

### 1. Prerequisites

- GitHub account with a repository
- Node.js v14+ installed locally
- npm or yarn package manager

### 2. Local Development (No Changes Needed!)

Everything works locally without any URL hardcoding:

```bash
npm install
npm run dev
```

Visit:
- Host: http://localhost:3001
- Left Panel: http://localhost:3002
- Middle Panel: http://localhost:3003
- Right Panel: http://localhost:3004

### 3. GitHub Pages Setup

#### Step A: Repository Configuration

1. Push code to GitHub:
```bash
git add -A
git commit -m "Add MFE app"
git push origin main
```

2. Go to **Repository Settings** → **Pages**

3. Configure GitHub Pages:
   - **Source**: Deploy from a branch
   - **Branch**: `main`
   - **Folder**: `/root`

4. Wait for GitHub Pages to be enabled (usually 1-2 minutes)

#### Step B: Automatic Deployment (CI/CD)

The GitHub Actions workflow in `.github/workflows/deploy.yml` automatically:

1. Triggers on every push to `main` branch
2. Builds the application with `GITHUB_PAGES=true`
3. Deploys to GitHub Pages

**View deployment status**: Go to **Actions** tab in your repository

#### Step C: Manual Deployment

If needed, you can manually build and deploy:

```bash
# Set environment variable
export GITHUB_PAGES=true
export GITHUB_REPOSITORY=your-username/your-repo

# Build all MFEs
npm run build

# This creates optimized dist/ directory ready for GitHub Pages
```

### 4. Access Your App

After successful deployment:

```
https://your-username.github.io/your-repo-name/
```

Example:
```
https://abdulkunnummal.github.io/mfe/
```

## URL Resolution Logic

### Build Time (Webpack)

**Local Development:**
```
Host: http://localhost:3001/
Left: http://localhost:3002/left/
Middle: http://localhost:3003/middle/
Right: http://localhost:3004/right/
```

**GitHub Pages:**
```
Host: https://username.github.io/repo-name/
Left: https://username.github.io/repo-name/left/
Middle: https://username.github.io/repo-name/middle/
Right: https://username.github.io/repo-name/right/
```

### Runtime (Browser)

The `mfe-config.js` script:
1. Detects if running on `github.io` domain
2. Extracts repository name from URL path
3. Dynamically resolves all remote module URLs
4. Stores config in `window.__MFE_CONFIG__`

## CI/CD Pipeline

### Workflow File: `.github/workflows/deploy.yml`

**Triggers:**
- Every push to `main` branch
- Pull requests (test build only)

**Steps:**
1. Checkout code
2. Setup Node.js v18
3. Install dependencies
4. Build with `GITHUB_PAGES=true`
5. Upload build artifacts
6. Deploy to GitHub Pages (main branch only)

**Deployment Time:** ~5-10 minutes

## Troubleshooting

### Issue: Modules not loading on GitHub Pages

**Solution:**
- Clear browser cache (Ctrl+Shift+Delete)
- Check browser console (F12 → Console)
- Verify `window.__MFE_CONFIG__` shows correct URLs
- Check that all remote module bundles are in `dist/` folder

### Issue: 404 errors on GitHub Pages

**Solution:**
- Ensure `.nojekyll` file exists in dist root
- Verify `404.html` exists for SPA routing
- Check that repository "Pages" settings are correct
- Run setup script: `npm run setup:github-pages`

### Issue: Images/CSS not loading

**Solution:**
- Verify publicPath in webpack configs includes repository name
- Check that assets are in correct subdirectories
- Use relative paths in CSS files

## Environment Variables

### For Local Development

No special setup needed. Default URLs will be used.

### For GitHub Pages (CI/CD)

The workflow automatically sets:
```yaml
GITHUB_PAGES=true
GITHUB_REPOSITORY=${{ github.repository }}
```

### Manual GitHub Pages Build

```bash
export GITHUB_PAGES=true
export GITHUB_REPOSITORY=username/repo-name
npm run build
```

## File Structure After Build

```
dist/
├── .nojekyll                 # Disables Jekyll
├── 404.html                  # SPA routing
├── index.html                # Main app
├── main.js                   # Host app bundle
├── left/
│   ├── index.html
│   └── remoteEntry.js
├── middle/
│   ├── index.html
│   └── remoteEntry.js
└── right/
    ├── index.html
    └── remoteEntry.js
```

## Performance Optimization

### GitHub Pages Considerations

1. **Caching**: GitHub Pages uses CloudFlare CDN - assets are cached
2. **Build Time**: ~3-5 minutes per deployment
3. **Storage**: Free tier has unlimited bandwidth, 1GB per repository

### Optimization Tips

1. Use production mode (default in CI/CD)
2. Enable Gzip compression in webpack
3. Code splitting is automatic via Module Federation
4. Lazy load remote modules with React.lazy()

## Security

- No sensitive data in `config.js` (URLs only)
- No API keys or tokens in environment variables
- GitHub Actions has isolated environments
- HTTPS is enforced on GitHub Pages

## Next Steps

1. **Custom Domain** (Optional)
   - Go to Settings → Pages
   - Add custom domain
   - Update DNS records

2. **Custom Styling**
   - Modify panel colors in `src/host/App.jsx`
   - Add custom CSS files

3. **Add More MFEs**
   - Create new directory under `src/`
   - Create webpack config
   - Update `webpack.host.js` remotes
   - Update CI/CD workflow if needed

## Support

For issues or questions:
- Check browser console for error messages
- Review GitHub Actions logs
- Inspect `window.__MFE_CONFIG__` in browser DevTools
- Check webpack build output for warnings

---

**Last Updated:** 2026-06-22
