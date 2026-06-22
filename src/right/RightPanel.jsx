import React from 'react';

const RightPanel = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>Right Panel</h2>
      <p>This is the Right Micro Frontend (20% width)</p>
      <div style={{ marginTop: '20px' }}>
        <h4>Features</h4>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>Feature A</li>
          <li>Feature B</li>
          <li>Feature C</li>
        </ul>
      </div>
    </div>
  );
};

export default RightPanel;
