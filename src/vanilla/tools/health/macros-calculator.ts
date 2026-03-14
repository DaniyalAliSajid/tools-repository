export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="macro-calories">Daily Calorie Target</label>
          <input type="number" id="macro-calories" class="input-field" value="2000">
        </div>
        <div class="input-group">
          <label for="macro-goal">Fitness Goal</label>
          <select id="macro-goal" class="input-field">
            <option value="balanced">Balanced (30/40/30)</option>
            <option value="lowcarb">Low Carb (40/20/40)</option>
            <option value="highprot">High Protein (40/30/30)</option>
            <option value="keto">Keto (20/5/75)</option>
          </select>
        </div>
      </div>

      <div id="macro-results" class="section-gap tool-grid-3">
        <div class="result-box" style="background: white; text-align: center; border-top: 4px solid #ef4444;">
           <div style="font-weight: 600; color: #ef4444;">Protein</div>
           <div id="macro-prot" style="font-size: 2rem; font-weight: 700;">--g</div>
        </div>
        <div class="result-box" style="background: white; text-align: center; border-top: 4px solid #3b82f6;">
           <div style="font-weight: 600; color: #3b82f6;">Carbs</div>
           <div id="macro-carb" style="font-size: 2rem; font-weight: 700;">--g</div>
        </div>
        <div class="result-box" style="background: white; text-align: center; border-top: 4px solid #f59e0b;">
           <div style="font-weight: 600; color: #f59e0b;">Fats</div>
           <div id="macro-fat" style="font-size: 2rem; font-weight: 700;">--g</div>
        </div>
      </div>
    </div>
  `;

    const calsIn = document.getElementById('macro-calories') as HTMLInputElement;
    const goalIn = document.getElementById('macro-goal') as HTMLSelectElement;
    const protEl = document.getElementById('macro-prot')!;
    const carbEl = document.getElementById('macro-carb')!;
    const fatEl = document.getElementById('macro-fat')!;

    const calculate = () => {
        const calories = parseFloat(calsIn.value) || 0;
        const goal = goalIn.value;

        let pPerc = 30, cPerc = 40, fPerc = 30;

        if (goal === 'lowcarb') { pPerc = 40; cPerc = 20; fPerc = 40; }
        else if (goal === 'highprot') { pPerc = 40; cPerc = 30; fPerc = 30; }
        else if (goal === 'keto') { pPerc = 20; cPerc = 5; fPerc = 75; }

        const prot = (calories * (pPerc / 100)) / 4;
        const carb = (calories * (cPerc / 100)) / 4;
        const fat = (calories * (fPerc / 100)) / 9;

        protEl.textContent = `${Math.round(prot)}g (${pPerc}%)`;
        carbEl.textContent = `${Math.round(carb)}g (${cPerc}%)`;
        fatEl.textContent = `${Math.round(fat)}g (${fPerc}%)`;
    };

    [calsIn, goalIn].forEach(inp => inp.addEventListener('input', calculate));
    calculate();
}
