// src/index.js
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

root.render(
  // You can re-enable StrictMode later if you like:
  // <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  // </React.StrictMode>
);


