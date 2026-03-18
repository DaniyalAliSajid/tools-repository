export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Personal Profile</h4>
        
        <div class="input-group" style="margin-bottom: var(--space-4);">
          <label>Biological Gender</label>
          <div class="toggle-group" id="bmi-gender">
            <button class="btn btn--sm active" data-gender="male">Male</button>
            <button class="btn btn--sm" data-gender="female">Female</button>
          </div>
        </div>

        <div class="tool-grid-2">
          <div class="input-group">
            <label for="bmi-weight">Weight (kg)</label>
            <input type="number" class="input-field" id="bmi-weight" placeholder="70" step="0.1" style="padding: var(--space-3);" />
          </div>
          <div class="input-group">
            <label for="bmi-height">Height (cm)</label>
            <input type="number" class="input-field" id="bmi-height" placeholder="175" step="0.1" style="padding: var(--space-3);" />
          </div>
        </div>

        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="bmi-age">Age (Years)</label>
          <input type="number" class="input-field" id="bmi-age" placeholder="25" step="1" style="padding: var(--space-3);" />
        </div>

        <button class="btn btn--primary btn--block btn--lg" id="btn-calc" style="margin-top: var(--space-6); padding: var(--space-4);">✨ Compute BMI</button>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Information:</strong> Body Mass Index (BMI) is a standardized measure of body fat based on height, weight, gender, and age profiles.
        </p>
      </div>
    </div>
    <div class="tool-layout__output">
      <h3 style="margin-bottom: var(--space-4); font-size: var(--fs-base);">BMI Analysis</h3>
      <div id="bmi-result" style="display:none">
        <div class="stat-card" style="margin-bottom: var(--space-6);">
          <div class="stat-card__value" id="bmi-value" style="font-size: 4rem;">—</div>
          <div class="stat-card__label" id="bmi-category" style="font-size: var(--fs-lg); transform: none;">—</div>
        </div>
        <div style="width:100%;height:14px;border-radius:var(--radius-full);background:linear-gradient(to right,#3b82f6,#22c55e,#f59e0b,#ef4444);position:relative;margin:var(--space-8) 0;">
          <div id="bmi-indicator" style="position:absolute;top:-6px;width:26px;height:26px;background:white;border-radius:50%;border:4px solid var(--color-primary);box-shadow:var(--shadow-lg);transition:left var(--transition-normal);"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:var(--fs-xs);color:var(--color-text-muted);font-weight: var(--fw-bold);">
          <span>UNDERWEIGHT</span><span>NORMAL</span><span>OVERWEIGHT</span><span>OBESE</span>
        </div>
      </div>
      <div id="bmi-placeholder" style="text-align: center; padding: var(--space-12); color: var(--color-text-muted);">
        Enter your weight and height to see the results.
      </div>
    </div>
  `;

    const genderBtns = container.querySelectorAll('#bmi-gender button');
    let gender = 'male';

    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gender = (btn as HTMLElement).dataset.gender!;
        });
    });

    document.getElementById('btn-calc')!.addEventListener('click', () => {
        const weight = parseFloat((document.getElementById('bmi-weight') as HTMLInputElement).value);
        const heightCm = parseFloat((document.getElementById('bmi-height') as HTMLInputElement).value);
        const age = parseFloat((document.getElementById('bmi-age') as HTMLInputElement).value);
        
        if (isNaN(weight) || isNaN(heightCm) || weight <= 0 || heightCm <= 0) return;

        const heightM = heightCm / 100;
        const bmi = weight / (heightM * heightM);

        let category = '';
        let color = '';
        if (bmi < 18.5) { category = '🔵 Underweight'; color = '#3b82f6'; }
        else if (bmi < 25) { category = '🟢 Normal Weight'; color = '#22c55e'; }
        else if (bmi < 30) { category = '🟡 Overweight'; color = '#f59e0b'; }
        else { category = '🔴 Obese'; color = '#ef4444'; }

        document.getElementById('bmi-result')!.style.display = 'block';
        document.getElementById('bmi-placeholder')!.style.display = 'none';
        document.getElementById('bmi-value')!.textContent = bmi.toFixed(1);
        const catEl = document.getElementById('bmi-category')!;
        catEl.textContent = category;
        catEl.style.color = color;

        // Position indicator (BMI 15-40 range mapped to 0-100%)
        const pos = Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100));
        document.getElementById('bmi-indicator')!.style.left = `calc(${pos}% - 10px)`;
    });
}
