# GitHub Actions Deployment Workflow

## Overview

The CI/CD pipeline automatically builds and deploys the MFE application to GitHub Pages.

## Workflow Diagram

```
┌─────────────────────────────────────────────┐
│  Developer pushes code to 'main' branch    │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  GitHub Actions Workflow Triggered         │
│  (.github/workflows/deploy.yml)            │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  1. Checkout code                          │
│  2. Setup Node.js v18                      │
│  3. npm install (dependencies)             │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  Build with environment variables:         │
│  - GITHUB_PAGES=true                       │
│  - GITHUB_REPOSITORY=${{ repository }}    │
│                                             │
│  npm run build:host                        │
│  npm run build:left                        │
│  npm run build:middle                      │
│  npm run build:right                       │
│  npm run setup:github-pages                │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  Output: dist/ directory with all MFEs    │
│  - Host app in dist/host                   │
│  - Left Panel in dist/left                 │
│  - Middle Panel in dist/middle             │
│  - Right Panel in dist/right               │
│  - .nojekyll file                          │
│  - 404.html for SPA routing                │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  Upload artifact to GitHub Pages           │
│  - Deploy from /dist directory             │
│  - CDN caches assets                       │
└──────────────┬──────────────────────────────┘
               │
               ▼
┌─────────────────────────────────────────────┐
│  ✓ Deployment Complete!                    │
│                                             │
│  Available at:                              │
│  https://user.github.io/repo-name/        │
└─────────────────────────────────────────────┘
```

## Workflow File: `.github/workflows/deploy.yml`

### Triggers

- **Push to main**: Full build and deploy
- **Pull Requests**: Test build only (no deployment)

### Jobs

| Step | Action | Purpose |
|------|--------|---------|
| 1 | `actions/checkout@v3` | Get latest code |
| 2 | `actions/setup-node@v3` | Setup Node.js v18 |
| 3 | `npm install` | Install dependencies |
| 4 | `npm run build` | Build all MFEs with GitHub Pages config |
| 5 | `actions/configure-pages@v3` | Configure GitHub Pages |
| 6 | `actions/upload-pages-artifact@v2` | Upload build artifacts |
| 7 | `actions/deploy-pages@v2` | Deploy to GitHub Pages |

### Build Process

When `npm run build` is executed:

```bash
# 1. Build each MFE independently
webpack --config webpack.host.js --mode production   # Outputs to dist/host
webpack --config webpack.left.js --mode production   # Outputs to dist/left
webpack --config webpack.middle.js --mode production # Outputs to dist/middle
webpack --config webpack.right.js --mode production  # Outputs to dist/right

# 2. Setup GitHub Pages structure
node scripts/setup-github-pages.js
  - Creates .nojekyll file
  - Copies host files to dist root
  - Creates 404.html for SPA routing
```

### Environment Variables Set by GitHub Actions

```yaml
GITHUB_PAGES: "true"           # Signals webpack to use GitHub Pages URLs
GITHUB_REPOSITORY: "user/repo" # Used to construct correct base path
```

### Deployment Conditions

- Only deploys when:
  - ✓ Event is a push (not pull request)
  - ✓ Branch is main
  - ✓ Build succeeds
  - ✓ GitHub Pages configuration is enabled

## Configuration Files

### `config.js` - Build-time Configuration

Reads environment variables and sets URLs:

```javascript
if (process.env.GITHUB_PAGES === 'true') {
  // Use GitHub Pages URLs
  baseUrl = https://user.github.io/repo-name
  leftUrl = https://user.github.io/repo-name/left
  // etc.
} else {
  // Use localhost URLs
  baseUrl = http://localhost:3000
  leftUrl = http://localhost:3002
  // etc.
}
```

### `src/host/mfe-config.js` - Runtime Configuration

Detects environment in browser:

```javascript
const isGitHubPages = window.location.hostname.includes('github.io');

// Dynamically resolve remote module URLs
window.__MFE_CONFIG__ = {
  remotes: {
    left: isGitHubPages ? githubPageUrl : localhostUrl,
    // etc.
  }
};
```

### `webpack.*.js` - Build Configuration

Sets publicPath for correct asset resolution:

```javascript
const publicPath = isGitHubPages 
  ? '/repo-name/left/'      // GitHub Pages
  : '/left/'                // Local dev
```

## Monitoring Deployments

### View Workflow Status

1. Go to GitHub repository
2. Click "Actions" tab
3. Select the workflow run
4. View build logs and deployment status

### Common Workflow Statuses

| Status | Meaning | Action |
|--------|---------|--------|
| ✓ | Success | Check the live app |
| ✗ | Failed | Review logs for errors |
| ⏳ | In Progress | Wait 5-10 minutes |
| ⊘ | Cancelled | Restart or re-push |

## Troubleshooting CI/CD

### Build Fails

Check GitHub Actions logs:
1. Go to Actions → Failed workflow
2. Click the job
3. Expand steps to see error messages
4. Common causes:
   - Node.js version mismatch
   - Missing dependencies
   - Build errors in code

### Deployment Succeeds but App Shows Blank

1. Clear browser cache (Ctrl+Shift+Delete)
2. Open DevTools Console (F12)
3. Check for JavaScript errors
4. Verify `window.__MFE_CONFIG__` shows correct URLs
5. Check Network tab for failed requests

### Assets 404 Not Found

1. Verify `/dist` directory structure
2. Check `.nojekyll` file exists
3. Verify GitHub Pages settings point to `/root` folder
4. Check that publicPath includes repository name

## Performance Metrics

Typical deployment times:

- Install dependencies: ~1-2 min
- Build MFEs: ~2-3 min
- Deploy to GitHub Pages: ~1 min
- **Total: ~5-10 minutes**

## Cost

GitHub Actions provides:
- ✓ Free tier for public repositories
- ✓ 2,000 free workflow minutes per month for private
- ✓ GitHub Pages hosting: Free
- ✓ Unlimited bandwidth

---

**Last Updated:** 2026-06-22
