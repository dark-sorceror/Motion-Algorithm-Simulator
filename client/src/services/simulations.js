export const simulations = {
    "Proportional Integral Derivative (PID)": {
        address: "pid",
        description: 'Controlling motion through adjusting power to achieve smooth and stable motion',
        available: true
    },
    "Pure Pursuit": {
        address: "pure-pursuit",
        description: 'Path following motion that calculates the necessary steering or heading adjustments to reach a waypoint',
        available: false
    },
    "Waypoint Generation": {
        address: "waypoint-generation",
        description: 'Production of a sequence of positions (aka waypoints) for the system to follow',
        available: true
    },
    "Odometry": {
        address: "odometry",
        description: 'Track current position and robots path to provide feedback to support accurate motion control',
        available: false
    },
    "Kalman Filter": {
        address: "kalman-filter",
        description: 'Estimation of motion for controlling real-time motion by filtering out sensor noise',
        available: false
    },
    "A* Algorithm": {
        address: "a-star-algorithm",
        description: 'A pathfinding algorithm that searches for the most efficient and shortest path between two points in a network',
        available: false
    },
    "Minimum Time Receding Horizon Planner (MTRP)": {
        address: "mtrp",
        description: 'Optimizing motion through dynamically adjusting the motion trajectory over a receding horizon, minimizing the time taken to reach a destination',
        available: false
    },
    "Rapidly Exploring Random Tree (RRT)": {
        address: "rrt",
        description: 'Generating feasible paths around obstacles from start to finish ensuring smooth motion',
        available: false
    }
}

export function getSimulationFromAddress(address) {
    return Object.keys(simulations).findIndex((simulation) => simulations[simulation].address == address);
}