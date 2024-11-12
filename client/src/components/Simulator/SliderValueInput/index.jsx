import React from 'react';

import { formatName } from '../../../services/formatName';

import './styles.scss';

const SliderValueInput = ({ sliderProperties, value, updateValue }) => {
    const syncSliderInputValue = (e) => {
        if (!isNaN(parseInt(e.target.value, 10))) {
            updateValue(formatName(sliderProperties.id), parseInt(e.target.value, 10));
        }
    };
    
    return (
        <div className="slider-container">
            <span>{ sliderProperties.label }</span>
            <div className="slider-function">
                <input
                    type="range"
                    id={ sliderProperties.id }
                    value={ value }
                    onInput={ syncSliderInputValue }
                    min={ sliderProperties.min }
                    max={ sliderProperties.max }
                    step={ sliderProperties.step }
                />
                <input
                    type="number"
                    id={ sliderProperties.id.replace('slider', 'value') }
                    value={ value }
                    onChange={ syncSliderInputValue }
                    min={ sliderProperties.min }
                    max={ sliderProperties.max }
                    step={ sliderProperties.step }
                />
            </div>
        </div>
    );
};

export default SliderValueInput;