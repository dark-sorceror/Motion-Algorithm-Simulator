import React from 'react';
import { createRoot } from 'react-dom/client';

import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

import App from './App';
import { ErrorBoundary } from './pages/ErrorBoundary';

Chart.register(
    annotationPlugin
);

const root = document.getElementById('root');

createRoot(root).render(
    <ErrorBoundary>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </ErrorBoundary>
);