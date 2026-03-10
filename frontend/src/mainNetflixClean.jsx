import React from 'react';
import ReactDOM from 'react-dom/client';
import AppNetflixClean from './AppNetflixClean';

console.log('🎬 Starting Clean Netflix Replica Platform...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppNetflixClean />
  </React.StrictMode>,
);
