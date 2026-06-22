// Runtime configuration for dynamic remote module resolution
(function() {
  // Detect environment
  const isGitHubPages = window.location.hostname.includes('github.io');
  let baseUrl = window.location.origin;
  
  if (isGitHubPages) {
    // Extract repo name from URL path
    const pathSegments = window.location.pathname.split('/').filter(s => s);
    if (pathSegments.length > 0) {
      baseUrl = window.location.origin + '/' + pathSegments[0];
    }
  }
  
  // Store config in global scope for webpack share scope
  window.__MFE_CONFIG__ = {
    isGitHubPages,
    baseUrl,
    remotes: {
      left: isGitHubPages ? `${baseUrl}/left/remoteEntry.js` : `http://localhost:3002/remoteEntry.js`,
      middle: isGitHubPages ? `${baseUrl}/middle/remoteEntry.js` : `http://localhost:3003/remoteEntry.js`,
      right: isGitHubPages ? `${baseUrl}/right/remoteEntry.js` : `http://localhost:3004/remoteEntry.js`,
    }
  };
  
  console.log('MFE Configuration:', window.__MFE_CONFIG__);
})();
