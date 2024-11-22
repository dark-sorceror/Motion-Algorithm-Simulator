import React, { useState, useCallback, useEffect } from 'react';

import { debounce } from 'lodash';

import { postData } from '../../api/api';

import Canvas from './Canvas';
//import { HDTWButton } from './Info';
import SliderValueInput from './SliderValueInput';

import { config } from '../../services/sliderConfig';
import { formatName } from '../../services/formatName';

import './styles.scss';

const Simulation = ({ simulationType }) => {
    const [data, setData] = useState({ chartData: {}, options: {} });

    const [sliderValues, setSliderValues] = useState(() => {
        return config[simulationType].reduce((acc, i) => {
            acc[formatName(i.id)] = i.default;
            return acc;
        }, {});
    });

    const sendSimulationData = useCallback(
        debounce(async (newData) => {
            try {
                const result = await postData(newData);

                updateChartData(result);
            } catch (error) {
                console.error('Error sending simulation data:', error);
            }
        }, 300),
        []
    );

    useEffect(() => {
        sendSimulationData({ ...sliderValues, type: simulationType });
    }, [sendSimulationData]);

    const updateChartData = (data) => {
        let chartData = {};
        let options = {};

        if (data.type === 'pid') {
            chartData = {
                labels: Array.from({ length: 101 }, (_, i) => i),
                datasets: [
                    {
                        label: 'Robot Position',
                        data: data.robot_position,
                        pointBackgroundColor: '#9BD0F5',
                        pointBorderColor: '#36A2EB',
                        pointBorderWidth: 2,
                        pointHoverBorderWidth: 2
                    },
                    {
                        label: 'Destination',
                        data: Array(100).fill(100),
                        borderDash: [5, 5],
                        borderColor: 'rgba(255, 99, 132, 1)',
                        pointBorderWidth: 2,
                        pointHoverBorderWidth: 2
                    }
                ]
            };

            options = {
                scales: {
                    y: {
                        suggestedMax: 120
                    }
                }
            };

            data.intersect ? options.plugins = {
                annotation: {
                    annotations: {
                        point1: {
                            type: 'point',
                            xValue: data.intersect,
                            yValue: 100,
                            backgroundColor: '#FFB1C1',
                            borderColor: '#FF6384',
                            borderWidth: 2
                        }
                    }
                }
            } : {};

        } else if (data.type === 'waypoint-generation') {
            chartData = {
                labels: data.PIA_list.map((item) => item.x),
                datasets: [
                    {
                        label: 'Injected Robot Path',
                        data: data.PIA_list.map((item) => item.y),
                        pointBorderWidth: 2,
                        pointHoverBorderWidth: 2
                    },
                    {
                        type: 'line',
                        label: 'Smoothed Robot Path',
                        data: data.PSA_list.map((item) => item.y),
                        pointBorderWidth: 2,
                        pointHoverBorderWidth: 2
                    }
                ]
            };

            options = {
                scales: {
                    y: {
                        suggestedMax: 3
                    }
                },
                elements: {
                    point: {
                        radius: 6,
                        hoverRadius: 10
                    }
                }
            }
        }

        setData({
            chartData,
            options
        });
    };

    const updateSliderValue = (sliderID, newValue) => {
        setSliderValues((prevValues) => {
            const updatedValues = { ...prevValues, [sliderID]: newValue };
            sendSimulationData({ ...updatedValues, type: simulationType });

            return updatedValues;
        });
    };

    return (
        <div className='simulation-area'>
            <Canvas data={data.chartData} options={data.options} />
            <div className="right">
                {config[simulationType]?.map((sliderProperties) => (
                    <SliderValueInput
                        key={sliderProperties.id}
                        sliderProperties={sliderProperties}
                        value={sliderValues[formatName(sliderProperties.id)]}
                        updateValue={updateSliderValue}
                    />
                ))}
            </div>
        </div>
    );
};

export default Simulation;