const VERSION = "1.2.0"

function syncValue(self) {
    document.getElementById(self.id.replace("slider", "value")).value = self.value;
}

function syncSlider(self) {
    document.getElementById(self.id.replace("value", "slider")).value = self.value;
}

document.addEventListener('DOMContentLoaded', () => {
    const
        kpSlider = document.getElementById('kP-slider'),
        kiSlider = document.getElementById('kI-slider'),
        kdSlider = document.getElementById('kD-slider'),
        frictionSlider = document.getElementById('friction-slider');

    const ctx = document.getElementById('chart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 101 }, (_, i) => i),
            datasets: [{
                label: 'Robot Position',
                data: [0, 10, 19, 27.1, 34.39, 40.951, 46.8559, 52.17031, 56.953279, 61.2579511, 65.13215599, 68.618940391, 71.7570463519, 74.58134171671, 77.123207545039, 79.4108867905351, 81.4697981114816, 83.32281830033344, 84.9905364703001, 86.49148282327009, 87.84233454094309, 89.05810108684878, 90.1522909781639, 91.13706188034752, 92.02335569231276, 92.82102012308148, 93.53891811077334, 94.185026299696, 94.76652366972641, 95.28987130275377, 95.76088417247838, 96.18479575523054, 96.56631617970748, 96.90968456173674, 97.21871610556306, 97.49684449500675, 97.74716004550608, 97.97244404095547, 98.17519963685992, 98.35767967317392, 98.52191170585652, 98.66972053527087, 98.80274848174378, 98.9224736335694, 99.03022627021245, 99.12720364319121, 99.21448327887208, 99.29303495098488, 99.36373145588638, 99.42735831029775, 99.48462247926797, 99.53616023134117, 99.58254420820705, 99.62428978738635, 99.66186080864772, 99.69567472778294, 99.72610725500465, 99.75349652950419, 99.77814687655378, 99.8003321888984, 99.82029897000855, 99.8382690730077, 99.85444216570693, 99.86899794913623, 99.8820981542226, 99.89388833880034, 99.90449950492031, 99.91404955442827, 99.92264459898544, 99.93038013908689, 99.9373421251782, 99.94360791266038, 99.94924712139435, 99.95432240925491, 99.95889016832942, 99.96300115149647, 99.96670103634682, 99.97003093271213, 99.97302783944092, 99.97572505549682, 99.97815254994714, 99.98033729495242, 99.98230356545717, 99.98407320891145, 99.9856658880203, 99.98709929921827, 99.98838936929644, 99.9895504323668, 99.99059538913012, 99.9915358502171, 99.99238226519539, 99.99314403867585, 99.99382963480826, 99.99444667132744, 99.99500200419469, 99.99550180377523, 99.9959516233977, 99.99635646105793, 99.99672081495214, 99.99704873345692, 99.99734386011123],
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            },
        }
    });

    function debounce(func, wait) {
        let timeout;

        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const updateChartAndValue = debounce(function () {
        const
            kpValue = parseFloat(kpSlider.value),
            kiValue = parseFloat(kiSlider.value),
            kdValue = parseFloat(kdSlider.value),
            frictionValue = parseFloat(frictionSlider.value);

        fetch('/simulate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    kpValue: kpValue,
                    kiValue: kiValue,
                    kdValue: kdValue,
                    frictionValue: frictionValue
                }
            )
        })
            .then(response => response.json())
            .then(data => {
                chart.data.datasets[0].data = data.robot_position;
                chart.update();
            })
            .catch(error => console.error('Error:', error));
    }, 300);

    kpSlider.addEventListener('input', updateChartAndValue);
    kiSlider.addEventListener('input', updateChartAndValue);
    kdSlider.addEventListener('input', updateChartAndValue);
    frictionSlider.addEventListener('input', updateChartAndValue);
});