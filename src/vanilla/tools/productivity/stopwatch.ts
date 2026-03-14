export function render(container: HTMLElement): void {
    let startTime = 0;
    let elapsedTime = 0;
    let timerId: any = null;
    let laps: number[] = [];

    container.innerHTML = `
    <div class="section-gap" style="text-align: center;">
      <div id="sw-time" style="font-size: 6rem; font-weight: 700; margin-bottom: var(--space-6); font-family: monospace;">00:00:00.00</div>
      
      <div style="display: flex; gap: var(--space-4); justify-content: center;">
        <button class="btn btn--primary" id="sw-start">Start</button>
        <button class="btn btn--secondary" id="sw-lap" disabled>Lap</button>
        <button class="btn btn--secondary" id="sw-stop" disabled>Stop</button>
        <button class="btn btn--secondary" id="sw-reset">Reset</button>
      </div>

      <div id="sw-laps" class="section-gap" style="max-width: 300px; margin-left: auto; margin-right: auto; text-align: left; height: 200px; overflow-auto;">
        <!-- Laps will appear here -->
      </div>
    </div>
  `;

    const timeEl = document.getElementById('sw-time')!;
    const startBtn = document.getElementById('sw-start') as HTMLButtonElement;
    const lapBtn = document.getElementById('sw-lap') as HTMLButtonElement;
    const stopBtn = document.getElementById('sw-stop') as HTMLButtonElement;
    const resetBtn = document.getElementById('sw-reset') as HTMLButtonElement;
    const lapsContainer = document.getElementById('sw-laps')!;

    const formatTime = (ms: number) => {
        const h = Math.floor(ms / 3600000);
        const m = Math.floor((ms % 3600000) / 60000);
        const s = Math.floor((ms % 60000) / 1000);
        const msPart = Math.floor((ms % 1000) / 10);
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${msPart.toString().padStart(2, '0')}`;
    };

    const update = () => {
        elapsedTime = Date.now() - startTime;
        timeEl.textContent = formatTime(elapsedTime);
    };

    startBtn.addEventListener('click', () => {
        startTime = Date.now() - elapsedTime;
        timerId = setInterval(update, 10);
        startBtn.disabled = true;
        lapBtn.disabled = false;
        stopBtn.disabled = false;
    });

    stopBtn.addEventListener('click', () => {
        clearInterval(timerId);
        startBtn.disabled = false;
        lapBtn.disabled = true;
        stopBtn.disabled = true;
    });

    resetBtn.addEventListener('click', () => {
        clearInterval(timerId);
        elapsedTime = 0;
        laps = [];
        timeEl.textContent = '00:00:00.00';
        lapsContainer.innerHTML = '';
        startBtn.disabled = false;
        lapBtn.disabled = true;
        stopBtn.disabled = true;
    });

    lapBtn.addEventListener('click', () => {
        laps.unshift(elapsedTime);
        const div = document.createElement('div');
        div.style.padding = 'var(--space-2) 0';
        div.style.borderBottom = '1px solid var(--color-border)';
        div.innerHTML = `<strong>Lap ${laps.length}:</strong> ${formatTime(elapsedTime)}`;
        lapsContainer.prepend(div);
    });
}
