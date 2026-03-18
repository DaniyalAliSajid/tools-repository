export function render(container: HTMLElement): void {
    let timerId: any = null;
    let rounds = 8;
    let workTime = 30;
    let restTime = 10;

    let currentRound = 1;
    let isWork = true;
    let timeLeft = workTime;

    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Workout Routine</h4>
        <div class="input-group">
          <label for="it-rounds-in">Total Rounds</label>
          <input type="number" id="it-rounds-in" class="input-field" value="8" min="1" style="padding: var(--space-3); font-weight: 700;">
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="it-work-in">Work Time (sec)</label>
            <input type="number" id="it-work-in" class="input-field" value="30" min="5" style="padding: var(--space-3);">
          </div>
          <div class="input-group">
            <label for="it-rest-in">Rest Time (sec)</label>
            <input type="number" id="it-rest-in" class="input-field" value="10" min="5" style="padding: var(--space-3);">
          </div>
        </div>
        
        <div style="margin-top: var(--space-6); display: flex; gap: var(--space-3);">
          <button class="btn btn--primary btn--lg" id="it-start" style="flex: 2;">▶ START</button>
          <button class="btn btn--secondary btn--lg" id="it-stop" style="flex: 1;" disabled>◼ STOP</button>
        </div>
        <button class="btn btn--outline btn--block" id="it-reset" style="margin-top: var(--space-3);">RESET PROGRESS</button>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>HIIT Tip:</strong> High-intensity interval training (HIIT) is scientifically proven to burn more fat than steady-state cardio.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Active Timer</h3>
      </div>
      
      <div class="result-box" style="padding: var(--space-10); display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--color-surface-hover); min-height: 350px; border-radius: var(--radius-3xl); transition: background 0.3s ease;">
        <div id="it-status" style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: var(--space-2); font-weight: 800;">PREPARE</div>
        <div id="it-time" style="font-size: 8rem; font-weight: 900; color: var(--color-primary); line-height: 1; font-variant-numeric: tabular-nums;">00:30</div>
        
        <div id="it-round" style="margin-top: var(--space-8); font-size: var(--fs-sm); font-weight: 600; color: var(--color-text-secondary); padding: var(--space-2) var(--space-4); background: var(--color-primary-light); border-radius: var(--radius-full);">Round 1 / 8</div>
        
        <div id="it-progress" style="margin-top: var(--space-10); width: 100%; height: 6px; background: var(--color-border); border-radius: 3px; overflow: hidden;">
            <div id="it-progress-bar" style="width: 100%; height: 100%; background: var(--color-primary); transition: width 1s linear;"></div>
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
        const total = isWork ? workTime : restTime;
        const prog = (timeLeft / total) * 100;
        const progBar = document.getElementById('it-progress-bar')!;
        progBar.style.width = `${prog}%`;

        if (timeLeft < 0) {
            if (isWork) {
                isWork = false;
                timeLeft = restTime;
                statusEl.textContent = 'REST';
                statusEl.style.color = '#10b981';
                progBar.style.backgroundColor = '#10b981';
            } else {
                isWork = true;
                currentRound++;
                if (currentRound > rounds) {
                    stop();
                    statusEl.textContent = 'FINISHED';
                    statusEl.style.color = 'var(--color-primary)';
                    progBar.style.width = '0%';
                    return;
                }
                timeLeft = workTime;
                statusEl.textContent = 'WORK';
                statusEl.style.color = '#ef4444';
                progBar.style.backgroundColor = '#ef4444';
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
