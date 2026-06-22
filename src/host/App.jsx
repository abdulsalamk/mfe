import React, { Suspense } from 'react';

const LeftPanel = React.lazy(() => 
  import('left/LeftPanel')
    .catch(err => {
      console.error('Failed to load Left Panel:', err);
      return { default: () => <div style={{ padding: '20px', color: 'red' }}>Error loading Left Panel</div> };
    })
);

const MiddlePanel = React.lazy(() => 
  import('middle/MiddlePanel')
    .catch(err => {
      console.error('Failed to load Middle Panel:', err);
      return { default: () => <div style={{ padding: '20px', color: 'red' }}>Error loading Middle Panel</div> };
    })
);

const RightPanel = React.lazy(() => 
  import('right/RightPanel')
    .catch(err => {
      console.error('Failed to load Right Panel:', err);
      return { default: () => <div style={{ padding: '20px', color: 'red' }}>Error loading Right Panel</div> };
    })
);

const App = () => {
  console.log('App component rendering');
  
  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
      {/* Left Panel - 20% */}
      <div style={{ flex: '0 0 20%', backgroundColor: '#e8f4f8', borderRight: '1px solid #ddd', overflow: 'auto' }}>
        <Suspense fallback={<div style={{ padding: '20px' }}>Loading Left Panel...</div>}>
          <LeftPanel />
        </Suspense>
      </div>

      {/* Middle Panel - 60% */}
      <div style={{ flex: '0 0 60%', backgroundColor: '#f0f8ff', borderRight: '1px solid #ddd', overflow: 'auto' }}>
        <Suspense fallback={<div style={{ padding: '20px' }}>Loading Middle Panel...</div>}>
          <MiddlePanel />
        </Suspense>
      </div>

      {/* Right Panel - 20% */}
      <div style={{ flex: '0 0 20%', backgroundColor: '#e8f4f8', overflow: 'auto' }}>
        <Suspense fallback={<div style={{ padding: '20px' }}>Loading Right Panel...</div>}>
          <RightPanel />
        </Suspense>
      </div>
    </div>
  );
};

export default App;
