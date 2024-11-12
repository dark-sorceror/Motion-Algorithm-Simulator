import React from 'react';
import { createRoot } from 'react-dom/client';

import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';

import App from './App';

Chart.register(
    annotationPlugin
);

const root = document.getElementById('root');

createRoot(root).render(
    <App />
);