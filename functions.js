class Timer {

    constructor() {
        this.timeLeft = 50 * 60;
        this.isRunning = false;
        this.interval = null;
        this.currentMode = 'focus';

        this.display = document.querySelector('.timer-display');
        this.status = document.querySelector('.status');
        this.startBtn = document.getElementById('startBtn');
        this.resetBtn = document.getElementById('resetBtn');
        this.modeButtons = document.querySelectorAll('.mode-btn');

        this.startBtn.addEventListener('click', () => this.toggleTimer());
        this.resetBtn.addEventListener('click', () => this.reset());
        this.modeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.changeMode(e));
        });

        this.updateDisplay();
        this.saveState();
    }

    toggleTimer() {
        if (this.isRunning) {
            this.pause();
        } else {
            this.start();
        }
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.startBtn.textContent = 'Pause';
            this.interval = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                this.saveState();
                if (this.timeLeft <= 0) {
                    this.complete();
                }
            }, 1000);
        }
    }

    pause() {
        clearInterval(this.interval);
        this.isRunning = false;
        this.startBtn.textContent = 'Start';
        this.saveState();
    }

    reset() {
        this.pause();
        this.timeLeft = parseInt(document.querySelector('.mode-btn.active')?.dataset.time || 50) * 60;
        this.updateDisplay();
        this.saveState();
    }

    changeMode(e) {
        const minutes = parseInt(e.target.dataset.time);
        this.pause();
        this.timeLeft = minutes * 60;
        this.currentMode = e.target.classList.contains('focus') ? 'focus' :
            e.target.classList.contains('short') ? 'short break' : 'long break';
        this.status.textContent = this.currentMode.charAt(0).toUpperCase() + this.currentMode.slice(1);

        this.modeButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        this.updateDisplay();
        this.saveState();
    }

    complete() {
        this.pause();
        new Audio('./assets/alarm.mp3').play();
        this.reset();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.display.textContent =
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    saveState() {
        const state = {
            timeLeft: this.timeLeft,
            isRunning: this.isRunning,
            currentMode: this.currentMode,
            display: this.display.textContent
        };
        localStorage.setItem('timerState', JSON.stringify(state));
    }

    handleCustomTime() {
        const customTimeInput = document.getElementById('customTime');
        const minutes = parseInt(customTimeInput.value);

        if (isNaN(minutes) || minutes < 1 || minutes > 180) {
            alert('Please enter a valid time between 1 and 180 minutes');
            return;
        }

        this.pause();
        this.timeLeft = minutes * 60;
        this.currentMode = 'custom';
        this.status.textContent = `Custom (${minutes}min)`;

        this.modeButtons.forEach(btn => btn.classList.remove('active'));
        document.getElementById('customBtn').classList.add('active');

        this.updateDisplay();
        this.saveState();
    }
}

const timer = new Timer();

document.getElementById('customBtn').addEventListener('click', () => timer.handleCustomTime());

function saveColors() {
    const timerColor = document.getElementById('timerColor').value;
    const statusColor = document.getElementById('statusColor').value;

    // Guardar en localStorage
    localStorage.setItem('obsTimerConfig', JSON.stringify({
        timerColor,
        statusColor
    }));
}

// Cargar colores guardados al iniciar
window.addEventListener('load', function () {
    const savedConfig = localStorage.getItem('obsTimerConfig');
    if (savedConfig) {
        const config = JSON.parse(savedConfig);
        document.getElementById('timerColor').value = config.timerColor;
        document.getElementById('statusColor').value = config.statusColor;
    }
});




