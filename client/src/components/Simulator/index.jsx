import React, { useState, useEffect } from 'react';

import { debounce } from 'lodash';

import * as API from '../../api'

import { Canvas } from './Canvas';
import { HDTWButton } from './Info';
import { Slider } from './SliderInput';

import { config } from '../../services/sliderConfig';

const Simulation = () => {
    const [data, setData] = useState({
        pid: {
            kpValue: 0,
            kiValue: 0,
            kdValue: 0,
            frictionValue: 0,
        },
        'waypoint-generation': {
            spacingValue: 1,
            bValue: 0.75,
        },
        chartData: {},
    });

    const sendSimulationData = debounce(async (newData) => {
        try {
            const result = await API.fetchData(newData);
            updateChartData(result);
        } catch (error) {
            console.error('Error sending simulation data:', error);
        }
    }, 300);
    
    const updateChartData = (data) => {
        let chartData = {};

        if (data.type === 'pid') {
            chartData = {
                labels: Array.from({ length: 101 }, (_, i) => i),
                datasets: [
                    {
                        label: 'Robot Position',
                        data: data.robot_position,
                        pointBackgroundColor: '#9BD0F5',
                        pointBorderColor: '#36A2EB',
                    },
                    {
                        label: 'Destination',
                        data: Array(100).fill(100),
                        borderDash: [5, 5],
                        borderColor: 'rgba(255, 99, 132, 1)',
                    },
                ],
            };
        } else if (data.type === 'waypoint-generation') {
            chartData = {
                labels: data.PIA_list.map((item) => item.x),
                datasets: [
                    {
                        label: 'Injected Robot Path',
                        data: data.PIA_list.map((item) => item.y),
                    },
                    {
                        label: 'Smoothed Robot Path',
                        data: data.PSA_list.map((item) => item.y),
                    },
                ],
            };
        }
        setData((prevData) => ({
            ...prevData,
            chartData,
        }));
    };

    const handleSliderChange = (id, value) => {
        setData((prevData) => {
            const updatedData = { ...prevData };
            const [type, param] = id.split('-');
            updatedData[type][`${param}Value`] = parseFloat(value);
            return updatedData;
        });

        sendSimulationData(data);
    };

    useEffect(() => {
        // Initialize sliders based on current URL path
        const type = window.location.pathname.replace('/', '');
        // Add listeners to sliders
    }, []);

    return (
        <div>
            <HDTWButton />
            <Slider 
                key={id}
                id={id}
                value={data[type][`${id.replace('slider', '')}Value`] || defaultValue}
                onChange={handleSliderChange}
            />
            <Canvas data={data.chartData} />
        </div>
    );
};

export default Simulation;