const UNITS: { [key: string]: number } = {
    'mm': 0.001,
    'cm': 0.01,
    'm': 1,
    'km': 1000,
    'in': 0.0254,
    'ft': 0.3048,
    'yd': 0.9144,
    'mi': 1609.34
};

const UNIT_NAMES: { [key: string]: string } = {
    'mm': 'Millimeters (mm)',
    'cm': 'Centimeters (cm)',
    'm': 'Meters (m)',
    'km': 'Kilometers (km)',
    'in': 'Inches (in)',
    'ft': 'Feet (ft)',
    'yd': 'Yards (yd)',
    'mi': 'Miles (mi)'
};

export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="len-input">From</label>
          <input type="number" class="input-field" id="len-value" placeholder="1">
          <select class="input-field" id="len-from">
            ${Object.entries(UNIT_NAMES).map(([id, name]) => `<option value="${id}">${name}</option>`).join('')}
          </select>
        </div>
        <div class="input-group">
          <label>To</label>
          <div class="result-box" id="len-result" style="display: flex; align-items: center; justify-content: center; font-size: var(--fs-xl); font-weight: bold;">0</div>
          <select class="input-field" id="len-to">
             ${Object.entries(UNIT_NAMES).map(([id, name]) => `<option value="${id}" ${id === 'ft' ? 'selected' : ''}>${name}</option>`).join('')}
          </select>
        </div>
      </div>
    </div>
  `;

    const valInput = document.getElementById('len-value') as HTMLInputElement;
    const fromSelect = document.getElementById('len-from') as HTMLSelectElement;
    const toSelect = document.getElementById('len-to') as HTMLSelectElement;
    const resultDiv = document.getElementById('len-result') as HTMLDivElement;

    const update = () => {
        const val = parseFloat(valInput.value) || 0;
        const from = fromSelect.value;
        const to = toSelect.value;

        // Convert to base (meters) then to target unit
        const baseVal = val * UNITS[from];
        const targetVal = baseVal / UNITS[to];

        resultDiv.textContent = targetVal.toLocaleString(undefined, { maximumFractionDigits: 6 });
    };

    [valInput, fromSelect, toSelect].forEach(inp => inp.addEventListener('input', update));
}
