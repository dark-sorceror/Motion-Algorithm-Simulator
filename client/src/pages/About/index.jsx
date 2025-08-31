import React from "react";

import { Layout } from "../../components/Layout";
import _Link from "../../components/Link";

import "./styles.scss";
import logo from "../../assets/logo.png";

export class AboutPage extends React.Component {
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
                        <h1>About</h1>
                    </div>
                    <div className="content">
                        <span>Made with React, Express and Python</span>
                        <br />
                        <span>Hosted on AWS (Docker)</span>
                        <br />
                        <span>Made By VEX Robotics Team 3388N Nova</span>
                        <br />
                        <img src={ logo } />
                        <br />
                        <div className="links">
                            <_Link to="https://github.com/dark-sorceror/Motion-Algorithm-Simulator/">
                                <button
                                    type="button"
                                    data-twe-ripple-init
                                    data-twe-ripple-color="light"
                                    className="github"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                                        <path d="M9 18c-4.51 2-5-2-7-2" />
                                    </svg>
                                </button>
                            </_Link>
                            <_Link to="https://www.youtube.com/@3388N">
                                <button
                                    type="button"
                                    data-twe-ripple-init
                                    data-twe-ripple-color="light"
                                    className="youtube"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                                        <path d="m10 15 5-3-5-3z" />
                                    </svg>
                                </button>
                            </_Link>
                            <_Link to="https://www.instagram.com/3388n_nova/">
                                <button
                                    type="button"
                                    data-twe-ripple-init
                                    data-twe-ripple-color="light"
                                    className="instagram"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="lucide lucide-instagram"
                                    >
                                        <rect
                                            width="20"
                                            height="20"
                                            x="2"
                                            y="2"
                                            rx="5"
                                            ry="5"
                                        />
                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                        <line
                                            x1="17.5"
                                            x2="17.51"
                                            y1="6.5"
                                            y2="6.5"
                                        />
                                    </svg>
                                </button>
                            </_Link>
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}
