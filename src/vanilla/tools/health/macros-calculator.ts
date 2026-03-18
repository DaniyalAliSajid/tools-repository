export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Biometric Profile</h4>
        
        <div class="input-group" style="margin-bottom: var(--space-4);">
          <label>Biological Gender</label>
          <div class="toggle-group" id="macro-gender">
            <button class="btn btn--sm active" data-gender="male">Male</button>
            <button class="btn btn--sm" data-gender="female">Female</button>
          </div>
        </div>

        <div class="tool-grid-2">
          <div class="input-group">
            <label for="macro-weight">Weight (kg)</label>
            <input type="number" class="input-field" id="macro-weight" placeholder="70" step="0.1" style="padding: var(--space-3);" />
          </div>
          <div class="input-group">
            <label for="macro-height">Height (cm)</label>
            <input type="number" class="input-field" id="macro-height" placeholder="175" step="0.1" style="padding: var(--space-3);" />
          </div>
        </div>

        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="macro-age">Age (Years)</label>
            <input type="number" class="input-field" id="macro-age" placeholder="25" step="1" style="padding: var(--space-3);" />
          </div>
          <div class="input-group">
            <label for="macro-activity">Activity Level</label>
            <select class="input-field" id="macro-activity" style="padding: var(--space-3);">
              <option value="1.2">Sedentary</option>
              <option value="1.375">Light</option>
              <option value="1.55">Moderate</option>
              <option value="1.725">Very Active</option>
              <option value="1.9">Extra Active</option>
            </select>
          </div>
        </div>

        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="macro-goal">Nutrition Goal</label>
          <select id="macro-goal" class="input-field" style="padding: var(--space-3); font-weight: 600;">
            <option value="balanced">Balanced (30/40/30)</option>
            <option value="lowcarb">Low Carb (40/20/40)</option>
            <option value="highprot">High Protein (40/30/30)</option>
            <option value="keto">Keto (20/5/75)</option>
          </select>
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Information:</strong> Protein and Carb provide 4 kcal/g, while Fat provides 9 kcal/g.
        </p>
      </div>
    </div>
    
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Daily Targets</h3>
        <div id="macro-total-cals" style="font-weight: 700; color: var(--color-primary);">-- kcal</div>
      </div>
      
      <div id="macro-results" style="display: flex; flex-direction: column; gap: var(--space-4);">
        <div class="stat-card" style="border-left: 4px solid #ef4444; background: #fef2f2;">
           <div class="stat-card__label" style="color: #991b1b;">Daily Protein</div>
           <div id="macro-prot" class="stat-card__value" style="color: #ef4444;">--g</div>
        </div>
        <div class="stat-card" style="border-left: 4px solid #3b82f6; background: #eff6ff;">
           <div class="stat-card__label" style="color: #1e3a8a;">Daily Carbs</div>
           <div id="macro-carb" class="stat-card__value" style="color: #3b82f6;">--g</div>
        </div>
        <div class="stat-card" style="border-left: 4px solid #f59e0b; background: #fffbeb;">
           <div class="stat-card__label" style="color: #92400e;">Daily Fats</div>
           <div id="macro-fat" class="stat-card__value" style="color: #f59e0b;">--g</div>
        </div>
      </div>
      
      <div style="margin-top: var(--space-8); height: 20px; width: 100%; display: flex; border-radius: 10px; overflow: hidden; box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
          <div id="macro-bar-prot" style="width: 33%; background: #ef4444;" title="Protein"></div>
          <div id="macro-bar-carb" style="width: 33%; background: #3b82f6;" title="Carbs"></div>
          <div id="macro-bar-fat" style="width: 33%; background: #f59e0b;" title="Fats"></div>
      </div>
    </div>
  `;

    const weightIn = document.getElementById('macro-weight') as HTMLInputElement;
    const heightIn = document.getElementById('macro-height') as HTMLInputElement;
    const ageIn = document.getElementById('macro-age') as HTMLInputElement;
    const activityIn = document.getElementById('macro-activity') as HTMLSelectElement;
    const goalIn = document.getElementById('macro-goal') as HTMLSelectElement;
    const genderBtns = container.querySelectorAll('#macro-gender button');
    
    const protEl = document.getElementById('macro-prot')!;
    const carbEl = document.getElementById('macro-carb')!;
    const fatEl = document.getElementById('macro-fat')!;
    const totalCalsEl = document.getElementById('macro-total-cals')!;

    let gender = 'male';

    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gender = (btn as HTMLElement).dataset.gender!;
            calculate();
        });
    });

    const calculate = () => {
        const W = parseFloat(weightIn.value) || 0;
        const H = parseFloat(heightIn.value) || 0;
        const A = parseFloat(ageIn.value) || 0;
        const L = parseFloat(activityIn.value) || 1.2;
        const goal = goalIn.value;

        if (W <= 0 || H <= 0 || A <= 0) return;

        // Mifflin-St Jeor
        let bmr = (10 * W) + (6.25 * H) - (5 * A);
        bmr = gender === 'male' ? bmr + 5 : bmr - 161;
        const tdee = Math.round(bmr * L);
        totalCalsEl.textContent = `${tdee.toLocaleString()} kcal`;

        let pPerc = 30, cPerc = 40, fPerc = 30;
        if (goal === 'lowcarb') { pPerc = 40; cPerc = 20; fPerc = 40; }
        else if (goal === 'highprot') { pPerc = 40; cPerc = 30; fPerc = 30; }
        else if (goal === 'keto') { pPerc = 20; cPerc = 5; fPerc = 75; }

        const prot = (tdee * (pPerc / 100)) / 4;
        const carb = (tdee * (cPerc / 100)) / 4;
        const fat = (tdee * (fPerc / 100)) / 9;

        protEl.textContent = `${Math.round(prot)}g`;
        carbEl.textContent = `${Math.round(carb)}g`;
        fatEl.textContent = `${Math.round(fat)}g`;
        
        document.getElementById('macro-bar-prot')!.style.width = `${pPerc}%`;
        document.getElementById('macro-bar-carb')!.style.width = `${cPerc}%`;
        document.getElementById('macro-bar-fat')!.style.width = `${fPerc}%`;
    };

    [weightIn, heightIn, ageIn, activityIn, goalIn].forEach(inp => inp.addEventListener('input', calculate));
}
