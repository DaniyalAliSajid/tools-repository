export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Personal Profile</h4>
        <div class="input-group">
          <label>Biological Gender</label>
          <div class="toggle-group" id="bmr-gender">
            <button class="btn btn--sm active" data-gender="male">Male</button>
            <button class="btn btn--sm" data-gender="female">Female</button>
          </div>
        </div>

        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="bmr-weight">Weight (kg)</label>
            <input type="number" class="input-field" id="bmr-weight" placeholder="70" step="0.1" style="padding: var(--space-3);">
          </div>
          <div class="input-group">
            <label for="bmr-height">Height (cm)</label>
            <input type="number" class="input-field" id="bmr-height" placeholder="175" step="0.1" style="padding: var(--space-3);">
          </div>
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
            <label for="bmr-age">Age (Years)</label>
            <input type="number" class="input-field" id="bmr-age" placeholder="25" step="1" style="padding: var(--space-3);">
        </div>

        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="bmr-activity">Lifestyle Activity Level</label>
          <select class="input-field" id="bmr-activity" style="padding: var(--space-3);">
            <option value="1.2">Sedentary (No exercise)</option>
            <option value="1.375">Light (1-3 days/week)</option>
            <option value="1.55">Moderate (3-5 days/week)</option>
            <option value="1.725">Very Active (6-7 days/week)</option>
            <option value="1.9">Extra Active (Physical job)</option>
          </select>
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Information:</strong> BMR represents the calories burned at rest. TDEE is your total maintenance calories including activity.
        </p>
      </div>
    </div>

    <div class="tool-layout__output">
      <h3 style="margin-bottom: var(--space-4); font-size: var(--fs-base);">Caloric Analysis</h3>
      <div class="stats-row" id="bmr-stats">
        <div class="stat-card">
          <div class="stat-card__value" id="bmr-result">0</div>
          <div class="stat-card__label">BMR (Basal Rate)</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="bmr-tdee">0</div>
          <div class="stat-card__label">Maintenance (TDEE)</div>
        </div>
      </div>
      <div style="margin-top: var(--space-6); padding: var(--space-5); background: var(--color-surface); border-radius: var(--radius-2xl); border: 1px solid var(--color-border);">
        <h4 style="font-size: var(--fs-sm); margin-bottom: var(--space-3); color: var(--color-text);">Daily Goal Estimates</h4>
        <div style="display: flex; justify-content: space-between; font-size: var(--fs-sm); margin-bottom: var(--space-2);">
          <span>Weight Loss (-0.5kg/week)</span>
          <strong id="bmr-loss" style="color: var(--color-primary);">0</strong>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: var(--fs-sm);">
          <span>Weight Gain (+0.5kg/week)</span>
          <strong id="bmr-gain" style="color: #10b981;">0</strong>
        </div>
      </div>
    </div>
  `;

    const weightInput = document.getElementById('bmr-weight') as HTMLInputElement;
    const heightInput = document.getElementById('bmr-height') as HTMLInputElement;
    const ageInput = document.getElementById('bmr-age') as HTMLInputElement;
    const activitySelect = document.getElementById('bmr-activity') as HTMLSelectElement;
    const genderBtns = container.querySelectorAll('#bmr-gender button');

    const bmrVal = document.getElementById('bmr-result')!;
    const tdeeVal = document.getElementById('bmr-tdee')!;

    let gender = 'male';

    const update = () => {
        const W = parseFloat(weightInput.value) || 0;
        const H = parseFloat(heightInput.value) || 0;
        const A = parseFloat(ageInput.value) || 0;
        const activity = parseFloat(activitySelect.value);

        if (W === 0 || H === 0 || A === 0) return;

        // Mifflin-St Jeor Equation
        let bmr = (10 * W) + (6.25 * H) - (5 * A);
        if (gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }

        const tdee = bmr * activity;

        bmrVal.textContent = Math.round(bmr).toLocaleString();
        tdeeVal.textContent = Math.round(tdee).toLocaleString();
        document.getElementById('bmr-loss')!.textContent = Math.round(tdee - 500).toLocaleString() + ' cal';
        document.getElementById('bmr-gain')!.textContent = Math.round(tdee + 500).toLocaleString() + ' cal';
    };

    [weightInput, heightInput, ageInput, activitySelect].forEach(inp => inp.addEventListener('input', update));

    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gender = (btn as HTMLElement).dataset.gender!;
            update();
        });
    });
}
