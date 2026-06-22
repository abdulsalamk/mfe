import React, { Suspense } from 'react';

const LeftPanel = React.lazy(() => import('left/LeftPanel'));
const MiddlePanel = React.lazy(() => import('middle/MiddlePanel'));
const RightPanel = React.lazy(() => import('right/RightPanel'));

const LoadingFallback = ({ panelName }) => (
  <div style={{ padding: '20px', backgroundColor: '#fff3cd', border: '2px solid #ffc107', borderRadius: '4px' }}>
    <p>⏳ Loading {panelName}...</p>
  </div>
);

const App = () => (
  <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
    <div style={{ flex: '0 0 20%', backgroundColor: '#e8f4f8', borderRight: '1px solid #ddd', overflow: 'auto' }}>
      <Suspense fallback={<LoadingFallback panelName="Left Panel" />}>
        <LeftPanel />
      </Suspense>
    </div>

    <div style={{ flex: '0 0 60%', backgroundColor: '#f0f8ff', borderRight: '1px solid #ddd', overflow: 'auto' }}>
      <Suspense fallback={<LoadingFallback panelName="Middle Panel" />}>
        <MiddlePanel />
      </Suspense>
    </div>

    <div style={{ flex: '0 0 20%', backgroundColor: '#e8f4f8', overflow: 'auto' }}>
      <Suspense fallback={<LoadingFallback panelName="Right Panel" />}>
        <RightPanel />
      </Suspense>
    </div>
  </div>
);

export default App;
