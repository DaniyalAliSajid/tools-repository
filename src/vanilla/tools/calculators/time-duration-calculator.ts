export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="td-start">Start Date & Time</label>
          <input type="datetime-local" class="input-field" id="td-start" />
        </div>
        <div class="input-group">
          <label for="td-end">End Date & Time</label>
          <input type="datetime-local" class="input-field" id="td-end" />
        </div>
      </div>
      <button class="btn btn--primary btn--block" id="btn-calc">Calculate Duration</button>
      <div id="td-results" style="display:none">
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-card__value" id="td-years">0</div>
            <div class="stat-card__label">Years</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__value" id="td-months">0</div>
            <div class="stat-card__label">Months</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__value" id="td-days">0</div>
            <div class="stat-card__label">Days</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__value" id="td-hours">0</div>
            <div class="stat-card__label">Hours</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__value" id="td-minutes">0</div>
            <div class="stat-card__label">Minutes</div>
          </div>
        </div>
        <hr style="border:none;border-top:1px solid var(--color-border);margin:var(--space-4) 0"/>
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-card__value" id="td-total-hours">0</div>
            <div class="stat-card__label">Total Hours</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__value" id="td-total-minutes">0</div>
            <div class="stat-card__label">Total Minutes</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__value" id="td-total-seconds">0</div>
            <div class="stat-card__label">Total Seconds</div>
          </div>
        </div>
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
        document.getElementById('td-years')!.textContent = String(years);
        document.getElementById('td-months')!.textContent = String(months);
        document.getElementById('td-days')!.textContent = String(days);
        document.getElementById('td-hours')!.textContent = String(hours);
        document.getElementById('td-minutes')!.textContent = String(minutes);
        document.getElementById('td-total-hours')!.textContent = totalHours.toLocaleString();
        document.getElementById('td-total-minutes')!.textContent = totalMinutes.toLocaleString();
        document.getElementById('td-total-seconds')!.textContent = totalSeconds.toLocaleString();
    });
}

function toLocalDatetime(date: Date): string {
    const pad = (n: number) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}
