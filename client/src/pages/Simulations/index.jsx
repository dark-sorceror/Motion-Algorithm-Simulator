import React from "react";

import { simulations } from "../../services/simulations";

import { Layout } from "../../components/Layout";
import _Link from "../../components/Link";

import './styles.scss';

export class SimulationsPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout
                title="Motion Algorithm Simulator"
                description="Visualize the various algorithms for generating, controlling and tracking motion paths through simulations"
            >
                <div className="wrapper">
                    <div className="page-title">
                        <h1>Simulations</h1>
                    </div>
                    <div className="options">
                        {Object.keys(simulations).map((simulation) => {
                            return (
                                <_Link
                                    to={simulations[simulation].available
                                        ? `/${simulation.toLowerCase().replaceAll(" ", "-")}/`
                                        : null}
                                    key={simulation}>
                                    <button className={`
                                        ${simulation.toLowerCase().replaceAll(" ", "")} option 
                                        ${simulations[simulation].available
                                                ? ''
                                                : 'unavailable'}`}>
                                        <span className="title">{`${simulation} `}</span>
                                        <span className="desc">{`${simulations[simulation].description} `}</span>
                                    </button>
                                </_Link>
                            )
                        })}
                    </div>
                </div>
            </Layout>
        )
    }
}