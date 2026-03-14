export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="temp-value">From</label>
          <input type="number" class="input-field" id="temp-value" placeholder="0">
          <select class="input-field" id="temp-from">
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
            <option value="K">Kelvin (K)</option>
          </select>
        </div>
        <div class="input-group">
          <label>To</label>
          <div class="result-box" id="temp-result" style="display: flex; align-items: center; justify-content: center; font-size: var(--fs-xl); font-weight: bold;">0</div>
          <select class="input-field" id="temp-to">
            <option value="C">Celsius (°C)</option>
            <option value="F" selected>Fahrenheit (°F)</option>
            <option value="K">Kelvin (K)</option>
          </select>
        </div>
      </div>
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
    };

    [valInput, fromSelect, toSelect].forEach(inp => inp.addEventListener('input', update));
    update();
}
