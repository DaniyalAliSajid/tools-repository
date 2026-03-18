export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Timeline Period</h4>
        <div class="input-group">
          <label for="td-start">Start Date & Time</label>
          <input type="datetime-local" class="input-field" id="td-start" style="padding: var(--space-3);" />
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="td-end">End Date & Time</label>
          <input type="datetime-local" class="input-field" id="td-end" style="padding: var(--space-3);" />
        </div>
        <button class="btn btn--primary btn--block btn--lg" id="btn-calc" style="margin-top: var(--space-6); padding: var(--space-4);">✨ Calculate Duration</button>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> This tool calculates the absolute absolute difference between two points in time across all units.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Time Breakdown</h3>
      </div>
      <div id="td-results" style="display:none">
        <div class="stats-row" style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4); margin-bottom: var(--space-6);">
          <div class="stat-card">
            <div class="stat-card__label">Years</div>
            <div class="stat-card__value" id="td-years" style="font-size: var(--fs-2xl); color: var(--color-primary);">0</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__label">Months</div>
            <div class="stat-card__value" id="td-months" style="font-size: var(--fs-2xl);">0</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__label">Days</div>
            <div class="stat-card__value" id="td-days" style="font-size: var(--fs-2xl);">0</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__label">Hours</div>
            <div class="stat-card__value" id="td-hours" style="font-size: var(--fs-2xl);">0</div>
          </div>
        </div>
        
        <div style="padding: var(--space-6); background: var(--color-surface-hover); border-radius: var(--radius-2xl);">
          <h4 style="font-size: var(--fs-xs); text-transform: uppercase; color: var(--color-text-muted); margin-bottom: var(--space-4);">Absolute Totals</h4>
          <div style="display: flex; flex-direction: column; gap: var(--space-3);">
            <div style="display: flex; justify-content: space-between; font-size: var(--fs-sm);">
                <span>Total Hours</span>
                <span id="td-total-hours" style="font-weight: 700;">0</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: var(--fs-sm);">
                <span>Total Minutes</span>
                <span id="td-total-minutes" style="font-weight: 700;">0</span>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: var(--fs-sm);">
                <span>Total Seconds</span>
                <span id="td-total-seconds" style="font-weight: 700;">0</span>
            </div>
          </div>
        </div>
      </div>
      <div id="td-placeholder" style="text-align: center; padding: var(--space-12); color: var(--color-text-muted);">
        Select start and end dates to compute the time difference.
      </div>
    </div>
  `;

    // Set defaults
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 9, 0);
    (document.getElementById('td-start') as HTMLInputElement).value = toLocalDatetime(startOfDay);
    (document.getElementById('td-end') as HTMLInputElement).value = toLocalDatetime(now);

    document.getElementById('btn-calc')!.addEventListener('click', () => {
        const start = new Date((document.getElementById('td-start') as HTMLInputElement).value);
        const end = new Date((document.getElementById('td-end') as HTMLInputElement).value);
        if (isNaN(start.getTime()) || isNaN(end.getTime())) return;

        const diffMs = Math.abs(end.getTime() - start.getTime());
        const totalSeconds = Math.floor(diffMs / 1000);
        const totalMinutes = Math.floor(totalSeconds / 60);
        const totalHours = Math.floor(totalMinutes / 60);
        const totalDays = Math.floor(totalHours / 24);

        const years = Math.floor(totalDays / 365);
        const months = Math.floor((totalDays % 365) / 30);
        const days = (totalDays % 365) % 30;
        const hours = totalHours % 24;
        const minutes = totalMinutes % 60;

        document.getElementById('td-results')!.style.display = 'block';
        if (document.getElementById('td-placeholder')) document.getElementById('td-placeholder')!.style.display = 'none';
        document.getElementById('td-years')!.textContent = String(years);
        document.getElementById('td-months')!.textContent = String(months);
        document.getElementById('td-days')!.textContent = String(days);
        document.getElementById('td-hours')!.textContent = String(hours);
        document.getElementById('td-total-hours')!.textContent = totalHours.toLocaleString();
        document.getElementById('td-total-minutes')!.textContent = totalMinutes.toLocaleString();
        document.getElementById('td-total-seconds')!.textContent = totalSeconds.toLocaleString();
    });
}

function toLocalDatetime(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
