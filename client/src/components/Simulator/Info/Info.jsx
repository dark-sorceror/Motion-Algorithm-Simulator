import React, { useState } from "react";

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