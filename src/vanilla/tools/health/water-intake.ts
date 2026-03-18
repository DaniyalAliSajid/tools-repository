export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Hydration Factors</h4>
        
        <div class="input-group" style="margin-bottom: var(--space-4);">
          <label>Biological Gender</label>
          <div class="toggle-group" id="wi-gender">
            <button class="btn btn--sm active" data-gender="male">Male</button>
            <button class="btn btn--sm" data-gender="female">Female</button>
          </div>
        </div>

        <div class="input-group">
          <label for="wi-weight">Body Weight (kg)</label>
          <input type="number" id="wi-weight" class="input-field" value="70" style="padding: var(--space-3); font-weight: 700;">
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="wi-activity">Exercise Intensity (min/day)</label>
          <input type="number" id="wi-activity" class="input-field" value="30" style="padding: var(--space-3);">
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Hydration Tip:</strong> Don't wait until you're thirsty to drink water. Thirst is often a sign that you're already dehydrated.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Daily Intake Goal</h3>
      </div>
      
      <div class="stat-card" style="margin-bottom: var(--space-6); background: var(--color-primary-light); border-color: rgba(37, 99, 235, 0.2); text-align: center; padding: var(--space-10);">
        <div class="stat-card__label" style="color: var(--color-primary);">Target Volume</div>
        <div class="stat-card__value" id="wi-liters" style="font-size: 5rem; color: var(--color-primary); line-height: 1;">--</div>
      </div>

      <div class="p-card" style="background: var(--color-surface-hover);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="font-size: var(--fs-sm); font-weight: 600; color: var(--color-text-secondary);">Household Measurement</div>
              <div id="wi-cups" style="font-weight: 700; font-size: var(--fs-lg);">--</div>
          </div>
      </div>
    </div>
  `;

    const weightIn = document.getElementById('wi-weight') as HTMLInputElement;
    const activityIn = document.getElementById('wi-activity') as HTMLInputElement;
    const genderBtns = container.querySelectorAll('#wi-gender button');
    const litersEl = document.getElementById('wi-liters')!;
    const cupsEl = document.getElementById('wi-cups')!;

    let gender = 'male';

    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gender = (btn as HTMLElement).dataset.gender!;
            calculate();
        });
    });

    const calculate = () => {
        const weight = parseFloat(weightIn.value) || 0;
        const activity = parseFloat(activityIn.value) || 0;

        // Gender-adjusted formula: Male ~0.035, Female ~0.031
        const multiplier = gender === 'male' ? 0.035 : 0.031;
        const totalLiters = (weight * multiplier) + (activity / 30 * 0.35);
        const totalCups = totalLiters / 0.25;

        litersEl.textContent = `${totalLiters.toFixed(2)} Liters`;
        cupsEl.textContent = `About ${Math.round(totalCups)} Cups (250ml each)`;
    };

    [weightIn, activityIn].forEach(inp => inp.addEventListener('input', calculate));
    calculate();
}
