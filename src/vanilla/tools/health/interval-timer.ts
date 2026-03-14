export function render(container: HTMLElement): void {
    let timerId: any = null;
    let rounds = 8;
    let workTime = 30;
    let restTime = 10;

    let currentRound = 1;
    let isWork = true;
    let timeLeft = workTime;

    container.innerHTML = `
    <div class="section-gap" style="text-align: center;">
      <div id="it-status" style="font-size: var(--fs-xl); font-weight: 700; color: #ef4444; margin-bottom: var(--space-2);">WORK</div>
      <div id="it-time" style="font-size: 6rem; font-weight: 700; margin-bottom: var(--space-4);">00:30</div>
      <div id="it-round" style="font-size: var(--fs-lg); margin-bottom: var(--space-6);">Round 1 / 8</div>
      
      <div style="display: flex; gap: var(--space-4); justify-content: center;">
        <button class="btn btn--primary" id="it-start">Start</button>
        <button class="btn btn--secondary" id="it-stop" disabled>Stop</button>
        <button class="btn btn--secondary" id="it-reset">Reset</button>
      </div>

      <div class="tool-grid-3" style="margin-top: var(--space-8);">
        <div class="input-group">
          <label>Rounds</label>
          <input type="number" id="it-rounds-in" class="input-field" value="8" min="1">
        </div>
        <div class="input-group">
          <label>Work (s)</label>
          <input type="number" id="it-work-in" class="input-field" value="30" min="5">
        </div>
        <div class="input-group">
          <label>Rest (s)</label>
          <input type="number" id="it-rest-in" class="input-field" value="10" min="5">
        </div>
      </div>
    </div>
  `;

    const statusEl = document.getElementById('it-status')!;
    const timeEl = document.getElementById('it-time')!;
    const roundEl = document.getElementById('it-round')!;
    const startBtn = document.getElementById('it-start') as HTMLButtonElement;
    const stopBtn = document.getElementById('it-stop') as HTMLButtonElement;
    const resetBtn = document.getElementById('it-reset') as HTMLButtonElement;

    const rIn = document.getElementById('it-rounds-in') as HTMLInputElement;
    const wIn = document.getElementById('it-work-in') as HTMLInputElement;
    const rsIn = document.getElementById('it-rest-in') as HTMLInputElement;

    const updateDisplay = () => {
        const min = Math.floor(timeLeft / 60);
        const sec = timeLeft % 60;
        timeEl.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
        roundEl.textContent = `Round ${currentRound} / ${rounds}`;
    };

    const tick = () => {
        timeLeft--;
        if (timeLeft < 0) {
            if (isWork) {
                isWork = false;
                timeLeft = restTime;
                statusEl.textContent = 'REST';
                statusEl.style.color = '#166534';
            } else {
                isWork = true;
                currentRound++;
                if (currentRound > rounds) {
                    stop();
                    statusEl.textContent = 'FINISHED';
                    statusEl.style.color = 'var(--color-primary)';
                    return;
                }
                timeLeft = workTime;
                statusEl.textContent = 'WORK';
                statusEl.style.color = '#ef4444';
            }
        }
        updateDisplay();
    };

    const start = () => {
        rounds = parseInt(rIn.value);
        workTime = parseInt(wIn.value);
        restTime = parseInt(rsIn.value);
        if (timerId) clearInterval(timerId);
        timerId = setInterval(tick, 1000);
        startBtn.disabled = true;
        stopBtn.disabled = false;
    };

    const stop = () => {
        clearInterval(timerId);
        timerId = null;
        startBtn.disabled = false;
        stopBtn.disabled = true;
    };

    startBtn.addEventListener('click', start);
    stopBtn.addEventListener('click', stop);
    resetBtn.addEventListener('click', () => {
        stop();
        currentRound = 1;
        isWork = true;
        timeLeft = parseInt(wIn.value);
        statusEl.textContent = 'WORK';
        statusEl.style.color = '#ef4444';
        updateDisplay();
    });
}
