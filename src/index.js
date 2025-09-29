import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import ErrorBoundary from './ErrorBoundary';

const rootEl = document.getElementById('root');
const root = createRoot(rootEl);

root.render(
  
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  
);


