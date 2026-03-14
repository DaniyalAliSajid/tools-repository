export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="bf-gender">Gender</label>
          <select id="bf-gender" class="input-field">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="input-group">
          <label for="bf-height">Height (cm)</label>
          <input type="number" id="bf-height" class="input-field" value="175">
        </div>
        <div class="input-group">
          <label for="bf-neck">Neck (cm)</label>
          <input type="number" id="bf-neck" class="input-field" value="40">
        </div>
        <div class="input-group">
          <label for="bf-waist">Waist (cm)</label>
          <input type="number" id="bf-waist" class="input-field" value="90">
        </div>
        <div id="bf-hip-group" class="input-group" style="display: none;">
          <label for="bf-hip">Hip (cm)</label>
          <input type="number" id="bf-hip" class="input-field" value="100">
        </div>
      </div>

      <div class="input-group" style="margin-top: var(--space-8);">
        <label>Body Fat Percentage (Navy Method)</label>
        <div class="result-box" style="text-align: center; padding: var(--space-8); background: #fff7ed;">
           <div id="bf-result" style="font-size: 3.5rem; font-weight: 700; color: #c2410c;">--%</div>
           <div id="bf-category" style="margin-top: var(--space-2); font-weight: 600; color: #9a3412;">--</div>
        </div>
      </div>
    </div>
  `;

    const genderIn = document.getElementById('bf-gender') as HTMLSelectElement;
    const heightIn = document.getElementById('bf-height') as HTMLInputElement;
    const neckIn = document.getElementById('bf-neck') as HTMLInputElement;
    const waistIn = document.getElementById('bf-waist') as HTMLInputElement;
    const hipIn = document.getElementById('bf-hip') as HTMLInputElement;
    const hipGroup = document.getElementById('bf-hip-group')!;
    const resultEl = document.getElementById('bf-result')!;
    const catEl = document.getElementById('bf-category')!;

    const calculate = () => {
        const gender = genderIn.value;
        const height = parseFloat(heightIn.value) || 0;
        const neck = parseFloat(neckIn.value) || 0;
        const waist = parseFloat(waistIn.value) || 0;
        const hip = parseFloat(hipIn.value) || 0;

        hipGroup.style.display = gender === 'female' ? 'block' : 'none';

        if (height <= 0 || neck <= 0 || waist <= 0) return;

        let bodyFat = 0;
        if (gender === 'male') {
            // Navy formula for men: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
            bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450;
        } else {
            // Navy formula for women: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.221 * log10(height)) - 450
            bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.22100 * Math.log10(height)) - 450;
        }

        resultEl.textContent = `${Math.max(0, bodyFat).toFixed(1)}%`;

        // Categorization
        if (gender === 'male') {
            if (bodyFat < 6) catEl.textContent = 'Essential Fat';
            else if (bodyFat < 14) catEl.textContent = 'Athletes';
            else if (bodyFat < 18) catEl.textContent = 'Fitness';
            else if (bodyFat < 25) catEl.textContent = 'Average';
            else catEl.textContent = 'Obese';
        } else {
            if (bodyFat < 14) catEl.textContent = 'Essential Fat';
            else if (bodyFat < 21) catEl.textContent = 'Athletes';
            else if (bodyFat < 25) catEl.textContent = 'Fitness';
            else if (bodyFat < 32) catEl.textContent = 'Average';
            else catEl.textContent = 'Obese';
        }
    };

    [genderIn, heightIn, neckIn, waistIn, hipIn].forEach(inp => inp.addEventListener('input', calculate));
    calculate();
}
