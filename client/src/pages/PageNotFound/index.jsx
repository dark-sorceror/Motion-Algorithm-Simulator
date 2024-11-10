import React from "react";

import Layout from "../../components/Layout";
import _Link from "../../components/Link";

import './styles.scss';

class PageNotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout title="Page Not Found">
                <div className="temp-container">
                    <div className="maintenance">
                        <h1>Not Available Yet</h1>
                        <span>In the mean time, check out the available ones right now</span>
                    </div>
                    <div className="options">
                        <_Link to='/pid/'>
                            <button className="pid option">
                                <span className="title">PID</span>
                                <span className="desc">See how the PID controller works</span>
                            </button>
                        </_Link>
                        <_Link to='/waypoint-generation/'>
                            <button className="waypoint-generation option">
                                <span className="title">Waypoint Generation</span>
                                <span className="desc">See how pure pursuit paths are generated through different algorithms</span>
                            </button>
                        </_Link>
                        <_Link to='/pure-pursuit/'>
                            <button className="pure-pursuit option">
                                <span className="title">Pure Pursuit</span>
                                <span className="desc">See how pure pursuit paths are generated through different algorithms</span>
                            </button>
                        </_Link>
                    </div>
                </div>
            </Layout>
        );
    }
}

export default PageNotFound;