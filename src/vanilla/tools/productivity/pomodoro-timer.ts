export function render(container: HTMLElement): void {
    let timeLeft = 25 * 60;
    let timerId: any = null;
    let isWork = true;

    container.innerHTML = `
    <div class="section-gap" style="text-align: center;">
      <div id="pomo-label" style="font-size: var(--fs-xl); font-weight: 600; color: var(--color-primary); margin-bottom: var(--space-2);">Focus Session</div>
      <div id="pomo-time" style="font-size: 6rem; font-weight: 700; margin-bottom: var(--space-6);">25:00</div>
      
      <div style="display: flex; gap: var(--space-4); justify-content: center;">
        <button class="btn btn--primary" id="pomo-start">Start</button>
        <button class="btn btn--secondary" id="pomo-pause" disabled>Pause</button>
        <button class="btn btn--secondary" id="pomo-reset">Reset</button>
      </div>

      <div class="tool-grid-2" style="margin-top: var(--space-8); max-width: 400px; margin-left: auto; margin-right: auto;">
        <div class="input-group">
          <label>Focus (min)</label>
          <input type="number" id="pomo-work-min" class="input-field" value="25">
        </div>
        <div class="input-group">
          <label>Break (min)</label>
          <input type="number" id="pomo-break-min" class="input-field" value="5">
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
