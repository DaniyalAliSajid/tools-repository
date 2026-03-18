export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Personal Dates</h4>
        <div class="input-group">
          <label for="ac-dob">Date of Birth</label>
          <input type="date" class="input-field" id="ac-dob" style="padding: var(--space-3); font-weight: 600;" />
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="ac-today">Calculate Age As Of</label>
          <input type="date" class="input-field" id="ac-today" style="padding: var(--space-3);" />
        </div>
        <button class="btn btn--primary btn--block btn--lg" id="btn-calc" style="margin-top: var(--space-6); padding: var(--space-4);">✨ Calculate Precise Age</button>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> Set the "As Of" date to a future milestone to see how old you'll be on that day.
        </p>
      </div>
    </div>

    <div class="tool-layout__output">
      <h3 style="margin-bottom: var(--space-4); font-size: var(--fs-base);">Calculated Age</h3>
      <div class="stats-row" id="ac-results" style="display:none; margin-bottom: var(--space-6);">
        <div class="stat-card">
          <div class="stat-card__value" id="ac-years">—</div>
          <div class="stat-card__label">Years</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="ac-months">—</div>
          <div class="stat-card__label">Months</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="ac-days">—</div>
          <div class="stat-card__label">Days</div>
        </div>
      </div>
      <div id="ac-extra" style="display:none; flex-direction: column; gap: var(--space-2);">
          <div style="display: flex; justify-content: space-between; padding: var(--space-3); border-bottom: 1px solid var(--color-border);">
            <span style="color: var(--color-text-secondary);">Total Months</span>
            <span id="ac-total-months" style="font-weight: var(--fw-bold);">—</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: var(--space-3); border-bottom: 1px solid var(--color-border);">
            <span style="color: var(--color-text-secondary);">Total Weeks</span>
            <span id="ac-total-weeks" style="font-weight: var(--fw-bold);">—</span>
          </div>
          <div style="display: flex; justify-content: space-between; padding: var(--space-3);">
            <span style="color: var(--color-text-secondary);">Total Days</span>
            <span id="ac-total-days" style="font-weight: var(--fw-bold);">—</span>
          </div>
      </div>
      <div id="ac-birthday" style="display:none;text-align:center;padding:var(--space-4);border-radius:var(--radius-lg);background:var(--color-primary-light);font-size:var(--fs-lg);font-weight:var(--fw-semibold);color:var(--color-primary);margin-top:var(--space-4);"></div>
    </div>
  `;

    // Set default date to today
    (document.getElementById('ac-today') as HTMLInputElement).value = new Date().toISOString().split('T')[0];

    document.getElementById('btn-calc')!.addEventListener('click', () => {
        const dob = new Date((document.getElementById('ac-dob') as HTMLInputElement).value);
        const today = new Date((document.getElementById('ac-today') as HTMLInputElement).value);

        if (isNaN(dob.getTime()) || isNaN(today.getTime())) return;
        if (dob > today) return;

        let years = today.getFullYear() - dob.getFullYear();
        let months = today.getMonth() - dob.getMonth();
        let days = today.getDate() - dob.getDate();

        if (days < 0) {
            months--;
            const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
            days += prevMonth.getDate();
        }
        if (months < 0) { years--; months += 12; }

        const totalDays = Math.floor((today.getTime() - dob.getTime()) / (1000 * 60 * 60 * 24));
        const totalWeeks = Math.floor(totalDays / 7);
        const totalMonths = years * 12 + months;

        document.getElementById('ac-results')!.style.display = 'flex';
        document.getElementById('ac-extra')!.style.display = 'flex';
        document.getElementById('ac-years')!.textContent = String(years);
        document.getElementById('ac-months')!.textContent = String(months);
        document.getElementById('ac-days')!.textContent = String(days);
        document.getElementById('ac-total-months')!.textContent = String(totalMonths);
        document.getElementById('ac-total-weeks')!.textContent = totalWeeks.toLocaleString();
        document.getElementById('ac-total-days')!.textContent = totalDays.toLocaleString();

        // Birthday check
        const bdEl = document.getElementById('ac-birthday')!;
        if (today.getMonth() === dob.getMonth() && today.getDate() === dob.getDate()) {
            bdEl.style.display = 'block';
            bdEl.textContent = '🎉 Happy Birthday! 🎂';
        } else {
            bdEl.style.display = 'none';
        }
    });
}
