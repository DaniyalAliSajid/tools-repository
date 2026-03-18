export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Measurements</h4>
        <div class="input-group" style="margin-bottom: var(--space-4);">
          <label>Biological Gender</label>
          <div class="toggle-group" id="bf-gender">
            <button class="btn btn--sm active" data-gender="male">Male</button>
            <button class="btn btn--sm" data-gender="female">Female</button>
          </div>
        </div>
        <div class="tool-grid-2">
          <div class="input-group">
            <label for="bf-height">Height (cm)</label>
            <input type="number" id="bf-height" class="input-field" value="175" style="padding: var(--space-3);">
          </div>
          <div class="input-group">
            <label for="bf-neck">Neck (cm)</label>
            <input type="number" id="bf-neck" class="input-field" value="40" style="padding: var(--space-3);">
          </div>
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="bf-waist">Waist (cm)</label>
            <input type="number" id="bf-waist" class="input-field" value="90" style="padding: var(--space-3);">
          </div>
          <div id="bf-hip-group" class="input-group" style="display: none;">
            <label for="bf-hip">Hip (cm)</label>
            <input type="number" id="bf-hip" class="input-field" value="100" style="padding: var(--space-3);">
          </div>
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Navy Method:</strong> This estimation uses the U.S. Navy circumference method. For most accurate results, measure at the widest part.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Body Composition</h3>
      </div>
      
      <div class="stat-card" style="margin-bottom: var(--space-6); background: var(--color-primary-light); border-color: rgba(37, 99, 235, 0.2); text-align: center; padding: var(--space-8);">
        <div class="stat-card__label" style="color: var(--color-primary);">Estimated Body Fat</div>
        <div class="stat-card__value" id="bf-result" style="font-size: 4rem; color: var(--color-primary);">--%</div>
      </div>

      <div class="p-card" style="background: var(--color-surface-hover);">
          <div style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; margin-bottom: var(--space-2);">CATEGORY</div>
          <div id="bf-category" style="font-size: var(--fs-xl); font-weight: 700; color: var(--color-text);">--</div>
      </div>

      <div style="margin-top: var(--space-6); display: flex; flex-direction: column; gap: var(--space-2);">
          <div style="height: 8px; width: 100%; display: flex; border-radius: 4px; overflow: hidden;">
              <div style="flex: 1; background: #3b82f6;" title="Essential Fat"></div>
              <div style="flex: 1; background: #10b981;" title="Athlete"></div>
              <div style="flex: 1; background: #84cc16;" title="Fitness"></div>
              <div style="flex: 1; background: #f59e0b;" title="Average"></div>
              <div style="flex: 1; background: #ef4444;" title="Obese"></div>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: 10px; color: var(--color-text-muted); text-transform: uppercase; font-weight: 600;">
              <span>Lean</span>
              <span>Average</span>
              <span>High Fat</span>
          </div>
      </div>
    </div>
  `;

    const genderBtns = container.querySelectorAll('#bf-gender button');
    const heightIn = document.getElementById('bf-height') as HTMLInputElement;
    const neckIn = document.getElementById('bf-neck') as HTMLInputElement;
    const waistIn = document.getElementById('bf-waist') as HTMLInputElement;
    const hipIn = document.getElementById('bf-hip') as HTMLInputElement;
    const hipGroup = document.getElementById('bf-hip-group')!;
    const resultEl = document.getElementById('bf-result')!;
    const catEl = document.getElementById('bf-category')!;

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
        const height = parseFloat(heightIn.value) || 0;
        const neck = parseFloat(neckIn.value) || 0;
        const waist = parseFloat(waistIn.value) || 0;
        const hip = parseFloat(hipIn.value) || 0;

        hipGroup.style.display = gender === 'female' ? 'block' : 'none';

        if (height <= 0 || neck <= 0 || waist <= 0) return;

        let bodyFat = 0;
        if (gender === 'male') {
            bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
            bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        }

        resultEl.textContent = `${Math.max(0, bodyFat).toFixed(1)}%`;

        if (gender === 'male') {
            if (bodyFat < 6) catEl.textContent = 'Essential Fat';
            else if (bodyFat < 14) catEl.textContent = 'Athletes';
            else if (bodyFat < 18) catEl.textContent = 'Fitness';
            else if (bodyFat < 25) catEl.textContent = 'Average';
            else catEl.textContent = 'Obese';
        } else {
            if (bodyFat < 14) catEl.textContent = 'Essential Fat';
            else if (bodyFat < 21) catEl.textContent = 'Athletes';
            else if (bodyFat < 25) catEl.textContent = 'Fitness';
            else if (bodyFat < 32) catEl.textContent = 'Average';
            else catEl.textContent = 'Obese';
        }
    };

    [heightIn, neckIn, waistIn, hipIn].forEach(inp => inp.addEventListener('input', calculate));
    calculate();
}
