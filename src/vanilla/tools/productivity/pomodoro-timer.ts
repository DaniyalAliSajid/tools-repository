export function render(container: HTMLElement): void {
    let timeLeft = 25 * 60;
    let timerId: any = null;
    let isWork = true;

    container.innerHTML = `
    <div class="tool-layout__input">
      <div style="text-align: center; padding: var(--space-8) 0;">
        <div id="pomo-label" style="font-size: var(--fs-lg); font-weight: 600; color: var(--color-primary); margin-bottom: var(--space-2); text-transform: uppercase; letter-spacing: 1px;">Focus Session</div>
        <div id="pomo-time" style="font-size: 5rem; font-weight: 700; color: var(--color-text); line-height: 1; margin: var(--space-4) 0;">25:00</div>
        
        <div style="display: flex; gap: var(--space-3); justify-content: center; margin-top: var(--space-8);">
          <button class="btn btn--primary" id="pomo-start" style="padding-left: var(--space-8); padding-right: var(--space-8);">Start</button>
          <button class="btn btn--secondary" id="pomo-pause" disabled>Pause</button>
          <button class="btn btn--secondary" id="pomo-reset">Reset</button>
        </div>
      </div>
    </div>

    <div class="tool-layout__output">
      <h3 style="margin-bottom: var(--space-6); font-size: var(--fs-base); font-weight: var(--fw-bold);">Timer Settings</h3>
      <div style="display: flex; flex-direction: column; gap: var(--space-6);">
        <div class="input-group">
          <label>Work Duration (minutes)</label>
          <input type="number" id="pomo-work-min" class="input-field" value="25" min="1" max="60">
        </div>
        <div class="input-group">
          <label>Break Duration (minutes)</label>
          <input type="number" id="pomo-break-min" class="input-field" value="5" min="1" max="30">
        </div>
        <div style="padding: var(--space-4); background: var(--color-surface); border-radius: var(--radius-lg); border-left: 4px solid var(--color-primary);">
          <p style="font-size: var(--fs-xs); color: var(--color-text-secondary); line-height: 1.5;">
            Tip: Use the Pomodoro technique to maintain high focus. Work for 25 minutes, then take a 5-minute break.
          </p>
        </div>
      </div>
    </div>
  `;

    const timeEl = document.getElementById('pomo-time')!;
    const labelEl = document.getElementById('pomo-label')!;
    const startBtn = document.getElementById('pomo-start') as HTMLButtonElement;
    const pauseBtn = document.getElementById('pomo-pause') as HTMLButtonElement;
    const resetBtn = document.getElementById('pomo-reset') as HTMLButtonElement;

    const workMinIn = document.getElementById('pomo-work-min') as HTMLInputElement;
    const breakMinIn = document.getElementById('pomo-break-min') as HTMLInputElement;

    const updateDisplay = () => {
        const min = Math.floor(timeLeft / 60);
        const sec = timeLeft % 60;
        timeEl.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
    };

    const start = () => {
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        timerId = setInterval(() => {
            timeLeft--;
            if (timeLeft <= 0) {
                clearInterval(timerId);
                isWork = !isWork;
                timeLeft = (isWork ? parseInt(workMinIn.value) : parseInt(breakMinIn.value)) * 60;
                labelEl.textContent = isWork ? 'Focus Session' : 'Break Time';
                labelEl.style.color = isWork ? 'var(--color-primary)' : '#166534';
                alert(isWork ? 'Back to work!' : 'Time for a break!');
                start();
            }
            updateDisplay();
        }, 1000);
    };

    startBtn.addEventListener('click', start);
    pauseBtn.addEventListener('click', () => {
        clearInterval(timerId);
        startBtn.disabled = false;
        pauseBtn.disabled = true;
    });
    resetBtn.addEventListener('click', () => {
        clearInterval(timerId);
        isWork = true;
        timeLeft = parseInt(workMinIn.value) * 60;
        labelEl.textContent = 'Focus Session';
        labelEl.style.color = 'var(--color-primary)';
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        updateDisplay();
    });
}
