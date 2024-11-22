import React from 'react';

import { formatName } from '../../../services/formatName';

import './styles.scss';

const SliderValueInput = ({ sliderProperties, value, updateValue }) => {
    const syncSliderInputValue = (e) => {
        updateValue(formatName(sliderProperties.id), e.target.value);
    };

    return (
        <div className="slider-container">
            <span>{sliderProperties.label}</span>
            <div className="slider-function">
                <input 
                    type="range" 
                    className="slider" 
                    id={sliderProperties.id}
                    value={ value }
                    onInput={syncSliderInputValue}
                    min={sliderProperties.min}
                    max={sliderProperties.max}
                    step={sliderProperties.step}
                />
                <p className="slider-value">{ value }</p>
            </div>
        </div>
    );
};

export default SliderValueInput;