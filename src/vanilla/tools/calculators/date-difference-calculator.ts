export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="dd-start">Start Date</label>
          <input type="date" class="input-field" id="dd-start">
        </div>
        <div class="input-group">
          <label for="dd-end">End Date</label>
          <input type="date" class="input-field" id="dd-end">
        </div>
      </div>

      <div class="input-group">
        <label>Time Difference</label>
        <div class="result-box" id="dd-result" style="background: white; padding: var(--space-6);">
           <div id="dd-main" style="font-size: var(--fs-xl); font-weight: 700; color: var(--color-primary); margin-bottom: var(--space-4);">Select dates</div>
           <div class="tool-grid-2" style="font-size: var(--fs-sm); opacity: 0.8;">
              <div id="dd-total-days">Total Days: --</div>
              <div id="dd-total-weeks">Total Weeks: --</div>
              <div id="dd-total-months">Total Months: --</div>
              <div id="dd-total-yrs">Total Years: --</div>
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

        mainRes.textContent = `${Math.abs(years)} years, ${Math.abs(months)} months, ${Math.abs(days)} days`;
        daysRes.textContent = `Total Days: ${diffDays.toLocaleString()}`;
        weeksRes.textContent = `Total Weeks: ${(diffDays / 7).toFixed(1)}`;
        monthsRes.textContent = `Total Months: ${(diffDays / 30.44).toFixed(1)}`;
        yrsRes.textContent = `Total Years: ${(diffDays / 365.25).toFixed(1)}`;
    };

    [startIn, endIn].forEach(inp => inp.addEventListener('input', calculate));
    calculate();
}
