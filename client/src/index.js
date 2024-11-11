import React from 'react';
import { createRoot } from 'react-dom/client';

import { Chart } from 'chart.js';
import {
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title
} from "chart.js";
import annotationPlugin from 'chartjs-plugin-annotation';

import App from './App';

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    Title,
    annotationPlugin
);

const root = document.getElementById('root');

createRoot(root).render(
    <App />
);