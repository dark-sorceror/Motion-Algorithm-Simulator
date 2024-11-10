import React from "react";

import Layout from "../../components/Layout";
import _Link from "../../components/Link";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Layout
                title="Motion Algorithm Simulator"
                description="Visualize the various algorithms for generating, controlling and tracking motion paths through simulations"
            >
                <div className="options">
                    <_Link to="/pid/">
                        <button className="pid option">
                            <span className="title">PID</span>
                            <span className="desc">Controlling motion through adjusting power to achieve smooth and stable motion</span>
                        </button>
                    </_Link>
                    <_Link to="/pure-pursuit/">
                        <button className="pure-pursuit option">
                            <span className="title">Pure Pursuit</span>
                            <span className="desc">Path following motion that calculates the necessary steering or heading adjusments to reach a waypoint</span>
                        </button>
                    </_Link>
                    <_Link to="/waypoint-generation/">
                        <button className="waypoint-generation option">
                            <span className="title">Waypoint Generation</span>
                            <span className="desc">Production of a sequence of positions (aka waypoints) for the system to follow</span>
                        </button>
                    </_Link>
                    <_Link to="/odometry/">
                        <button className="odometry option">
                            <span className="title">Odometry</span>
                            <span className="desc">Track current position and robots path to provide feedback to suport accurate motion control</span>
                        </button>
                    </_Link>
                    <_Link to="/kalman-filter/">
                        <button className="kalman-filter option">
                            <span className="title">Kalman Filter</span>
                            <span className="desc">Estimatation of motion for controlling real-time motion by filter out sensor noise</span>
                        </button>
                    </_Link>
                    <_Link to="/A-star/">
                        <button className="a-star option">
                            <span className="title">A* Algorithm</span>
                            <span className="desc">A pathfinding algorithm that searches for the most efficient and shortest path between two points in a network</span>
                        </button>
                    </_Link>
                    <_Link to="/mtrp/">
                        <button className="mtrp option">
                            <span className="title">Minimum Time Receding Horizon Planner (MTRP)</span>
                            <span className="desc">Optimizing motion through dynamically adjusting the motion trajectory over a receding horizon, minimizing the time taken to reach a destination</span>
                        </button>
                    </_Link>
                    <_Link to="/rrt/">
                        <button className="rrt option">
                            <span className="title">Rapidly Exploring Random Tree (RRT)</span>
                            <span className="desc">Generating feasbile paths around obstacles from start to finish ensuring smooth motion</span>
                        </button>
                    </_Link>
                </div>
            </Layout>
        )
    }
}

export default HomePage;