import React from "react";

import Layout from "../../components/Layout";
import Simulation from "../../components/Simulator";

class SimulationPage extends React.Component {
    constructor (props) {
        super (props);
    }

    

    render () {
        
        const simulationType = window.location.pathname.replace("/", "");
        console.log(simulationType);
        return (
            <Layout
                title={"Motion Algorithm Simulator"}
            >
                <Simulation simulationType={ 'pid' } />
            </Layout>
        )
    }
}

export default SimulationPage;