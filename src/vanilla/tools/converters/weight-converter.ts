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
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Mass determination</h4>
        <div class="input-group">
          <label for="weight-value">Source Weight</label>
          <div style="display: flex; gap: var(--space-2);">
            <input type="number" class="input-field" id="weight-value" placeholder="1" style="flex: 2; padding: var(--space-3);">
            <select class="input-field" id="weight-from" style="flex: 1; padding: var(--space-3);">
              ${Object.entries(UNIT_NAMES).map(([id, name]) => `<option value="${id}" ${id === 'kg' ? 'selected' : ''}>${id}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="weight-to">Target Unit</label>
          <select class="input-field" id="weight-to" style="padding: var(--space-3);">
             ${Object.entries(UNIT_NAMES).map(([id, name]) => `<option value="${id}" ${id === 'lb' ? 'selected' : ''}>${name}</option>`).join('')}
          </select>
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> Convert between grams, pounds, ounces, and even tons with precision.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Conversion result</h3>
      </div>
      <div class="result-box" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; background: var(--color-surface-hover);">
        <div id="weight-result" style="font-size: 4rem; font-weight: 800; color: var(--color-primary); letter-spacing: -0.02em;">0</div>
        <div id="weight-result-unit" style="font-size: var(--fs-lg); color: var(--color-text-muted); margin-top: var(--space-2); font-weight: 600;">Pounds</div>
      </div>
      <p style="text-align: center; color: var(--color-text-muted); font-size: var(--fs-xs); margin-top: var(--space-4);">Calculated instantly as you type</p>
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
        document.getElementById('weight-result-unit')!.textContent = UNIT_NAMES[to].split(' (')[0];
    };

    [valInput, fromSelect, toSelect].forEach(inp => inp.addEventListener('input', update));
    update();
}
