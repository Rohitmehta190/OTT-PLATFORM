import React from 'react';
import ReactDOM from 'react-dom/client';
import AppNetflixFixed from './AppNetflixFixed';

console.log('🎬 Starting Fixed Netflix Replica Platform...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppNetflixFixed />
  </React.StrictMode>,
);
