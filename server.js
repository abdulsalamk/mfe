const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from dist directory (for production builds)
app.use(express.static(path.join(__dirname, 'dist')));

// Main host application
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'host', 'index.html'));
});

// Serve MFE applications
app.use('/left', express.static(path.join(__dirname, 'dist', 'left')));
app.use('/middle', express.static(path.join(__dirname, 'dist', 'middle')));
app.use('/right', express.static(path.join(__dirname, 'dist', 'right')));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`MFE Host server is running on http://localhost:${PORT}`);
  console.log(`Left MFE available at http://localhost:${PORT}/left`);
  console.log(`Middle MFE available at http://localhost:${PORT}/middle`);
  console.log(`Right MFE available at http://localhost:${PORT}/right`);
});
