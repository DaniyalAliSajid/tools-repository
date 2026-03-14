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
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="data-value">From</label>
          <input type="number" class="input-field" id="data-value" placeholder="1024">
          <select class="input-field" id="data-from">
            ${Object.entries(UNIT_NAMES).map(([id, name]) => `<option value="${id}" ${id === 'MB' ? 'selected' : ''}>${name}</option>`).join('')}
          </select>
        </div>
        <div class="input-group">
          <label>To</label>
          <div class="result-box" id="data-result" style="display: flex; align-items: center; justify-content: center; font-size: var(--fs-xl); font-weight: bold;">0</div>
          <select class="input-field" id="data-to">
             ${Object.entries(UNIT_NAMES).map(([id, name]) => `<option value="${id}" ${id === 'GB' ? 'selected' : ''}>${name}</option>`).join('')}
          </select>
        </div>
      </div>
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
    };

    [valInput, fromSelect, toSelect].forEach(inp => inp.addEventListener('input', update));
    update();
}
