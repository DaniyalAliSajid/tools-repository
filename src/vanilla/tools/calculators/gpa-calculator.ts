const GRADE_POINTS: Record<string, number> = {
  'A': 4.0, 'A-': 3.67,
  'B+': 3.33, 'B': 3.0, 'B-': 2.67,
  'C+': 2.33, 'C': 2.0, 'C-': 1.67,
  'D+': 1.33, 'D': 1.0,
  'F': 0.0, 'FX': 0.0, 'FI': 0.0
};

export function render(container: HTMLElement): void {
  const getGradeOptions = () => {
    return Object.keys(GRADE_POINTS).map(g => `<option value="${g}">${g} (${GRADE_POINTS[g]})</option>`).join('');
  };

  container.innerHTML = `
    <div class="section-gap">
      <div id="gpa-rows">
        <div class="tool-grid-2 gpa-row" style="margin-bottom: var(--space-4);">
          <div class="input-group">
            <label>Grade</label>
            <select class="input-field gpa-grade">
              ${getGradeOptions()}
            </select>
          </div>
          <div class="input-group">
            <label>Credits</label>
            <input type="number" class="input-field gpa-credit" value="3" min="1">
          </div>
        </div>
      </div>

      <div style="display: flex; gap: var(--space-4); margin-bottom: var(--space-6);">
        <button class="btn btn--secondary btn--sm" id="gpa-add">Add Course</button>
        <button class="btn btn--secondary btn--sm" id="gpa-reset">Reset</button>
      </div>

      <div class="input-group">
        <label>Cumulative GPA</label>
        <div class="result-box" id="gpa-result" style="text-align: center; padding: var(--space-8);">
           <div id="gpa-score" style="font-size: 4rem; font-weight: 700; color: var(--color-primary);">4.00</div>
           <div id="gpa-details" style="margin-top: var(--space-2); opacity: 0.7;">Total Credits: 3</div>
        </div>
      </div>
    </div>
  `;

  const rowsContainer = document.getElementById('gpa-rows')!;
  const addBtn = document.getElementById('gpa-add')!;
  const resetBtn = document.getElementById('gpa-reset')!;
  const scoreEl = document.getElementById('gpa-score')!;
  const detailsEl = document.getElementById('gpa-details')!;

  const calculate = () => {
    const grades = Array.from(document.querySelectorAll('.gpa-grade')) as HTMLSelectElement[];
    const credits = Array.from(document.querySelectorAll('.gpa-credit')) as HTMLInputElement[];

    let totalPoints = 0;
    let totalCredits = 0;

    grades.forEach((g, i) => {
      const letter = g.value;
      const points = GRADE_POINTS[letter] || 0;
      const credit = parseFloat(credits[i].value) || 0;
      totalPoints += points * credit;
      totalCredits += credit;
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;
    scoreEl.textContent = gpa.toFixed(2);
    detailsEl.textContent = `Total Credits: ${totalCredits}`;
  };

  const addRow = () => {
    const div = document.createElement('div');
    div.className = 'tool-grid-2 gpa-row';
    div.style.marginBottom = 'var(--space-4)';
    div.innerHTML = `
      <div class="input-group">
        <label>Grade</label>
        <select class="input-field gpa-grade">
          ${getGradeOptions()}
        </select>
      </div>
      <div class="input-group">
        <label>Credits</label>
        <input type="number" class="input-field gpa-credit" value="3" min="1">
      </div>
    `;
    rowsContainer.appendChild(div);
    div.querySelectorAll('select, input').forEach(inp => inp.addEventListener('input', calculate));
    calculate();
  };

  addBtn.addEventListener('click', addRow);
  resetBtn.addEventListener('click', () => {
    rowsContainer.innerHTML = '';
    addRow();
  });

  document.querySelectorAll('.gpa-row select, .gpa-row input').forEach(inp => inp.addEventListener('input', calculate));
  calculate();
}
