function updateTimer() {
    const state = JSON.parse(localStorage.getItem('timerState'));
    if (state) {
        document.getElementById('timer').textContent = state.display;
        document.getElementById('status').textContent = state.currentMode;
    }
}

setInterval(updateTimer, 1000);

function applyColors() {
    const savedConfig = localStorage.getItem('obsTimerConfig');
    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        document.documentElement.style.setProperty('--timer-color', config.timerColor);
        document.documentElement.style.setProperty('--status-color', config.statusColor);

        // Apply position
        const container = document.body;

        // Reset previous styles
        container.style.justifyContent = '';
        container.style.alignItems = '';

        // Apply horizontal position
        switch (config.horizontalPosition) {
            case 'left':
                container.style.alignItems = 'flex-start';
                break;
            case 'center':
                container.style.alignItems = 'center';
                break;
            case 'right':
                container.style.alignItems = 'flex-end';
                break;
        }

        // Apply vertical position
        switch (config.verticalPosition) {
            case 'top':
                container.style.justifyContent = 'flex-start';
                break;
            case 'middle':
                container.style.justifyContent = 'center';
                break;
            case 'bottom':
                container.style.justifyContent = 'flex-end';
                break;
        }
    }
}

// Aplicar colores al cargar la página
window.addEventListener('load', applyColors);

// Verificar cambios en localStorage
window.addEventListener('storage', function (e) {
    if (e.key === 'obsTimerConfig') {
        applyColors();
    }
});