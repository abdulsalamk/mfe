# Micro Front End (MFE) Website

A modern Micro Front End architecture built with **Module Federation** (Webpack 5) using Node.js, React, and Express.

## 📋 Architecture

This project demonstrates a 3-column layout with independent micro front ends:

- **Left Panel (20%)** - Navigation/sidebar area
- **Middle Panel (60%)** - Main content area  
- **Right Panel (20%)** - Sidebar/features area

Each panel is a separate MFE application that can be developed and deployed independently.

## 🎯 Technology Stack

- **Node.js** - Runtime environment
- **Express.js** - Web server
- **React 18** - UI framework
- **Webpack 5** - Module bundler with Module Federation
- **Babel** - JavaScript transpiler

## 📦 Project Structure

```
mfe/
├── src/
│   ├── host/                 # Host application (main container)
│   │   ├── App.jsx
│   │   ├── index.jsx
│   │   └── index.html
│   ├── left/                 # Left Panel MFE (20%)
│   │   ├── LeftPanel.jsx
│   │   ├── index.jsx
│   │   └── index.html
│   ├── middle/               # Middle Panel MFE (60%)
│   │   ├── MiddlePanel.jsx
│   │   ├── index.jsx
│   │   └── index.html
│   └── right/                # Right Panel MFE (20%)
│       ├── RightPanel.jsx
│       ├── index.jsx
│       └── index.html
├── webpack.host.js           # Host webpack config
├── webpack.left.js           # Left MFE webpack config
├── webpack.middle.js         # Middle MFE webpack config
├── webpack.right.js          # Right MFE webpack config
├── server.js                 # Express server
├── .babelrc                  # Babel configuration
├── package.json
└── .gitignore
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Run all applications in development mode (requires 4 terminal windows or use `concurrently`):

```bash
npm run dev
```

This will start:
- Host application on `http://localhost:3001`
- Left MFE on `http://localhost:3002`
- Middle MFE on `http://localhost:3003`
- Right MFE on `http://localhost:3004`

Or run individual dev servers:

```bash
npm run dev:host    # Host on port 3001
npm run dev:left    # Left Panel on port 3002
npm run dev:middle  # Middle Panel on port 3003
npm run dev:right   # Right Panel on port 3004
```

### Production

1. Build all applications:
```bash
npm run build
```

2. Start the Express server:
```bash
npm start
```

The application will be available on `http://localhost:3000`

### GitHub Pages Deployment

This application is automatically deployed to GitHub Pages via GitHub Actions CI/CD pipeline.

**Features:**
- ✅ Automatic builds on every push to `main`
- ✅ Dynamic URL resolution (localhost vs GitHub Pages)
- ✅ No hardcoded URLs - environment-aware
- ✅ Single Page App (SPA) routing support

**To deploy:**
1. Push code to GitHub
2. Go to Settings → Pages
3. Set source to "Deploy from a branch" → `main` → `/root`
4. GitHub Actions will automatically build and deploy

**Access your app:**
```
https://your-username.github.io/mfe/
```

For detailed deployment instructions, see [GITHUB_PAGES_DEPLOYMENT.md](./GITHUB_PAGES_DEPLOYMENT.md)

## 🏗️ Module Federation Configuration

Each MFE is configured with Module Federation to expose its components:

- **Host** (`webpack.host.js`):
  - Consumes: LeftPanel, MiddlePanel, RightPanel
  - Runs on port 3001

- **Left Panel** (`webpack.left.js`):
  - Exposes: `./LeftPanel`
  - Runs on port 3002

- **Middle Panel** (`webpack.middle.js`):
  - Exposes: `./MiddlePanel`
  - Runs on port 3003

- **Right Panel** (`webpack.right.js`):
  - Exposes: `./RightPanel`
  - Runs on port 3004

## 🎨 Layout Details

The layout uses CSS Flexbox for responsive 3-column design:

```
┌─────────────────────────────────────────────┐
│ Left (20%) │ Middle (60%) │ Right (20%)    │
│            │              │                 │
│  Background:  Background:   Background:    │
│  #e8f4f8      #f0f8ff       #e8f4f8       │
│            │              │                 │
└─────────────────────────────────────────────┘
```

## 📝 Scripts

- `npm start` - Start production Express server
- `npm run dev` - Start all dev servers concurrently
- `npm run dev:host` - Start host dev server
- `npm run dev:left` - Start left panel dev server
- `npm run dev:middle` - Start middle panel dev server
- `npm run dev:right` - Start right panel dev server
- `npm run build` - Build all MFEs for production
- `npm run build:host` - Build host application
- `npm run build:left` - Build left panel
- `npm run build:middle` - Build middle panel
- `npm run build:right` - Build right panel

## 🔒 Environment

Create a `.env` file in the root directory to customize settings:

```
PORT=3000
NODE_ENV=development
```

## 🐛 Troubleshooting

### Port Already in Use

If ports 3001-3004 are already in use, modify the `devServer.port` in the respective webpack config files.

### CORS Issues

The webpack dev servers are configured with CORS headers to allow cross-origin requests.

### Module Federation Not Working

Ensure all dev servers are running on the correct ports as configured in `webpack.host.js`.

## 📚 Resources

- [Webpack Module Federation](https://webpack.js.org/concepts/module-federation/)
- [React Documentation](https://react.dev)
- [Express.js Guide](https://expressjs.com/)

## 📄 License

MIT

---

**Happy coding! 🚀**
