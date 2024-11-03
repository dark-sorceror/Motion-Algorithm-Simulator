const VERSION = "1.4.0"

function syncValue(self) {
    document.getElementById(self.id.replace("slider", "value")).value = self.value;
}

function syncSlider(self) {
    document.getElementById(self.id.replace("value", "slider")).value = self.value;
}

document.addEventListener('DOMContentLoaded', () => {
    const
        kpSlider = document.getElementById('kP-slider') ?? null,
        kiSlider = document.getElementById('kI-slider') ?? null,
        kdSlider = document.getElementById('kD-slider') ?? null,
        frictionSlider = document.getElementById('friction-slider') ?? null,
        spacingSlider = document.getElementById('spacing-slider') ?? null,
        bSlider = document.getElementById('b-slider') ?? null;

    const ctx = document.getElementById('chart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{}]
        },
        options: {
            responsive: true,
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
            }
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
            kpValue = parseFloat(kpSlider?.value) || 0,
            kiValue = parseFloat(kiSlider?.value) || 0,
            kdValue = parseFloat(kdSlider?.value) || 0,
            frictionValue = parseFloat(frictionSlider?.value) || 0,
            spacingValue = parseFloat(spacingSlider?.value) || 1,
            bValue = parseFloat(bSlider?.value) || 0.75;

        fetch('/dataEx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    kpValue: kpValue,
                    kiValue: kiValue,
                    kdValue: kdValue,
                    frictionValue: frictionValue,
                    spacingValue: spacingValue,
                    bValue: bValue
                }
            )
        })
        .then(response => response.json())
        .then(data => {
            if (window.location.pathname == "/pid") {
                chart.data.labels = Array.from({ length: 101 }, (_, i) => i);
                chart.data.datasets[0].label = 'Robot Position';
                chart.data.datasets[0].data = data.robot_position;
                chart.data.datasets[1] = {
                    label: 'Destination',
                    data: Array(100).fill(100),
                    borderDash: [5, 5],
                    borderColor: 'rgba(255, 99, 132, 1)', // Line color
                    borderWidth: 2,
                    showLine: true,
                    pointRadius: 0
                };
                chart.options.plugins.annotation = {
                    annotations: {
                        point1: {
                            type: 'point',
                            xValue: data.intersect,
                            yValue: 100,
                            backgroundColor: 'rgba(255, 99, 132)'
                        }
                    }
                };
                chart.update();
            }
                
            if (window.location.pathname == "/waypoint-generation") {
                chart.data.labels = data.PIA_list.map(item => item.x);
                chart.data.datasets[0].data = data.PIA_list.map(item => item.y);
                chart.data.datasets[0].label = 'Injected Robot Path';

                chart.data.datasets[1] = {
                    label: 'Smoothed Robot Path',
                    data: data.PSA_list.map(item => item.y),
                };

                chart.options["elements"] = {
                    point: {
                        radius: 6,
                        hoverRadius: 10
                    }
                };
                chart.update();
            }
        })
        .catch(error => console.error('Error:', error));
    }, 300);

    updateChartAndValue();

    kpSlider?.addEventListener('input', updateChartAndValue);
    kiSlider?.addEventListener('input', updateChartAndValue);
    kdSlider?.addEventListener('input', updateChartAndValue);
    frictionSlider?.addEventListener('input', updateChartAndValue);

    spacingSlider?.addEventListener('input', updateChartAndValue);
    bSlider?.addEventListener('input', updateChartAndValue);
});