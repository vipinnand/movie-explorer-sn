// main.tsx or index.tsx (your entry file)
import React from 'react';
import ReactDOM from 'react-dom/client'; // Important for React 18+
import App from './App'; // Your main App component
import './index.css'; // Optional: Global CSS file

// Use createRoot method (this is for React 18 and above)
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
