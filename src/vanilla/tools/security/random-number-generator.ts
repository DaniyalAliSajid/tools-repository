export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Range Settings</h4>
        <div class="tool-grid-2">
          <div class="input-group">
            <label for="rng-min">Minimum</label>
            <input type="number" class="input-field" id="rng-min" value="1" style="padding: var(--space-3);" />
          </div>
          <div class="input-group">
            <label for="rng-max">Maximum</label>
            <input type="number" class="input-field" id="rng-max" value="100" style="padding: var(--space-3);" />
          </div>
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="rng-count">Quantity to Generate</label>
          <input type="number" class="input-field" id="rng-count" value="1" min="1" max="1000" style="padding: var(--space-3);" />
        </div>
        <button class="btn btn--primary btn--block btn--lg" id="btn-generate" style="margin-top: var(--space-6);">⚡ Generate Numbers</button>
      </div>

      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> You can generate up to 1000 unique or repeating numbers within your chosen range.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Generated Results</h3>
      </div>
      <div class="result-box" style="padding: var(--space-12); display: flex; align-items: center; justify-content: center; background: var(--color-surface-hover); min-height: 250px;">
        <div id="rng-result" style="font-size: 4rem; font-weight: 900; color: var(--color-primary); word-break: break-all; text-align: center;">—</div>
      </div>
      
      <div id="rng-history" style="display:none; margin-top: var(--space-6);">
        <h4 style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: var(--space-3);">Generation History</h4>
        <div class="result-box" id="rng-history-list" style="max-height: 200px; overflow-y: auto; padding: var(--space-3); font-family: 'JetBrains Mono'; font-size: 0.875rem; color: var(--color-text-secondary); background: var(--color-surface-hover); line-height: 1.6;"></div>
      </div>
    </div>
  `;

    const history: string[] = [];

    document.getElementById('btn-generate')!.addEventListener('click', () => {
        const min = parseInt((document.getElementById('rng-min') as HTMLInputElement).value);
        const max = parseInt((document.getElementById('rng-max') as HTMLInputElement).value);
        const count = parseInt((document.getElementById('rng-count') as HTMLInputElement).value) || 1;

        if (isNaN(min) || isNaN(max) || min > max) return;

        const numbers: number[] = [];
        for (let i = 0; i < Math.min(count, 100); i++) {
            numbers.push(Math.floor(Math.random() * (max - min + 1)) + min);
        }

        const result = numbers.join(', ');
        document.getElementById('rng-result')!.textContent = result;

        history.unshift(result);
        if (history.length > 20) history.pop();
        const historyEl = document.getElementById('rng-history')!;
        const historyList = document.getElementById('rng-history-list')!;
        historyEl.style.display = 'block';
        historyList.textContent = history.join('\n');
    });
}
