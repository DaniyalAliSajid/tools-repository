// All units expressed in terms of square meters (base unit)
const UNITS: { [key: string]: number } = {
    'sq_mm': 1e-6,
    'sq_cm': 1e-4,
    'sq_m': 1,
    'sq_km': 1e6,
    'sq_in': 0.00064516,
    'sq_ft': 0.092903,
    'sq_yd': 0.836127,
    'sq_mi': 2589988.11,
    'acre': 4046.8564224,
    'hectare': 10000,
    'marla': 25.2929,
    'kanal': 505.857,
    'bigha': 2529.29,
    'biswa': 126.464,
    'gunta': 101.17,
    'cent': 40.4686,
};

const UNIT_NAMES: { [key: string]: string } = {
    'sq_mm': 'Sq Millimeters (mm²)',
    'sq_cm': 'Sq Centimeters (cm²)',
    'sq_m': 'Sq Meters (m²)',
    'sq_km': 'Sq Kilometers (km²)',
    'sq_in': 'Sq Inches (in²)',
    'sq_ft': 'Sq Feet (ft²)',
    'sq_yd': 'Sq Yards (yd²)',
    'sq_mi': 'Sq Miles (mi²)',
    'acre': 'Acres',
    'hectare': 'Hectares (ha)',
    'marla': 'Marla',
    'kanal': 'Kanal',
    'bigha': 'Bigha',
    'biswa': 'Biswa',
    'gunta': 'Guntha',
    'cent': 'Cent',
};

const UNIT_SHORT: { [key: string]: string } = {
    'sq_mm': 'mm²',
    'sq_cm': 'cm²',
    'sq_m': 'm²',
    'sq_km': 'km²',
    'sq_in': 'in²',
    'sq_ft': 'ft²',
    'sq_yd': 'yd²',
    'sq_mi': 'mi²',
    'acre': 'ac',
    'hectare': 'ha',
    'marla': 'marla',
    'kanal': 'kanal',
    'bigha': 'bigha',
    'biswa': 'biswa',
    'gunta': 'guntha',
    'cent': 'cent',
};

export function render(container: HTMLElement): void {
    const fromOptions = Object.entries(UNIT_NAMES).map(([id, name]) =>
        `<option value="${id}" ${id === 'sq_ft' ? 'selected' : ''}>${name}</option>`
    ).join('');
    const toOptions = Object.entries(UNIT_NAMES).map(([id, name]) =>
        `<option value="${id}" ${id === 'sq_m' ? 'selected' : ''}>${name}</option>`
    ).join('');

    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Conversion Input</h4>
        <div class="input-group">
          <label for="area-value">Source Value</label>
          <input type="number" class="input-field" id="area-value" placeholder="Enter area value" value="1" style="padding: var(--space-3); font-weight: 700; font-size: var(--fs-lg);">
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="area-from">From Unit</label>
            <select class="input-field" id="area-from" style="padding: var(--space-3);">
              ${fromOptions}
            </select>
          </div>
          <div class="input-group">
            <label for="area-to">To Unit</label>
            <select class="input-field" id="area-to" style="padding: var(--space-3);">
              ${toOptions}
            </select>
          </div>
        </div>
        <button class="btn btn--secondary btn--block" id="area-swap" style="margin-top: var(--space-4); padding: var(--space-3);">⇄ Swap Units</button>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <h4 style="margin-bottom: var(--space-3); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Quick Reference</h4>
        <div style="display: flex; flex-direction: column; gap: var(--space-2); font-size: var(--fs-xs); color: var(--color-text-secondary); line-height: 1.6;">
          <span>1 Acre = 4,046.86 m² = 43,560 ft²</span>
          <span>1 Hectare = 10,000 m² = 2.471 Acres</span>
          <span>1 Kanal = 20 Marla = 505.857 m²</span>
          <span>1 Bigha ≈ 2,529 m² (varies by region)</span>
        </div>
      </div>
    </div>

    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Conversion Result</h3>
      </div>

      <div class="stat-card" style="margin-bottom: var(--space-6); background: var(--color-primary-light); border-color: rgba(37, 99, 235, 0.2); text-align: center; padding: var(--space-8);">
        <div class="stat-card__label" style="color: var(--color-primary); margin-bottom: var(--space-2);">Converted Value</div>
        <div class="stat-card__value" id="area-result" style="font-size: 3.5rem; color: var(--color-primary); line-height: 1; word-break: break-all;">0</div>
        <div id="area-result-unit" style="font-size: var(--fs-lg); color: var(--color-text-muted); margin-top: var(--space-3); font-weight: 600;">Sq Meters</div>
      </div>

      <div style="margin-bottom: var(--space-4);">
         <h4 style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-3);">All Conversions</h4>
      </div>

      <div id="area-all-results" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);"></div>

      <p style="text-align: center; color: var(--color-text-muted); font-size: var(--fs-xs); margin-top: var(--space-6);">Calculated instantly as you type</p>
    </div>
  `;

    const valInput = document.getElementById('area-value') as HTMLInputElement;
    const fromSelect = document.getElementById('area-from') as HTMLSelectElement;
    const toSelect = document.getElementById('area-to') as HTMLSelectElement;
    const resultDiv = document.getElementById('area-result')!;
    const resultUnitDiv = document.getElementById('area-result-unit')!;
    const allResultsDiv = document.getElementById('area-all-results')!;
    const swapBtn = document.getElementById('area-swap')!;

    const update = () => {
        const val = parseFloat(valInput.value) || 0;
        const from = fromSelect.value;
        const to = toSelect.value;

        // Convert to base (square meters) then to target unit
        const baseVal = val * UNITS[from];
        const targetVal = baseVal / UNITS[to];

        // Format smartly
        const formatted = targetVal < 0.0001 && targetVal > 0
            ? targetVal.toExponential(4)
            : targetVal.toLocaleString(undefined, { maximumFractionDigits: 6 });

        resultDiv.textContent = formatted;
        resultUnitDiv.textContent = UNIT_NAMES[to].split(' (')[0];

        // Build all conversions grid
        allResultsDiv.innerHTML = Object.entries(UNIT_NAMES)
            .filter(([id]) => id !== to)
            .map(([id, name]) => {
                const converted = baseVal / UNITS[id];
                const display = converted < 0.0001 && converted > 0
                    ? converted.toExponential(3)
                    : converted.toLocaleString(undefined, { maximumFractionDigits: 4 });
                return `
                    <div class="p-card" style="padding: var(--space-3); background: var(--color-surface-hover); display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-size: var(--fs-xs); color: var(--color-text-muted); font-weight: 600;">${UNIT_SHORT[id]}</span>
                        <span style="font-weight: 700; font-size: var(--fs-sm); color: var(--color-text);">${display}</span>
                    </div>
                `;
            }).join('');
    };

    swapBtn.addEventListener('click', () => {
        const temp = fromSelect.value;
        fromSelect.value = toSelect.value;
        toSelect.value = temp;
        update();
    });

    [valInput, fromSelect, toSelect].forEach(inp => inp.addEventListener('input', update));
    update();
}
