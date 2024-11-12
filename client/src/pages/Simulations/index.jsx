import React from "react";

import Layout from "../../components/Layout";
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
                        <_Link to="/pid/">
                            <button className="pid option">
                                <span className="title">PID</span>
                                <span className="desc">Controlling motion through adjusting power to achieve smooth and stable motion</span>
                            </button>
                        </_Link>
                        <_Link>
                            <button className="pure-pursuit option unavailable">
                                <span className="title">Pure Pursuit (Unavailable Currently)</span>
                                <span className="desc">Path following motion that calculates the necessary steering or heading adjusments to reach a waypoint</span>
                            </button>
                        </_Link>
                        <_Link to="/waypoint-generation/">
                            <button className="waypoint-generation option">
                                <span className="title">Waypoint Generation</span>
                                <span className="desc">Production of a sequence of positions (aka waypoints) for the system to follow</span>
                            </button>
                        </_Link>
                        <_Link>
                            <button className="odometry option unavailable">
                                <span className="title">Odometry (Unavailable Currently)</span>
                                <span className="desc">Track current position and robots path to provide feedback to suport accurate motion control</span>
                            </button>
                        </_Link>
                        <_Link>
                            <button className="kalman-filter option unavailable">
                                <span className="title">Kalman Filter (Unavailable Currently)</span>
                                <span className="desc">Estimatation of motion for controlling real-time motion by filter out sensor noise</span>
                            </button>
                        </_Link>
                        <_Link>
                            <button className="a-star option unavailable">
                                <span className="title">A* Algorithm (Unavailable Currently)</span>
                                <span className="desc">A pathfinding algorithm that searches for the most efficient and shortest path between two points in a network</span>
                            </button>
                        </_Link>
                        <_Link>
                            <button className="mtrp option unavailable">
                                <span className="title">Minimum Time Receding Horizon Planner (MTRP) (Unavailable Currently)</span>
                                <span className="desc">Optimizing motion through dynamically adjusting the motion trajectory over a receding horizon, minimizing the time taken to reach a destination</span>
                            </button>
                        </_Link>
                        <_Link>
                            <button className="rrt option unavailable">
                                <span className="title">Rapidly Exploring Random Tree (RRT) (Unavailable Currently)</span>
                                <span className="desc">Generating feasbile paths around obstacles from start to finish ensuring smooth motion</span>
                            </button>
                        </_Link>
                    </div>
                </div>
            </Layout>
        )
    }
}