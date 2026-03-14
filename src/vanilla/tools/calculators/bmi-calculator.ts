export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="bmi-weight">Weight (kg)</label>
          <input type="number" class="input-field" id="bmi-weight" placeholder="e.g. 70" min="1" />
        </div>
        <div class="input-group">
          <label for="bmi-height">Height (cm)</label>
          <input type="number" class="input-field" id="bmi-height" placeholder="e.g. 175" min="1" />
        </div>
      </div>
      <button class="btn btn--primary btn--block" id="btn-calc">Calculate BMI</button>
      <div id="bmi-result" style="display:none">
        <div style="text-align:center;padding:var(--space-6);">
          <div style="font-size:var(--fs-4xl);font-weight:var(--fw-bold);color:var(--color-primary);" id="bmi-value">—</div>
          <div style="font-size:var(--fs-xl);font-weight:var(--fw-semibold);margin-top:var(--space-2);" id="bmi-category">—</div>
        </div>
        <div style="width:100%;height:12px;border-radius:var(--radius-full);background:linear-gradient(to right,#3b82f6,#22c55e,#f59e0b,#ef4444);position:relative;margin:var(--space-4) 0;">
          <div id="bmi-indicator" style="position:absolute;top:-4px;width:20px;height:20px;background:var(--color-text);border-radius:50%;border:3px solid var(--color-surface);box-shadow:var(--shadow-md);transition:left var(--transition-normal);"></div>
        </div>
        <div style="display:flex;justify-content:space-between;font-size:var(--fs-xs);color:var(--color-text-muted);">
          <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
        </div>
      </div>
    </div>
  `;

    document.getElementById('btn-calc')!.addEventListener('click', () => {
        const weight = parseFloat((document.getElementById('bmi-weight') as HTMLInputElement).value);
        const heightCm = parseFloat((document.getElementById('bmi-height') as HTMLInputElement).value);
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
        document.getElementById('bmi-value')!.textContent = bmi.toFixed(1);
        const catEl = document.getElementById('bmi-category')!;
        catEl.textContent = category;
        catEl.style.color = color;

        // Position indicator (BMI 15-40 range mapped to 0-100%)
        const pos = Math.min(100, Math.max(0, ((bmi - 15) / 25) * 100));
        document.getElementById('bmi-indicator')!.style.left = `calc(${pos}% - 10px)`;
    });
}
