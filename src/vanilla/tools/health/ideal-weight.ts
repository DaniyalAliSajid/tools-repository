export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="iw-height">Height (cm)</label>
          <input type="number" id="iw-height" class="input-field" value="175">
        </div>
        <div class="input-group">
          <label for="iw-gender">Gender</label>
          <select id="iw-gender" class="input-field">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
      </div>

      <div class="input-group" style="margin-top: var(--space-8);">
        <label>Ideal Weight Range (Miller Formula)</label>
        <div class="result-box" style="text-align: center; padding: var(--space-8); background: #fdf2f8;">
           <div id="iw-result" style="font-size: 3.5rem; font-weight: 700; color: #be185d;">--</div>
           <div id="iw-details" style="margin-top: var(--space-2); font-weight: 600; color: #9d174d;">Healthy BMI: 18.5 - 25</div>
        </div>
      </div>
    </div>
  `;

    const heightIn = document.getElementById('iw-height') as HTMLInputElement;
    const genderIn = document.getElementById('iw-gender') as HTMLSelectElement;
    const resultEl = document.getElementById('iw-result')!;

    const calculate = () => {
        const height = parseFloat(heightIn.value) || 0;
        const gender = genderIn.value;

        if (height < 100) return;

        // Miller Formula:
        // Male: 56.2 kg + 1.41 kg per inch over 5 feet
        // Female: 53.1 kg + 1.36 kg per inch over 5 feet
        const inchesOver5ft = (height / 2.54) - 60;
        let ideal = 0;
        if (gender === 'male') {
            ideal = 56.2 + (1.41 * inchesOver5ft);
        } else {
            ideal = 53.1 + (1.36 * inchesOver5ft);
        }

        // Also calculate BMI based range
        const minWeight = 18.5 * Math.pow(height / 100, 2);
        const maxWeight = 25 * Math.pow(height / 100, 2);

        resultEl.textContent = `${ideal.toFixed(1)} kg`;
        // resultEl.title = `Healthy range: ${minWeight.toFixed(1)}kg - ${maxWeight.toFixed(1)}kg`;
    };

    [heightIn, genderIn].forEach(inp => inp.addEventListener('input', calculate));
    calculate();
}
