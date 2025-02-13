function updateTimer() {
    const state = JSON.parse(localStorage.getItem('timerState'));
    if (state) {
        document.getElementById('timer').textContent = state.display;
        document.getElementById('status').textContent = state.currentMode;
    }
}

setInterval(updateTimer, 1000);
updateTimer();

// Cargar y aplicar colores guardados
function applyColors() {
    const savedConfig = localStorage.getItem('obsTimerConfig');
    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        document.documentElement.style.setProperty('--timer-color', config.timerColor);
        document.documentElement.style.setProperty('--status-color', config.statusColor);
    }
}

// Aplicar colores al cargar la página
applyColors();

// Verificar cambios en localStorage
window.addEventListener('storage', function (e) {
    if (e.key === 'obsTimerConfig') {
        applyColors();
    }
});