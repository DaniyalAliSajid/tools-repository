export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input" style="display: flex; flex-direction: column; gap: var(--space-4);">
      <div class="p-card" style="border-left: 4px solid var(--color-primary);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Find Percentage</h4>
        <div style="display: flex; gap: var(--space-3); align-items: center;">
          <div class="input-group" style="flex: 1;">
            <input type="number" class="input-field" id="pc-percent" placeholder="X" style="width: 100%; padding: var(--space-3); text-align: center; font-weight: 700;">
          </div>
          <span style="font-weight: 700; color: var(--color-text-muted); font-size: var(--fs-sm);">% of</span>
          <div class="input-group" style="flex: 1;">
            <input type="number" class="input-field" id="pc-of" placeholder="Y" style="width: 100%; padding: var(--space-3); text-align: center; font-weight: 700;">
          </div>
        </div>
      </div>

      <div class="p-card" style="border-left: 4px solid #10b981;">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Find Percentage Rate</h4>
        <div style="display: flex; gap: var(--space-3); align-items: center;">
          <div class="input-group" style="flex: 1;">
            <input type="number" class="input-field" id="pc-val" placeholder="X" style="width: 100%; padding: var(--space-3); text-align: center; font-weight: 700;">
          </div>
          <span style="font-weight: 700; color: var(--color-text-muted); font-size: var(--fs-sm);">is what % of</span>
          <div class="input-group" style="flex: 1;">
            <input type="number" class="input-field" id="pc-total" placeholder="Y" style="width: 100%; padding: var(--space-3); text-align: center; font-weight: 700;">
          </div>
        </div>
      </div>

      <div class="p-card" style="border-left: 4px solid #f59e0b;">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Percentage Change</h4>
        <div style="display: flex; gap: var(--space-3); align-items: center;">
          <div class="input-group" style="flex: 1;">
            <input type="number" class="input-field" id="pc-from" placeholder="From" style="width: 100%; padding: var(--space-3); text-align: center; font-weight: 700;">
          </div>
          <span style="font-weight: 700; color: var(--color-text-muted); font-size: var(--fs-sm);">to</span>
          <div class="input-group" style="flex: 1;">
            <input type="number" class="input-field" id="pc-to" placeholder="To" style="width: 100%; padding: var(--space-3); text-align: center; font-weight: 700;">
          </div>
        </div>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Interactive Insights</h3>
      </div>
      <div class="stat-card">
        <div class="stat-card__label">Result of X% of Y</div>
        <div class="stat-card__value" id="pc-result1">—</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__label">Percentage of Y</div>
        <div class="stat-card__value" id="pc-result2">—</div>
      </div>
      <div class="stat-card">
        <div class="stat-card__label">Percentage Change</div>
        <div class="stat-card__value" id="pc-result3">—</div>
      </div>
    </div>
  `;

    // X% of Y
    ['pc-percent', 'pc-of'].forEach((id) => {
        document.getElementById(id)!.addEventListener('input', () => {
            const p = parseFloat((document.getElementById('pc-percent') as HTMLInputElement).value);
            const v = parseFloat((document.getElementById('pc-of') as HTMLInputElement).value);
            document.getElementById('pc-result1')!.textContent = !isNaN(p) && !isNaN(v) ? String((p / 100) * v) : '—';
        });
    });

    // X is what % of Y
    ['pc-val', 'pc-total'].forEach((id) => {
        document.getElementById(id)!.addEventListener('input', () => {
            const v = parseFloat((document.getElementById('pc-val') as HTMLInputElement).value);
            const t = parseFloat((document.getElementById('pc-total') as HTMLInputElement).value);
            document.getElementById('pc-result2')!.textContent = !isNaN(v) && !isNaN(t) && t !== 0 ? `${((v / t) * 100).toFixed(2)}%` : '—';
        });
    });

    // Percentage change
    ['pc-from', 'pc-to'].forEach((id) => {
        document.getElementById(id)!.addEventListener('input', () => {
            const f = parseFloat((document.getElementById('pc-from') as HTMLInputElement).value);
            const t = parseFloat((document.getElementById('pc-to') as HTMLInputElement).value);
            if (!isNaN(f) && !isNaN(t) && f !== 0) {
                const change = ((t - f) / f) * 100;
                const sign = change >= 0 ? '+' : '';
                document.getElementById('pc-result3')!.textContent = `${sign}${change.toFixed(2)}%`;
            } else {
                document.getElementById('pc-result3')!.textContent = '—';
            }
        });
    });
}
