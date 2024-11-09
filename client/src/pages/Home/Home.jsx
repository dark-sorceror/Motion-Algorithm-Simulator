import React from "react";
import { Outlet, Link } from "react-router-dom";

const Home = () => {
    return (
        <> 
            <div class="options">
                <button class="pid option">
                    <Link to = "/pid">PID</Link>
                    <span class="title">PID</span>
                    <span class="desc">See how the PID controller works</span>
                </button>
                <button class="pure-pursuit option">
                    <Link to = "/pure-pursuit">Pure Pursuit</Link>
                    <span class="title">Pure Pursuit</span>
                    <span class="desc">See how Pure Pursuit works</span>
                </button>
                <button class="waypoint-generation option">
                    <Link to = "/waypoint-generation">Waypoint Generation</Link>
                    <span class="title">Waypoint Generation</span>
                    <span class="desc">See how pure pursuit paths are generated through different algorithms</span>
                </button>
            </div>
            <Outlet />
        </>
    );
};

export default Home;