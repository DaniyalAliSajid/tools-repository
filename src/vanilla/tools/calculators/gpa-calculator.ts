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
    <div class="tool-layout__input">
      <div id="gpa-rows">
        <div class="gpa-row p-card" style="margin-bottom: var(--space-4); background: var(--color-surface-hover); padding: var(--space-4); display: flex; gap: var(--space-4);">
          <div class="input-group" style="flex: 1.5;">
            <label>Grade Secured</label>
            <select class="input-field gpa-grade" style="padding: var(--space-3);">
              ${getGradeOptions()}
            </select>
          </div>
          <div class="input-group" style="flex: 1;">
            <label>Unit Credits</label>
            <input type="number" class="input-field gpa-credit" value="3" min="1" style="padding: var(--space-3);">
          </div>
        </div>
      </div>

      <div style="display: flex; gap: var(--space-3); margin-bottom: var(--space-6);">
        <button class="btn btn--secondary" id="gpa-add" style="flex: 1; padding: var(--space-4);">➕ Add Course</button>
        <button class="btn btn--outline" id="gpa-reset" style="flex: 1; padding: var(--space-4);">🔄 Reset All</button>
      </div>
      
      <div class="p-card">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Method:</strong> GPA is calculated as the weighted average of grade points based on course credits.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Semester Performance</h3>
      </div>
      <div class="result-box" style="padding: var(--space-10); display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--color-surface-hover); min-height: 350px;">
        <div style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: var(--space-2);">SEMESTER GPA</div>
        <div id="gpa-score" style="font-size: 6rem; font-weight: 900; color: var(--color-primary); line-height: 1;">4.00</div>
        
        <div id="gpa-details" style="margin-top: var(--space-8); font-size: var(--fs-sm); font-weight: 600; color: var(--color-text-secondary); padding: var(--space-2) var(--space-4); background: var(--color-primary-light); border-radius: var(--radius-full);">Total Credits: 3</div>
        
        <div style="margin-top: var(--space-10); display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); width: 100%;">
          <div style="text-align: center;">
            <div style="font-size: var(--fs-xs); color: var(--color-text-muted);">Points</div>
            <div style="font-weight: 700;">12.0</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: var(--fs-xs); color: var(--color-text-muted);">Status</div>
            <div style="font-weight: 700; color: #10b981;">Excellent</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: var(--fs-xs); color: var(--color-text-muted);">Scale</div>
            <div style="font-weight: 700;">4.0</div>
          </div>
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
    div.className = 'gpa-row p-card';
    div.style.marginBottom = 'var(--space-4)';
    div.style.background = 'var(--color-surface-hover)';
    div.style.padding = 'var(--space-4)';
    div.style.display = 'flex';
    div.style.gap = 'var(--space-4)';
    div.innerHTML = `
      <div class="input-group" style="flex: 1.5;">
        <label>Grade Secured</label>
        <select class="input-field gpa-grade" style="padding: var(--space-3);">
          ${getGradeOptions()}
        </select>
      </div>
      <div class="input-group" style="flex: 1;">
        <label>Unit Credits</label>
        <input type="number" class="input-field gpa-credit" value="3" min="1" style="padding: var(--space-3);">
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
