    // Gráfico mini progreso
        const miniCtx = document.getElementById('mini-progress-chart')?.getContext('2d');
        if (miniCtx) {
        new Chart(miniCtx, {
            type: 'doughnut',
            data: {
            labels: ['C', 'S', 'Z', 'X'],
            datasets: [{
                data: [25, 10, 5, 0],
                backgroundColor: [
                '#7952b3', '#f59e0b', '#10b981', '#ef4444'
                ],
                borderWidth: 0
            }]
            },
            options: {
            cutout: '70%',
            plugins: {
                legend: {
                position: 'bottom',
                labels: {
                    color: 'white',
                    boxWidth: 12,
                    padding: 20
                }
                }
            }
            }
        });
        }
        
        // Simular progreso global (deberías reemplazar con datos reales)
        setTimeout(() => {
        document.getElementById('global-progress').style.width = '25%';
        }, 500);