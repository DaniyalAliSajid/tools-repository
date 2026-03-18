export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Select Date Range</h4>
        <div class="input-group">
          <label for="dd-start">Starting Date</label>
          <input type="date" class="input-field" id="dd-start" style="padding: var(--space-3); font-size: 1rem;">
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="dd-end">Ending Date</label>
          <input type="date" class="input-field" id="dd-end" style="padding: var(--space-3); font-size: 1rem;">
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> You can use this to calculate exactly how much time is left until a deadline or how long it's been since an event.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Time Duration Analysis</h3>
      </div>
      <div class="result-box" id="dd-result" style="padding: var(--space-8); background: var(--color-surface-hover); min-height: 350px; display: flex; flex-direction: column; justify-content: center;">
         <div id="dd-main" style="font-size: 2.5rem; font-weight: 800; color: var(--color-primary); margin-bottom: var(--space-8); text-align: center; line-height: 1.1;">Select dates</div>
         
         <div class="stats-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
            <div class="stat-card" style="padding: var(--space-4); text-align: center;">
               <div class="stat-card__value" id="dd-total-days" style="font-size: 1.25rem; font-weight: 700; color: var(--color-text);">--</div>
               <div class="stat-card__label">Days</div>
            </div>
            <div class="stat-card" style="padding: var(--space-4); text-align: center;">
               <div class="stat-card__value" id="dd-total-weeks" style="font-size: 1.25rem; font-weight: 700; color: var(--color-text);">--</div>
               <div class="stat-card__label">Weeks</div>
            </div>
            <div class="stat-card" style="padding: var(--space-4); text-align: center;">
               <div class="stat-card__value" id="dd-total-months" style="font-size: 1.25rem; font-weight: 700; color: var(--color-text);">--</div>
               <div class="stat-card__label">Months</div>
            </div>
            <div class="stat-card" style="padding: var(--space-4); text-align: center;">
               <div class="stat-card__value" id="dd-total-yrs" style="font-size: 1.25rem; font-weight: 700; color: var(--color-text);">--</div>
               <div class="stat-card__label">Years</div>
            </div>
         </div>
      </div>
    </div>
  `;

    const startIn = document.getElementById('dd-start') as HTMLInputElement;
    const endIn = document.getElementById('dd-end') as HTMLInputElement;
    const mainRes = document.getElementById('dd-main')!;
    const daysRes = document.getElementById('dd-total-days')!;
    const weeksRes = document.getElementById('dd-total-weeks')!;
    const monthsRes = document.getElementById('dd-total-months')!;
    const yrsRes = document.getElementById('dd-total-yrs')!;

    // Default dates
    const today = new Date();
    const nextMonth = new Date();
    nextMonth.setMonth(today.getMonth() + 1);

    startIn.value = today.toISOString().split('T')[0];
    endIn.value = nextMonth.toISOString().split('T')[0];

    const calculate = () => {
        const d1 = new Date(startIn.value);
        const d2 = new Date(endIn.value);

        if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return;

        const diffTime = Math.abs(d2.getTime() - d1.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        // Breakdown
        let years = d2.getFullYear() - d1.getFullYear();
        let months = d2.getMonth() - d1.getMonth();
        let days = d2.getDate() - d1.getDate();

        if (days < 0) {
            months--;
            const lastDayOfMonth = new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
            days += lastDayOfMonth;
        }
        if (months < 0) {
            years--;
            months += 12;
        }

        mainRes.textContent = `${Math.abs(years)} yrs, ${Math.abs(months)} mos, ${Math.abs(days)} days`;
        daysRes.textContent = `${diffDays.toLocaleString()}`;
        weeksRes.textContent = `${(diffDays / 7).toFixed(1)}`;
        monthsRes.textContent = `${(diffDays / 30.44).toFixed(1)}`;
        yrsRes.textContent = `${(diffDays / 365.25).toFixed(1)}`;
    };

    [startIn, endIn].forEach(inp => inp.addEventListener('input', calculate));
    calculate();
}
