export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="toggle-group" id="bmr-gender">
        <button class="toggle-group__btn active" data-gender="male">Male</button>
        <button class="toggle-group__btn" data-gender="female">Female</button>
      </div>

      <div class="tool-grid-2">
        <div class="input-group">
          <label for="bmr-weight">Weight (kg)</label>
          <input type="number" class="input-field" id="bmr-weight" placeholder="70" step="0.1">
        </div>
        <div class="input-group">
          <label for="bmr-height">Height (cm)</label>
          <input type="number" class="input-field" id="bmr-height" placeholder="175" step="0.1">
        </div>
        <div class="input-group">
          <label for="bmr-age">Age (Years)</label>
          <input type="number" class="input-field" id="bmr-age" placeholder="25" step="1">
        </div>
      </div>

      <div class="input-group">
        <label for="bmr-activity">Activity Level</label>
        <select class="input-field" id="bmr-activity">
          <option value="1.2">Sedentary (little or no exercise)</option>
          <option value="1.375">Lightly active (light exercise/sports 1-3 days/week)</option>
          <option value="1.55">Moderately active (moderate exercise/sports 3-5 days/week)</option>
          <option value="1.725">Very active (hard exercise/sports 6-7 days a week)</option>
          <option value="1.9">Extra active (very hard exercise/sports & physical job)</option>
        </select>
      </div>

      <div class="stats-row" id="bmr-stats">
        <div class="stat-card">
          <div class="stat-card__value" id="bmr-result">0</div>
          <div class="stat-card__label">BMR (Calories/day)</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="bmr-tdee">0</div>
          <div class="stat-card__label">TDEE (Maintenance)</div>
        </div>
      </div>
    </div>
  `;

    const weightInput = document.getElementById('bmr-weight') as HTMLInputElement;
    const heightInput = document.getElementById('bmr-height') as HTMLInputElement;
    const ageInput = document.getElementById('bmr-age') as HTMLInputElement;
    const activitySelect = document.getElementById('bmr-activity') as HTMLSelectElement;
    const genderBtns = document.querySelectorAll('#bmr-gender .toggle-group__btn');

    const bmrVal = document.getElementById('bmr-result')!;
    const tdeeVal = document.getElementById('bmr-tdee')!;

    let gender = 'male';

    const update = () => {
        const W = parseFloat(weightInput.value) || 0;
        const H = parseFloat(heightInput.value) || 0;
        const A = parseFloat(ageInput.value) || 0;
        const activity = parseFloat(activitySelect.value);

        if (W === 0 || H === 0 || A === 0) return;

        // Mifflin-St Jeor Equation
        let bmr = (10 * W) + (6.25 * H) - (5 * A);
        if (gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }

        const tdee = bmr * activity;

        bmrVal.textContent = Math.round(bmr).toLocaleString();
        tdeeVal.textContent = Math.round(tdee).toLocaleString();
    };

    [weightInput, heightInput, ageInput, activitySelect].forEach(inp => inp.addEventListener('input', update));

    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gender = (btn as HTMLElement).dataset.gender!;
            update();
        });
    });
}
