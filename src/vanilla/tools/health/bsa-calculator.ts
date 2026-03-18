export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Patient Metrics</h4>
        <div class="input-group">
          <label for="bsa-weight">Weight (kg)</label>
          <input type="number" id="bsa-weight" class="input-field" value="70" style="padding: var(--space-3); font-weight: 700;">
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="bsa-height">Height (cm)</label>
          <input type="number" id="bsa-height" class="input-field" value="175" style="padding: var(--space-3); font-weight: 700;">
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Clinical Note:</strong> Body Surface Area is a more accurate indicator of metabolic mass than body weight because it is less affected by abnormal adipose tissue.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Calculated Surface Area</h3>
      </div>
      
      <div class="stat-card" style="margin-bottom: var(--space-6); background: var(--color-primary-light); border-color: rgba(37, 99, 235, 0.2); text-align: center; padding: var(--space-10);">
        <div class="stat-card__label" style="color: var(--color-primary);">Result (Du Bois Formula)</div>
        <div class="stat-card__value" id="bsa-result" style="font-size: 5rem; color: var(--color-primary); line-height: 1;">-- m²</div>
      </div>

      <div class="p-card" style="background: var(--color-surface-hover);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
              <div style="width: 12px; height: 12px; background: #8b5cf6; border-radius: 2px;"></div>
              <div style="font-size: var(--fs-sm); font-weight: 600; color: var(--color-text-secondary);">Metric: Square Meters</div>
          </div>
      </div>
    </div>
  `;

    const weightIn = document.getElementById('bsa-weight') as HTMLInputElement;
    const heightIn = document.getElementById('bsa-height') as HTMLInputElement;
    const resultEl = document.getElementById('bsa-result')!;

    const calculate = () => {
        const weight = parseFloat(weightIn.value) || 0;
        const height = parseFloat(heightIn.value) || 0;

        if (weight <= 0 || height <= 0) return;

        // Du Bois Formula: 0.007184 * W^0.425 * H^0.725
        const bsa = 0.007184 * Math.pow(weight, 0.425) * Math.pow(height, 0.725);
        resultEl.textContent = `${bsa.toFixed(2)} m²`;
    };

    [weightIn, heightIn].forEach(inp => inp.addEventListener('input', calculate));
    calculate();
}
