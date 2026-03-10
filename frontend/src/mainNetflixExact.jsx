import React from 'react';
import ReactDOM from 'react-dom/client';
import AppNetflixExact from './AppNetflixExact';

console.log('🎬 Starting Exact Netflix Replica Platform...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppNetflixExact />
  </React.StrictMode>,
);
