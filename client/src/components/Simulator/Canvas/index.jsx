import React, { useRef, useEffect } from "react";

import Chart from 'chart.js/auto';

import { merge } from "../../../services/merge";

import './styles.scss';

const Canvas = ({ data, options }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');

        let obj1 = {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                },
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
                annotation: {}
            },
        };

        let obj2 = options;
        let mergedObj = merge(obj1, obj2);

        const chart = new Chart(ctx, {
            type: 'scatter',
            data: data,
            options: mergedObj
        });

        return () => chart.destroy();
    }, [data]);

    return (
        <div className="canvas-holder">
            <canvas ref={canvasRef} id="chart"></canvas>
        </div>
    );
};

export default Canvas;