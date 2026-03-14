export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <h4 style="color:var(--color-text-secondary)">What is X% of Y?</h4>
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="pc-percent">Percentage (%)</label>
          <input type="number" class="input-field" id="pc-percent" placeholder="e.g. 15" />
        </div>
        <div class="input-group">
          <label for="pc-of">Of value</label>
          <input type="number" class="input-field" id="pc-of" placeholder="e.g. 200" />
        </div>
      </div>
      <div class="result-box" id="pc-result1" style="text-align:center;font-size:var(--fs-xl);font-weight:var(--fw-bold);color:var(--color-primary);">—</div>

      <hr style="border:none;border-top:1px solid var(--color-border);margin:var(--space-4) 0"/>

      <h4 style="color:var(--color-text-secondary)">X is what % of Y?</h4>
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="pc-val">Value</label>
          <input type="number" class="input-field" id="pc-val" placeholder="e.g. 30" />
        </div>
        <div class="input-group">
          <label for="pc-total">Total</label>
          <input type="number" class="input-field" id="pc-total" placeholder="e.g. 200" />
        </div>
      </div>
      <div class="result-box" id="pc-result2" style="text-align:center;font-size:var(--fs-xl);font-weight:var(--fw-bold);color:var(--color-primary);">—</div>

      <hr style="border:none;border-top:1px solid var(--color-border);margin:var(--space-4) 0"/>

      <h4 style="color:var(--color-text-secondary)">Percentage Change</h4>
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="pc-from">From value</label>
          <input type="number" class="input-field" id="pc-from" placeholder="e.g. 100" />
        </div>
        <div class="input-group">
          <label for="pc-to">To value</label>
          <input type="number" class="input-field" id="pc-to" placeholder="e.g. 130" />
        </div>
      </div>
      <div class="result-box" id="pc-result3" style="text-align:center;font-size:var(--fs-xl);font-weight:var(--fw-bold);color:var(--color-primary);">—</div>
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
