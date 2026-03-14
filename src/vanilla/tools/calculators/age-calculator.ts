export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="ac-dob">Date of Birth</label>
          <input type="date" class="input-field" id="ac-dob" />
        </div>
        <div class="input-group">
          <label for="ac-today">As of Date</label>
          <input type="date" class="input-field" id="ac-today" />
        </div>
      </div>
      <button class="btn btn--primary btn--block" id="btn-calc">Calculate Age</button>
      <div class="stats-row" id="ac-results" style="display:none">
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
      <div class="stats-row" id="ac-extra" style="display:none">
        <div class="stat-card">
          <div class="stat-card__value" id="ac-total-months">—</div>
          <div class="stat-card__label">Total Months</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="ac-total-weeks">—</div>
          <div class="stat-card__label">Total Weeks</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="ac-total-days">—</div>
          <div class="stat-card__label">Total Days</div>
        </div>
      </div>
      <div id="ac-birthday" style="display:none;text-align:center;padding:var(--space-4);border-radius:var(--radius-lg);background:var(--color-cat-calc-bg);font-size:var(--fs-lg);font-weight:var(--fw-semibold);color:var(--color-cat-calc);"></div>
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
