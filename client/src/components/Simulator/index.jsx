import React, { useState, useEffect, useCallback } from 'react';

import { debounce } from 'lodash';

import * as API from '../../api'

import { Canvas } from './Canvas';
//import { HDTWButton } from './Info';
import SliderValueInput from './SliderValueInput';

//import { config } from '../../services/sliderConfig';

const config = {
    pid: [
        {
            id: 'kp-slider',
            label: 'kP',
            default: 1,
            min: 0,
            max: 5
        },
        {
            id: 'ki-slider',
            label: 'kI',
            default: 0,
            min: 0,
            max: 5
        },
        {
            id: 'kd-slider',
            label: 'kD',
            default: 0,
            min: 0,
            max: 5
        },
        {
            id: 'friction-slider',
            label: 'Friction',
            default: 0,
            min: 0,
            max: 10
        },
    ],
    'waypoint-generation': [
        {
            id: 'spacing-slider',
            label: 'Spacing',
            default: 1,
            min: 0,
            max: 1
        },
        {
            id: 'b-slider',
            label: 'b',
            default: 0.75,
            min: 0.05,
            max: 0.95
        },
    ],
};

const Simulation = ({ simulationType }) => {
    const [sliderValues, setSliderValues] = useState(() => {
        console.log(config[simulationType]);
        return config[simulationType].reduce((acc, i) => {
            acc[i.id] = i.default;
            return acc;
        }, {});
    });

    const [data, setData] = useState({ chartData: {} });

    const sendSimulationData = useCallback(
        debounce(async (newData) => {
            try {
                const result = await API.fetchData(newData);
                console.log(result);
                updateChartData(result);
            } catch (error) {
                console.error('Error sending simulation data:', error);
            }
        }, 300),
        []
    );

    const updateChartData = (data) => {
        let chartData = {};

        if (data.type === 'pid') {
            console.log("a");
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
            console.log("b");
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

    const updateSliderValue = (sliderID, newValue) => {
        setSliderValues((prevValues) => {
            const updatedValues = { ...prevValues, [sliderID]: newValue };
            sendSimulationData({ ...updatedValues, type: simulationType });
            console.log(updatedValues);
            return updatedValues;
        });
    };
    console.log("z");
    return (
        <div>
            { /* <HDTWButton /> */ }
            {config[simulationType]?.map((sliderProperties) => (
                    <SliderValueInput
                        key={sliderProperties.id}
                        sliderProperties={sliderProperties}
                        value={sliderValues[sliderProperties.id]}
                        updateValue={updateSliderValue}
                    />
                ))
            }
            <Canvas data={data.chartData} />
        </div>
    );
};

export default Simulation;