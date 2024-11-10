import React from "react";

import _Link from "./Link";

class NavBar extends React.Component {
    constructor(props) {
        super(props);


    }

    render() {
        return (
            <nav>
                <ul>
                    <li>
                        <_Link to="/pid/">PID</_Link>
                    </li>
                    <li>
                        <_Link to="/pure-pursuit/">Pure Pursuit</_Link>
                    </li>
                    <li>
                        <_Link to="/odometry/">Odometry</_Link>
                    </li>
                    <li>
                        <_Link to="/waypoint-generation/">Way Point Generation</_Link>
                    </li>
                </ul>
                <h1>Feedback Control Algorithm Simulator</h1>
            </nav>
        )
    }
}

export default NavBar;