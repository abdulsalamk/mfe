import React from 'react';

const MiddlePanel = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Middle Panel</h1>
      <p>This is the Middle Micro Frontend (60% width)</p>
      <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fff', borderRadius: '5px' }}>
        <h3>Main Content</h3>
        <p>This panel takes up 60% of the screen width and is meant for the main content area.</p>
        <p style={{ marginTop: '10px' }}>
          This is where your primary content should go in a typical 3-column layout.
        </p>
      </div>
    </div>
  );
};

export default MiddlePanel;
