export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Input temperature</h4>
        <div class="input-group">
          <label for="temp-value">Source Degree</label>
          <div style="display: flex; gap: var(--space-2);">
            <input type="number" class="input-field" id="temp-value" placeholder="0" style="flex: 2; padding: var(--space-3);">
            <select class="input-field" id="temp-from" style="flex: 1; padding: var(--space-3);">
              <option value="C">°C</option>
              <option value="F">°F</option>
              <option value="K">K</option>
            </select>
          </div>
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="temp-to">Target Unit</label>
          <select class="input-field" id="temp-to" style="padding: var(--space-3);">
            <option value="C">Celsius (°C)</option>
            <option value="F" selected>Fahrenheit (°F)</option>
            <option value="K">Kelvin (K)</option>
          </select>
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Equivalence:</strong> 0°C is equal to 32°F and 273.15K.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Interactive result</h3>
      </div>
      <div class="result-box" style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 300px; background: var(--color-surface-hover);">
        <div id="temp-result" style="font-size: 4rem; font-weight: 800; color: var(--color-primary); letter-spacing: -0.02em;">0</div>
        <div id="temp-result-unit" style="font-size: var(--fs-lg); color: var(--color-text-muted); margin-top: var(--space-2); font-weight: 600;">Fahrenheit</div>
      </div>
      <p style="text-align: center; color: var(--color-text-muted); font-size: var(--fs-xs); margin-top: var(--space-4);">Real-time precision conversion</p>
    </div>
  `;

    const valInput = document.getElementById('temp-value') as HTMLInputElement;
    const fromSelect = document.getElementById('temp-from') as HTMLSelectElement;
    const toSelect = document.getElementById('temp-to') as HTMLSelectElement;
    const resultDiv = document.getElementById('temp-result') as HTMLDivElement;

    const update = () => {
        const val = parseFloat(valInput.value) || 0;
        const from = fromSelect.value;
        const to = toSelect.value;

        if (from === to) {
            resultDiv.textContent = val.toLocaleString();
            return;
        }

        // Convert from source to Celsius
        let celsius = 0;
        if (from === 'C') celsius = val;
        else if (from === 'F') celsius = (val - 32) * 5 / 9;
        else if (from === 'K') celsius = val - 273.15;

        // Convert from Celsius to target
        let result = 0;
        if (to === 'C') result = celsius;
        else if (to === 'F') result = (celsius * 9 / 5) + 32;
        else if (to === 'K') result = celsius + 273.15;

        resultDiv.textContent = result.toLocaleString(undefined, { maximumFractionDigits: 4 });
        const unitMap: any = { 'C': 'Celsius', 'F': 'Fahrenheit', 'K': 'Kelvin' };
        document.getElementById('temp-result-unit')!.textContent = unitMap[to];
    };

    [valInput, fromSelect, toSelect].forEach(inp => inp.addEventListener('input', update));
    update();
}
