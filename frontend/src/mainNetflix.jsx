import React from 'react';
import ReactDOM from 'react-dom/client';
import AppNetflix from './AppNetflix';

console.log('🎬 Starting Netflix-Inspired Streamflix Platform...');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppNetflix />
  </React.StrictMode>,
);
