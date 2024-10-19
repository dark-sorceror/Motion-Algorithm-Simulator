document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('slider');
    const resultDisplay = document.getElementById('result');
    const ctx = document.getElementById('chart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: 100 }, (_, i) => i),
            datasets: [{
                label: 'PID Output P for now',
                data: new Array(100).fill(0),
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
            }
        }
    });

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    const updateChartAndValue = debounce(function() {
        const pValue = parseFloat(slider.value);

        fetch('/pid', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ p_value: pValue })
        })
        .then(response => response.json())
        .then(data => {
            resultDisplay.textContent = `P Value: ${pValue}`;

            chart.data.datasets[0].data = data.output_values;
            chart.update();
        })
        .catch(error => console.error('Error:', error));
    }, 300);

    slider.addEventListener('input', updateChartAndValue);
});