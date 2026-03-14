export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="bsa-weight">Weight (kg)</label>
          <input type="number" id="bsa-weight" class="input-field" value="70">
        </div>
        <div class="input-group">
          <label for="bsa-height">Height (cm)</label>
          <input type="number" id="bsa-height" class="input-field" value="175">
        </div>
      </div>

      <div class="input-group" style="margin-top: var(--space-8);">
        <label>Body Surface Area (Du Bois Formula)</label>
        <div class="result-box" style="text-align: center; padding: var(--space-8); background: #f5f3ff;">
           <div id="bsa-result" style="font-size: 4rem; font-weight: 700; color: #7c3aed;">-- m²</div>
           <div style="margin-top: var(--space-2); font-weight: 600; color: #6d28d9;">Square Meters</div>
        </div>
        <div style="font-size: var(--fs-sm); opacity: 0.7; margin-top: var(--space-4); text-align: center;">
          BSA is used in clinical settings to calculate medication dosages and cardiac index.
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
