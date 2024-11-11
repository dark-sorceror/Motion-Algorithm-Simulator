import React from 'react';

import './styles.css';

const SliderValueInput = ({ sliderProperties, value, updateValue }) => {
    const syncSliderInputValue = (e) => {
        if (!isNaN(parseInt(e.target.value, 10))) {
            updateValue(parseInt(e.target.value, 10));
        }
    };

    return (
        <div>  
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
                    />
                    <input
                        type="number"
                        id={ sliderProperties.id.replace('slider', 'value') }
                        value={ value }
                        onChange={ syncSliderInputValue }
                    />
                </div>
            </div>
        </div>
    );
};

export default SliderValueInput;