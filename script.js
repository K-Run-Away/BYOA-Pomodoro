class PomodoroTimer {
    constructor() {
        this.timeLeft = 30 * 60; // 30 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        
        // Timer durations in minutes
        this.durations = {
            pomodoro25: 25,
            pomodoro50: 50,
            shortBreak: 5,
            longBreak: 15
        };

        this.timerSound = document.getElementById('timer-sound');
        this.initializeElements();
        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeElements() {
        this.minutesDisplay = document.getElementById('minutes');
        this.secondsDisplay = document.getElementById('seconds');
        this.startButton = document.getElementById('start');
        this.pauseButton = document.getElementById('pause');
        this.resetButton = document.getElementById('reset');
        this.pomodoro25Button = document.getElementById('pomodoro25');
        this.pomodoro50Button = document.getElementById('pomodoro50');
        this.shortBreakButton = document.getElementById('short-break');
        this.longBreakButton = document.getElementById('long-break');
    }

    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.start());
        this.pauseButton.addEventListener('click', () => this.pause());
        this.resetButton.addEventListener('click', () => this.reset());
        this.pomodoro25Button.addEventListener('click', () => this.setTimer('pomodoro25'));
        this.pomodoro50Button.addEventListener('click', () => this.setTimer('pomodoro50'));
        this.shortBreakButton.addEventListener('click', () => this.setTimer('shortBreak'));
        this.longBreakButton.addEventListener('click', () => this.setTimer('longBreak'));
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        
        // Update display
        this.minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        this.secondsDisplay.textContent = seconds.toString().padStart(2, '0');
        
        // Update page title
        document.title = `${timeString} - Pomodoro Timer`;
    }

    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.timerId = setInterval(() => {
                this.timeLeft--;
                this.updateDisplay();
                
                if (this.timeLeft === 0) {
                    this.pause();
                    this.timerSound.play()
                        .catch(error => console.log('Error playing sound:', error));
                    alert('Timer completed!');
                }
            }, 1000);
        }
    }

    pause() {
        this.isRunning = false;
        clearInterval(this.timerId);
    }

    reset() {
        this.pause();
        this.timeLeft = this.durations.pomodoro25 * 60;
        this.updateDisplay();
    }

    setTimer(mode) {
        this.pause();
        this.timeLeft = this.durations[mode] * 60;
        this.updateDisplay();
        
        // Update active button
        [this.pomodoro25Button, this.pomodoro50Button, this.shortBreakButton, this.longBreakButton].forEach(button => {
            button.classList.remove('active');
        });
        
        switch(mode) {
            case 'pomodoro25':
                this.pomodoro25Button.classList.add('active');
                break;
            case 'pomodoro50':
                this.pomodoro50Button.classList.add('active');
                break;
            case 'shortBreak':
                this.shortBreakButton.classList.add('active');
                break;
            case 'longBreak':
                this.longBreakButton.classList.add('active');
                break;
        }
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 