import React from "react";

import Layout from "../../components/Layout";
import Simulation from "../../components/Simulator";

class SimulationPage extends React.Component {
    constructor (props) {
        super (props);
    }

    render () {
        return (
            <Layout
                title={"Motion Algorithm Simulator"}
            >
                <Simulation />
            </Layout>
        )
    }
}

export default SimulationPage;