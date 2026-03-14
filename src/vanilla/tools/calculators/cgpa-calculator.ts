export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div id="cgpa-rows">
        <div class="tool-grid-2 cgpa-row" style="margin-bottom: var(--space-4);">
          <div class="input-group">
            <label>Semester GPA (0.0 - 4.0)</label>
            <input type="number" class="input-field cgpa-val" step="0.01" value="3.50" min="0" max="4">
          </div>
          <div class="input-group">
            <label>Total Credits</label>
            <input type="number" class="input-field cgpa-credit" value="15" min="1">
          </div>
        </div>
      </div>

      <div style="display: flex; gap: var(--space-4); margin-bottom: var(--space-6);">
        <button class="btn btn--secondary btn--sm" id="cgpa-add">Add Semester</button>
        <button class="btn btn--secondary btn--sm" id="cgpa-reset">Reset</button>
      </div>

      <div class="input-group">
        <label>Cumulative GPA (CGPA)</label>
        <div class="result-box" id="cgpa-result" style="text-align: center; padding: var(--space-8);">
           <div id="cgpa-score" style="font-size: 4rem; font-weight: 700; color: var(--color-primary);">3.50</div>
           <div id="cgpa-details" style="margin-top: var(--space-2); opacity: 0.7;">Total Credits: 15</div>
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
        detailsEl.textContent = `Total Credits: ${totalCredits}`;
    };

    const addRow = () => {
        const div = document.createElement('div');
        div.className = 'tool-grid-2 cgpa-row';
        div.style.marginBottom = 'var(--space-4)';
        div.innerHTML = `
      <div class="input-group">
        <label>Semester GPA</label>
        <input type="number" class="input-field cgpa-val" step="0.01" value="3.50" min="0" max="4">
      </div>
      <div class="input-group">
        <label>Total Credits</label>
        <input type="number" class="input-field cgpa-credit" value="15" min="1">
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
