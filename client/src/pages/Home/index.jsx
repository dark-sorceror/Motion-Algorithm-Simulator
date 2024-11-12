import React from "react";
import Layout from "../../components/Layout";
import _Link from "../../components/Link";

import './animation/styles.css';
import './styles.scss'

export class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            demoStep: 0
        };
    }

    componentDidMount() {
        this.startDemo();
    }

    startDemo() {
        this.runPID();
    }

    runPID() {
        const robot = document.getElementById('robot');
        if (!robot) return;

        let speed = 0;
        let robotPosition = { x: 150, y: 25 };

        const target = { x: 700, y: 25 };
        const maxSpeed = 4;
        const minSpeed = 0.5;
        const targetRadius = 10;

        const pidControl = () => {
            if (!robot) return;

            const dx = target.x - robotPosition.x;
            const dy = target.y - robotPosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < targetRadius) speed = 0;
            else speed = Math.max(minSpeed, Math.min(maxSpeed, maxSpeed * (distance / 450)));

            robotPosition.x += (dx / distance) * speed;
            robotPosition.y += (dy / distance) * speed;

            robot.style.left = `${robotPosition.x - 15}px`;
            robot.style.top = `${robotPosition.y - 15}px`;

            if (distance > targetRadius) requestAnimationFrame(pidControl);
            else {
                this.moveBackward(robotPosition, () => {
                    setTimeout(() => {
                        this.runPurePursuit();
                    }, 100);
                });
            }
        };

        pidControl();
    }

    moveBackward(startPosition, callback) {
        const robot = document.getElementById('robot');
        if (!robot) return;

        let robotPosition = { ...startPosition };
        let speed = 0;

        const target = { x: 150, y: 25 };
        const maxSpeed = 4;
        const minSpeed = 0.5;
        const targetRadius = 10;

        const pidControlBackward = () => {
            if (!robot) return;

            const dx = target.x - robotPosition.x;
            const dy = target.y - robotPosition.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < targetRadius) speed = 0;
            else speed = Math.max(minSpeed, Math.min(maxSpeed, maxSpeed * (distance / 450)));

            robotPosition.x += (dx / distance) * speed;
            robotPosition.y += (dy / distance) * speed;

            robot.style.left = `${robotPosition.x - 15}px`;
            robot.style.top = `${robotPosition.y - 15}px`;

            if (distance > targetRadius) requestAnimationFrame(pidControlBackward);
            else callback();
        };

        pidControlBackward();
    }

    runPurePursuit() {
        const robot = document.getElementById('robot');
        if (!robot) return;

        let robotPosition = { x: 150, y: 25 };
        let startAngle = 0;

        const speed = 2;
        const waveAmplitude = 50;
        const waveFrequency = 0.02;
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
                frame++;
                const angle = startAngle + angleDiff * (frame / totalFrames);
                robot.style.transform = `rotate(${angle}rad)`;

                if (frame < totalFrames) requestAnimationFrame(rotateFrame);
                else if (callback) callback();
            };

            requestAnimationFrame(rotateFrame);
        };

        startAngle = calculateAngle(robotPosition.x);

        rotateRobot(startAngle, 1000, () => {
            moveRobotForward();
        });

        const moveRobotForward = () => {
            const forwardInterval = setInterval(() => {
                if (robotPosition.x < totalPathLength) {
                    robotPosition.x += speed;
                    robotPosition.y = 25 + waveAmplitude * Math.sin(waveFrequency * robotPosition.x);

                    const angle = calculateAngle(robotPosition.x);

                    robot.style.left = `${robotPosition.x - 15}px`;
                    robot.style.top = `${robotPosition.y - 15}px`;
                    robot.style.transform = `rotate(${angle}rad)`;
                } else {
                    clearInterval(forwardInterval);

                    rotateRobot(0, 1000, () => {
                        setTimeout(() => {
                            const backwardStartAngle = calculateAngle(robotPosition.x);

                            rotateRobot(backwardStartAngle, 1000, () => {
                                moveRobotBackward();
                            });
                        }, 1000);
                    });
                }
            }, 16);
        };

        const moveRobotBackward = () => {
            let robotPositionBackward = { x: totalPathLength, y: 25 };

            const backwardInterval = setInterval(() => {
                if (robotPositionBackward.x > 150) {
                    robotPositionBackward.x -= speed;
                    robotPositionBackward.y = 25 + waveAmplitude * Math.sin(waveFrequency * robotPositionBackward.x);

                    const angle = calculateAngle(robotPositionBackward.x);

                    robot.style.left = `${robotPositionBackward.x - 15}px`;
                    robot.style.top = `${robotPositionBackward.y - 15}px`;
                    robot.style.transform = `rotate(${angle}rad)`;
                } else {
                    clearInterval(backwardInterval);

                    rotateRobot(0, 1000, () => {
                        setTimeout(() => {
                            this.runPID();
                        }, 1000);
                    });
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
                    </div>
                    <div className="right">
                        <div id="robot" className="robot"></div>
                    </div>
                </div>
            </Layout>
        )
    }
}