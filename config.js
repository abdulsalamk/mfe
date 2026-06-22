// Environment configuration for Module Federation URLs
const isDevelopment = process.env.NODE_ENV === 'development';
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

let baseUrl = 'http://localhost:3000';
let hostUrl = 'http://localhost:3001';
let leftUrl = 'http://localhost:3002';
let middleUrl = 'http://localhost:3003';
let rightUrl = 'http://localhost:3004';

// GitHub Pages configuration
if (isGitHubPages) {
  const repo = process.env.GITHUB_REPOSITORY || 'user/repo';
  const owner = repo.split('/')[0];
  const repoName = repo.split('/')[1];
  const basePath = `/${repoName}`;
  
  baseUrl = `https://${owner}.github.io${basePath}`;
  hostUrl = `https://${owner}.github.io${basePath}`;
  leftUrl = `https://${owner}.github.io${basePath}/left`;
  middleUrl = `https://${owner}.github.io${basePath}/middle`;
  rightUrl = `https://${owner}.github.io${basePath}/right`;
}

module.exports = {
  isDevelopment,
  isGitHubPages,
  baseUrl,
  hostUrl,
  leftUrl,
  middleUrl,
  rightUrl,
};
