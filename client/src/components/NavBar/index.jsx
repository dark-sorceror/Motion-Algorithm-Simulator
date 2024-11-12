import React from "react";

import _Link from "../Link";

import './styles.scss';

class NavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <_Link to="/">Home</_Link>
                    </li>
                    <li>
                        <_Link to="/simulations/">Simulations</_Link>
                    </li>
                    <li>
                        <_Link to="/about/">About</_Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar;