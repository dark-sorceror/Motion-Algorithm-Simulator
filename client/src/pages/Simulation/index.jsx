import React from "react";

import Layout from "../../components/Layout";
import Simulation from "../../components/Simulator";

import './styles.scss';

export class SimulationPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const simulationType = window.location.pathname.replace(/\//g, "");
        
        return (
            <Layout
                title={"Motion Algorithm Simulator"}
            >
                <div className="simulation-wrapper">
                    <div className="page-title-s">
                        <h1>{simulationType}</h1>
                    </div>
                    <Simulation simulationType={simulationType} />
                </div>
            </Layout>
        )
    }
}