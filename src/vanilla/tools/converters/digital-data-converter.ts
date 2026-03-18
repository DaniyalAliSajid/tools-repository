const UNITS: { [key: string]: number } = {
    'b': 1,
    'B': 8,
    'KB': 8 * 1024,
    'MB': 8 * 1024 * 1024,
    'GB': 8 * 1024 * 1024 * 1024,
    'TB': 8 * 1024 * 1024 * 1024 * 1024,
    'PB': 8 * Math.pow(1024, 5)
};

const UNIT_NAMES: { [key: string]: string } = {
    'b': 'Bits (b)',
    'B': 'Bytes (B)',
    'KB': 'Kilobytes (KB)',
    'MB': 'Megabytes (MB)',
    'GB': 'Gigabytes (GB)',
    'TB': 'Terabytes (TB)',
    'PB': 'Petabytes (PB)'
};

export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Input Data</h4>
        <div class="input-group">
          <label for="data-value">Value to Convert</label>
          <div style="display: flex; gap: var(--space-2);">
            <input type="number" class="input-field" id="data-value" placeholder="1024" style="flex: 2; padding: var(--space-3);">
            <select class="input-field" id="data-from" style="flex: 1; padding: var(--space-3);">
              ${Object.entries(UNIT_NAMES).map(([id, name]) => `<option value="${id}" ${id === 'MB' ? 'selected' : ''}>${id}</option>`).join('')}
            </select>
          </div>
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="data-to">Target Unit</label>
          <select class="input-field" id="data-to" style="padding: var(--space-3);">
             ${Object.entries(UNIT_NAMES).map(([id, name]) => `<option value="${id}" ${id === 'GB' ? 'selected' : ''}>${name}</option>`).join('')}
          </select>
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Conversion Logic:</strong> Uses binary prefix (1 KB = 1024 Bytes) for calculations.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Conversion Result</h3>
      </div>
      <div class="result-box" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; background: var(--color-surface-hover);">
        <div id="data-result" style="font-size: 4rem; font-weight: 800; color: var(--color-primary); letter-spacing: -0.02em;">0</div>
        <div id="data-result-unit" style="font-size: var(--fs-lg); color: var(--color-text-muted); margin-top: var(--space-2); font-weight: 600;">Gigabytes</div>
      </div>
      <p style="text-align: center; color: var(--color-text-muted); font-size: var(--fs-xs); margin-top: var(--space-4);">Live calculation updated on input</p>
    </div>
  `;

    const valInput = document.getElementById('data-value') as HTMLInputElement;
    const fromSelect = document.getElementById('data-from') as HTMLSelectElement;
    const toSelect = document.getElementById('data-to') as HTMLSelectElement;
    const resultDiv = document.getElementById('data-result') as HTMLDivElement;

    const update = () => {
        const val = parseFloat(valInput.value) || 0;
        const from = fromSelect.value;
        const to = toSelect.value;

        // Convert to base (bits) then to target unit
        const baseVal = val * UNITS[from];
        const targetVal = baseVal / UNITS[to];

        resultDiv.textContent = targetVal.toLocaleString(undefined, { maximumFractionDigits: 8 });
        document.getElementById('data-result-unit')!.textContent = UNIT_NAMES[to].split(' (')[0];
    };

    [valInput, fromSelect, toSelect].forEach(inp => inp.addEventListener('input', update));
    update();
}
