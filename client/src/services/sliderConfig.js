export const config = {
    pid: [
        {
            id: 'kp-slider',
            label: 'kP',
            default: 1,
            min: 0,
            max: 5,
            step: 1
        },
        {
            id: 'ki-slider',
            label: 'kI',
            default: 0,
            min: 0,
            max: 5,
            step: 1
        },
        {
            id: 'kd-slider',
            label: 'kD',
            default: 0,
            min: 0,
            max: 5,
            step: 1
        },
        {
            id: 'friction-slider',
            label: 'Friction',
            default: 0,
            min: 0,
            max: 10,
            step: 1
        },
    ],
    'waypoint-generation': [
        {
            id: 'spacing-slider',
            label: 'Spacing',
            default: 1,
            min: 0.1,
            max: 1,
            step: 0.1
        },
        {
            id: 'b-slider',
            label: 'b',
            default: 0.75,
            min: 0.05,
            max: 0.95,
            step: 0.1
        },
    ],
};