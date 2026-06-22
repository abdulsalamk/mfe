import React from 'react';

const LeftPanel = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Left Panel</h2>
      <p>This is the Left Micro Frontend (20% width)</p>
      <ul style={{ marginTop: '20px', listStylePosition: 'inside' }}>
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
};

export default LeftPanel;
