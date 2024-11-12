import React, { useState } from "react";

import './styles.scss';

const HDTWButton = () => {
    const [active, setActive] = useState(false);

    const handleClick = () => {
        setActive(!active);
    };

    return (
        <button
            id='hdtw-btn'
            className={`btn ${active ? 'active' : ''}`}
            onClick={ handleClick }
        >
            How does this work?
        </button>
    );
};

export default HDTWButton;