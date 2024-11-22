import React from "react";

import { Layout } from "../../components/Layout";
import Simulation from "../../components/Simulator";

import { simulations } from "../../services/simulations";
import { getSimulationFromAddress } from "../../services/simulations";

import './styles.scss';
import { ScrollButton } from "./HDTW";

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
                        <h1>{ Object.keys(simulations)[getSimulationFromAddress(simulationType)] }</h1>
                    </div>
                    <Simulation simulationType={simulationType} />
                    <ScrollButton />
                </div>
            </Layout>
        )
    }
}