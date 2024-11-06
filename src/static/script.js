/**
 * 
 * @param {ThisType} self 
 */
function sync(self) {
    self.id.includes("slider") ? (
        document.getElementById(self.id.replace("slider", "value")).value = self.value
    ) : (
        document.getElementById(self.id.replace("value", "slider")).value = self.value
    );
}

document.addEventListener('DOMContentLoaded', () => {
    function activateButton() {
        this.classList.toggle('active');
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    }
    
    document.getElementById('hdtw-btn').addEventListener('click', activateButton);
    const
        kpSlider = document.getElementById('kp-slider') ?? null,
        kiSlider = document.getElementById('ki-slider') ?? null,
        kdSlider = document.getElementById('kd-slider') ?? null,
        frictionSlider = document.getElementById('friction-slider') ?? null,
        spacingSlider = document.getElementById('spacing-slider') ?? null,
        bSlider = document.getElementById('b-slider') ?? null;

    const config = {
        "pid": {
            kpValue: { slider: kpSlider, default: 0 },
            kiValue: { slider: kiSlider, default: 0 },
            kdValue: { slider: kdSlider, default: 0 },
            frictionValue: { slider: frictionSlider, default: 0 }
        },
        "waypoint-generation": {
            spacingValue: { slider: spacingSlider, default: 1 },
            bValue: { slider: bSlider, default: 0.75 }
        }
    };

    const ctx = document.getElementById('chart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'scatter',
        data: {},
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                },
                y: {
                    beginAtZero: true,
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });

    /**
     * 
     * @param {string} type --> pid, waypoint-generation
     */
    function addListenersForType(type) {
        Object.values(config[type])?.forEach(slider => {
            slider["slider"]?.addEventListener('input', () => initChange(type));
        });
    }

    /**
     * 
     * @param {function} func 
     * @param {number} wait @default {300}
     * @returns 
     */
    function debounce(func, wait = 300) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    /**
     * 
     * @param {string} type --> pid, waypoint-generation (inherited)
     */
    function initChange(type) {
        const data = {};

        if (config[type]) {
            for (const [key, { slider, default: defaultValue }] of Object.entries(config[type])) {
                data[key] = parseFloat(slider?.value) || defaultValue;
            }
        }

        sendSimulationData({ ...data, ...{ type }  });
    }
    
    const sendSimulationData = debounce(
        /**
         * 
         * @param {JSON} data 
         */
        function(data) {
            fetch('/dataEx', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...data
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data["type"] == 'pid') {
                    chart.data = {
                        labels: Array.from({ length: 101 }, (_, i) => i),
                        datasets: [
                            {
                                label: 'Robot Position',
                                data: data.robot_position,
                                pointBackgroundColor: '#9BD0F5',
                                pointBorderColor: '#36A2EB',
                                pointBorderWidth: 2,
                                pointHoverBorderWidth: 2
                            },
                            {
                                label: 'Destination',
                                data: Array(100).fill(100),
                                borderDash: [5, 5],
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 2,
                                showLine: true,
                                pointRadius: 0,
                            }
                        ]
                    };
        
                    chart.options.scales.y.suggestedMax = 120;
        
                    if (data.intersect) {
                        chart.options.plugins.annotation = {
                            annotations: {
                                point1: {
                                    type: 'point',
                                    xValue: data.intersect,
                                    yValue: 100,
                                    backgroundColor: '#FFB1C1',
                                    borderColor: '#FF6384',
                                    borderWidth: 2
                                }
                            }
                        };
                    } else {
                        chart.options.plugins.annotation = { annotations: {} };
                    }

                    chart.update();
                } else if (data['type'] == 'waypoint-generation') {
                    chart.data = {
                        labels: data.PIA_list.map(item => item.x),
                        datasets: [
                            {
                                label: 'Injected Robot Path',
                                data: data.PIA_list.map(item => item.y),
                                pointBackgroundColor: '#9BD0F5',
                                pointBorderColor: '#36A2EB',
                                pointBorderWidth: 2,
                                pointHoverBorderWidth: 2
                            },
                            {
                                label: 'Smoothed Robot Path',
                                data: data.PSA_list.map(item => item.y),
                                pointBackgroundColor: '#FFB1C1',
                                pointBorderColor: '#FF6384',
                                pointBorderWidth: 2,
                                pointHoverBorderWidth: 2
                            }
                        ]
                    };
        
                    chart.options.elements = {
                        point: { radius: 6, hoverRadius: 10 }
                    };
        
                    chart.update();
                }
            })
            .catch(error => console.error('Error:', error));
    }, 300);

    addListenersForType(window.location.pathname.replace("/", ""));

    initChange(window.location.pathname.replace("/", ""));
});