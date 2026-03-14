export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="wi-weight">Weight (kg)</label>
          <input type="number" id="wi-weight" class="input-field" value="70">
        </div>
        <div class="input-group">
          <label for="wi-activity">Daily Activity (minutes)</label>
          <input type="number" id="wi-activity" class="input-field" value="30">
        </div>
      </div>

      <div class="input-group" style="margin-top: var(--space-8);">
        <label>Daily Water Intake Goal</label>
        <div class="result-box" style="text-align: center; padding: var(--space-8); background: #eff6ff;">
           <div id="wi-liters" style="font-size: 4rem; font-weight: 700; color: #2563eb;">--</div>
           <div id="wi-cups" style="margin-top: var(--space-2); font-weight: 600; color: #1e40af;">--</div>
        </div>
        <div style="font-size: var(--fs-sm); opacity: 0.7; margin-top: var(--space-4); text-align: center;">
          Note: This is a general guideline. Needs vary by climate and health status.
        </div>
      </div>
    </div>
  `;

    const weightIn = document.getElementById('wi-weight') as HTMLInputElement;
    const activityIn = document.getElementById('wi-activity') as HTMLInputElement;
    const litersEl = document.getElementById('wi-liters')!;
    const cupsEl = document.getElementById('wi-cups')!;

    const calculate = () => {
        const weight = parseFloat(weightIn.value) || 0;
        const activity = parseFloat(activityIn.value) || 0;

        // Formula: (Weight in kg * 0.033) + (Activity in min / 30 * 0.35)
        const base = weight * 0.033;
        const extra = (activity / 30) * 0.35;
        const totalLiters = base + extra;
        const totalCups = totalLiters / 0.25;

        litersEl.textContent = `${totalLiters.toFixed(2)} Liters`;
        cupsEl.textContent = `About ${Math.round(totalCups)} Cups (250ml each)`;
    };

    [weightIn, activityIn].forEach(inp => inp.addEventListener('input', calculate));
    calculate();
}
