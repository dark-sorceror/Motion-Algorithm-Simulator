import React, { useRef, useEffect } from "react";

import { Chart } from 'chart.js';

const Canvas = ({ data }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext('2d');

        const chart = new Chart(ctx, {
            type: 'scatter',
            data: data,
            options: {
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
                    annotation: data.annotations ? { annotations: data.annotations } : {},
                },
            },
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