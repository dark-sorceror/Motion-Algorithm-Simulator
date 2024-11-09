import React, { useState, useEffect } from 'react';

import { config } from '../../../services/Config';

const Slider = ({ id, value, onChange }) => {
    const [sliderValue, setSliderValue] = useState(value || defaultValue);

    useEffect(() => {
        setSliderValue(value || defaultValue);
    }, [value, defaultValue]);

    const handleChange = (e) => {
        const newValue = e.target.value;
        setSliderValue(newValue);
        onChange(id, newValue);
    };

    return (
        <div>
            {Object.keys(config).map((type) => (
                <div className="slider-container">
                    <span>{ type }</span>
                    <div className="slider-function">
                        <input
                            type="range"
                            id={id}
                            value={sliderValue}
                            onInput={handleChange}
                            min="0"
                            max="100"
                        />
                        <input
                            type="number"
                            id={id.replace('slider', 'value')}
                            value={sliderValue}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Slider;