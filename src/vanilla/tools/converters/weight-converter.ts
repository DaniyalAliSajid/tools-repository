const UNITS: { [key: string]: number } = {
    'mg': 0.001,
    'g': 1,
    'kg': 1000,
    'oz': 28.3495,
    'lb': 453.592,
    'st': 6350.29,
    'ton': 907185
};

const UNIT_NAMES: { [key: string]: string } = {
    'mg': 'Milligrams (mg)',
    'g': 'Grams (g)',
    'kg': 'Kilograms (kg)',
    'oz': 'Ounces (oz)',
    'lb': 'Pounds (lb)',
    'st': 'Stone (st)',
    'ton': 'US Ton'
};

export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="weight-value">From</label>
          <input type="number" class="input-field" id="weight-value" placeholder="1">
          <select class="input-field" id="weight-from">
            ${Object.entries(UNIT_NAMES).map(([id, name]) => `<option value="${id}" ${id === 'kg' ? 'selected' : ''}>${name}</option>`).join('')}
          </select>
        </div>
        <div class="input-group">
          <label>To</label>
          <div class="result-box" id="weight-result" style="display: flex; align-items: center; justify-content: center; font-size: var(--fs-xl); font-weight: bold;">0</div>
          <select class="input-field" id="weight-to">
             ${Object.entries(UNIT_NAMES).map(([id, name]) => `<option value="${id}" ${id === 'lb' ? 'selected' : ''}>${name}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>
  `;

    const valInput = document.getElementById('weight-value') as HTMLInputElement;
    const fromSelect = document.getElementById('weight-from') as HTMLSelectElement;
    const toSelect = document.getElementById('weight-to') as HTMLSelectElement;
    const resultDiv = document.getElementById('weight-result') as HTMLDivElement;

    const update = () => {
        const val = parseFloat(valInput.value) || 0;
        const from = fromSelect.value;
        const to = toSelect.value;

        // Convert to base (grams) then to target unit
        const baseVal = val * UNITS[from];
        const targetVal = baseVal / UNITS[to];

        resultDiv.textContent = targetVal.toLocaleString(undefined, { maximumFractionDigits: 6 });
    };

    [valInput, fromSelect, toSelect].forEach(inp => inp.addEventListener('input', update));
    update();
}
