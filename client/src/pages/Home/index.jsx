import React from "react";

import _Link from "../../components/Link";
import { Layout } from "../../components/Layout";

import './animation/styles.css';
import './styles.scss';

export class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            demoStep: 0,
            isAnimating: false
        };
    }

    componentDidMount() {
        this.checkWidthAndStartAnimation();
        window.addEventListener('resize', this.checkWidthAndStartAnimation);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.checkWidthAndStartAnimation);
    }

    checkWidthAndStartAnimation = () => {
        const targetMarker = document.getElementById('target-marker');

        if (window.innerWidth >= 1440) {
            if (!this.state.isAnimating) {
                this.startAnimation();
            }
        } else {
            if (this.state.isAnimating) {
                this.stopAnimation();
            }

            targetMarker.classList.remove('a');
        }
    };

    startAnimation() {
        const robot = document.getElementById('robot');

        if (robot) {
            this.runPID();
        }
    }

    stopAnimation() {
        this.setState({ isAnimating: false });

        const robot = document.getElementById('robot');

        if (robot) {
            robot.style.animation = 'none';
            robot.style.transition = 'none';
        }

        cancelAnimationFrame(this.animationFrameId);
        clearInterval(this.animationIntervalId);
    }

    runPID() {
        const robot = document.getElementById('robot');
        if (!robot) return;

        let speed = 0;
        let robotPosition = { x: 150, y: -70 };

        const target = { x: 700, y: -70 };
        const maxSpeed = 4;
        const minSpeed = 0.1;
        const targetRadius = 10;

        const targetMarker = document.getElementById('target-marker');
        const arrow = document.getElementById('arrow');
        const arrowC = document.getElementById('arrow-c');

        targetMarker.style.left = `${target.x - 15}px`;
        targetMarker.style.top = `${target.y - 15}px`;

        setTimeout(() => {
            targetMarker.classList.add('a');
            arrow.classList.add('a');
        }, 250)

        const pidControl = () => {
            if (!robot || window.innerWidth < 1440) {
                this.stopAnimation();
                return;
            }

            const dx = target.x - robotPosition.x;
            const dy = target.y - robotPosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < targetRadius) speed = 0;
            else speed = Math.max(minSpeed, Math.min(maxSpeed, maxSpeed * (distance / 450)));

            robotPosition.x += (dx / distance) * speed;
            robotPosition.y += (dy / distance) * speed;

            robot.style.left = `${robotPosition.x - 15}px`;
            robot.style.top = `${robotPosition.y - 15}px`;

            arrow.style.height = `${speed * 20}px`;

            if (distance > targetRadius) requestAnimationFrame(pidControl);
            else {
                targetMarker.classList.remove('a');
                setTimeout(() => {
                    arrowC.classList.add('b');
                    this.moveBackward(robotPosition, () => {
                        targetMarker.classList.remove('a');
                        setTimeout(() => {
                            arrowC.classList.remove('b');
                            this.runPurePursuit();
                        }, 2000);
                    });
                }, 2000)
            }
        };

        pidControl();
    }

    moveBackward(startPosition, callback) {
        const robot = document.getElementById('robot');
        if (!robot) return;

        let robotPosition = { ...startPosition };
        let speed = 0;

        const target = { x: 150, y: -70 };
        const maxSpeed = 4;
        const minSpeed = 0.1;
        const targetRadius = 10;

        const targetMarker = document.getElementById('target-marker');
        const arrow = document.getElementById('arrow');

        targetMarker.style.left = `${target.x + 7}px`;
        targetMarker.style.top = `${target.y - 15}px`;

        setTimeout(() => {
            targetMarker.classList.add('a');
            arrow.classList.add('a');
        }, 250)

        const pidControlBackward = () => {
            if (!robot || window.innerWidth < 1440) {
                this.stopAnimation();
                return;
            }

            const dx = target.x - robotPosition.x;
            const dy = target.y - robotPosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < targetRadius) speed = 0;
            else speed = Math.max(minSpeed, Math.min(maxSpeed, maxSpeed * (distance / 450)));

            robotPosition.x += (dx / distance) * speed;
            robotPosition.y += (dy / distance) * speed;

            robot.style.left = `${robotPosition.x - 15}px`;
            robot.style.top = `${robotPosition.y - 15}px`;

            arrow.style.height = `${speed * 20}px`;

            if (distance > targetRadius) requestAnimationFrame(pidControlBackward);
            else callback();
        };

        pidControlBackward();
    }

    runPurePursuit() {
        const robot = document.getElementById('robot');
        if (!robot) return;

        let robotPosition = { x: 150, y: -70 };
        let startAngle = 0;

        const speed = 2;
        const waveAmplitude = 70;
        const waveFrequency = 0.018;
        const totalPathLength = 600;

        const calculateAngle = (x) => {
            const slope = waveAmplitude * waveFrequency * Math.cos(waveFrequency * x);

            return Math.atan(slope);
        };

        const rotateRobot = (targetAngle, duration, callback) => {
            const startAngle = parseFloat(robot.style.transform.replace('rotate(', '').replace('rad)', '')) || 0;
            const angleDiff = targetAngle - startAngle;
            const totalFrames = Math.ceil(duration / 16);

            let frame = 0;

            const rotateFrame = () => {
                if (!robot || window.innerWidth < 1440) {
                    this.stopAnimation();
                    return;
                }

                frame++;
                const angle = startAngle + angleDiff * (frame / totalFrames);
                robot.style.transform = `rotate(${angle}rad)`;

                if (frame < totalFrames) requestAnimationFrame(rotateFrame);
                else if (callback) callback();
            };

            requestAnimationFrame(rotateFrame);
        };

        const o1 = document.getElementById('o1');
        const o2 = document.getElementById('o2');
        const o3 = document.getElementById('o3');

        startAngle = calculateAngle(robotPosition.x);

        setTimeout(() => {
            o1.classList.add('a');
            o2.classList.add('a');
            o3.classList.add('a');
        }, 250)

        rotateRobot(startAngle, 1000, () => {
            moveRobotForward(() => {
                moveRobotBackward(() => {
                    rotateRobot(0, 1000, () => {
                        o1.classList.remove('a');
                        o2.classList.remove('a');
                        o3.classList.remove('a');

                        setTimeout(() => {
                            this.runPID();
                        }, 1000);
                    });
                });
            });
        });

        const moveRobotForward = (callback) => {
            const forwardInterval = setInterval(() => {
                if (!robot || window.innerWidth < 1440) {
                    this.stopAnimation();
                    return;
                }

                if (robotPosition.x < totalPathLength) {
                    robotPosition.x += speed;
                    robotPosition.y = -70 + waveAmplitude * Math.sin(waveFrequency * robotPosition.x);

                    const angle = calculateAngle(robotPosition.x);

                    robot.style.left = `${robotPosition.x - 15}px`;
                    robot.style.top = `${robotPosition.y - 15}px`;
                    robot.style.transform = `rotate(${angle}rad)`;
                } else {
                    clearInterval(forwardInterval);

                    callback();
                }
            }, 16);
        };

        const moveRobotBackward = (callback) => {
            let robotPositionBackward = { x: totalPathLength, y: -70 };

            const backwardInterval = setInterval(() => {
                if (!robot || window.innerWidth < 1440) {
                    this.stopAnimation();
                    return;
                }

                if (robotPositionBackward.x > 150) {
                    robotPositionBackward.x -= speed;
                    robotPositionBackward.y = -70 + waveAmplitude * Math.sin(waveFrequency * robotPositionBackward.x);

                    const angle = calculateAngle(robotPositionBackward.x);

                    robot.style.left = `${robotPositionBackward.x - 15}px`;
                    robot.style.top = `${robotPositionBackward.y - 15}px`;
                    robot.style.transform = `rotate(${angle}rad)`;
                } else {
                    clearInterval(backwardInterval);

                    callback();
                }
            }, 16);
        };
    }

    render() {
        return (
            <Layout
                title="Motion Algorithm Simulator"
                description="Visualize the various algorithms for generating, controlling and tracking motion paths through simulations"
            >
                <div className="home-wrapper">
                    <div className="left">
                        <h1>Motion Algorithm Simulator</h1>
                        <span>Simulate odometry, pure pursuit, and other motion algorithms with <br /> interactive visualizations</span>
                        <_Link to='/simulations/'>
                            <button className="cta">Try it now</button>
                        </_Link>
                    </div>
                    <div className="right">
                        <div id="robot" className="robot">
                            <div className="arrow-c" id="arrow-c">
                                <div className="arrow" id="arrow"></div>
                            </div>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="target-marker" id="target-marker"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        <div className="obstacle-marker o1" id="o1"></div>
                        <div className="obstacle-marker o2" id="o2"></div>
                        <div className="obstacle-marker o3" id="o3"></div>
                    </div>
                </div>
            </Layout>
        );
    }
}
