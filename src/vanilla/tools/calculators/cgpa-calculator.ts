export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div id="cgpa-rows">
        <div class="cgpa-row p-card" style="margin-bottom: var(--space-4); display: flex; gap: var(--space-4); background: var(--color-surface-hover); padding: var(--space-4);">
          <div class="input-group" style="flex: 1;">
            <label>Semester GPA</label>
            <input type="number" class="input-field cgpa-val" step="0.01" value="3.50" min="0" max="4" style="padding: var(--space-3);">
          </div>
          <div class="input-group" style="flex: 1;">
            <label>Course Credits</label>
            <input type="number" class="input-field cgpa-credit" value="15" min="1" style="padding: var(--space-3);">
          </div>
        </div>
      </div>
      <div style="display: flex; gap: var(--space-3); margin-top: var(--space-4);">
        <button class="btn btn--secondary" id="cgpa-add" style="flex: 1; padding: var(--space-4);">➕ Add Semester</button>
        <button class="btn btn--outline" id="cgpa-reset" style="flex: 1; padding: var(--space-4);">🔄 Reset All</button>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-6);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> Cumulative Grade Point Average is calculated by dividing the total grade points earned by the total credit hours attempted.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Academic Performance</h3>
      </div>
      <div class="result-box" style="padding: var(--space-10); display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--color-surface-hover); min-height: 350px;">
        <div style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: var(--space-2);">CUMULATIVE GPA</div>
        <div id="cgpa-score" style="font-size: 6rem; font-weight: 900; color: var(--color-primary); line-height: 1;">3.50</div>
        
        <div class="stats-row" style="margin-top: var(--space-10); width: 100%;">
          <div class="stat-card" style="padding: var(--space-4);">
            <div class="stat-card__value" id="cgpa-details" style="font-size: 1.5rem; color: var(--color-text);">15</div>
            <div class="stat-card__label">Total Credits</div>
          </div>
          <div class="stat-card" style="padding: var(--space-4);">
            <div class="stat-card__value" style="font-size: 1.5rem; color: var(--color-text);">Scale 4.0</div>
            <div class="stat-card__label">Standard</div>
          </div>
        </div>
      </div>
    </div>
  `;

    const rowsContainer = document.getElementById('cgpa-rows')!;
    const addBtn = document.getElementById('cgpa-add')!;
    const resetBtn = document.getElementById('cgpa-reset')!;
    const scoreEl = document.getElementById('cgpa-score')!;
    const detailsEl = document.getElementById('cgpa-details')!;

    const calculate = () => {
        const gpas = Array.from(document.querySelectorAll('.cgpa-val')) as HTMLInputElement[];
        const credits = Array.from(document.querySelectorAll('.cgpa-credit')) as HTMLInputElement[];

        let totalPoints = 0;
        let totalCredits = 0;

        gpas.forEach((g, i) => {
            const gpa = parseFloat(g.value) || 0;
            const credit = parseFloat(credits[i].value) || 0;
            totalPoints += gpa * credit;
            totalCredits += credit;
        });

        const cgpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
        scoreEl.textContent = cgpa.toFixed(2);
        detailsEl.textContent = String(totalCredits);
    };

    const addRow = () => {
        const div = document.createElement('div');
        div.className = 'cgpa-row p-card';
        div.style.display = 'flex';
        div.style.gap = 'var(--space-4)';
        div.style.marginBottom = 'var(--space-4)';
        div.style.background = 'var(--color-surface-hover)';
        div.style.padding = 'var(--space-4)';
        div.innerHTML = `
      <div class="input-group" style="flex:1;">
        <label>Semester GPA</label>
        <input type="number" class="input-field cgpa-val" step="0.01" value="3.50" min="0" max="4" style="padding: var(--space-3);">
      </div>
      <div class="input-group" style="flex:1;">
        <label>Course Credits</label>
        <input type="number" class="input-field cgpa-credit" value="15" min="1" style="padding: var(--space-3);">
      </div>
    `;
        rowsContainer.appendChild(div);
        div.querySelectorAll('input').forEach(inp => inp.addEventListener('input', calculate));
        calculate();
    };

    addBtn.addEventListener('click', addRow);
    resetBtn.addEventListener('click', () => {
        rowsContainer.innerHTML = '';
        addRow();
    });

    document.querySelectorAll('.cgpa-row input').forEach(inp => inp.addEventListener('input', calculate));
}
