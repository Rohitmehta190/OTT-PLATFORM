import React from 'react';
import ReactDOM from 'react-dom/client';
import AppDebug from './AppDebug';

console.log('🚀 Starting Streamflix Debug Version...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppDebug />
  </React.StrictMode>,
);
