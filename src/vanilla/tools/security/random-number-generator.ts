export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="rng-min">Minimum</label>
          <input type="number" class="input-field" id="rng-min" value="1" />
        </div>
        <div class="input-group">
          <label for="rng-max">Maximum</label>
          <input type="number" class="input-field" id="rng-max" value="100" />
        </div>
      </div>
      <div class="input-group">
        <label for="rng-count">How many numbers?</label>
        <input type="number" class="input-field" id="rng-count" value="1" min="1" max="100" />
      </div>
      <button class="btn btn--primary btn--block" id="btn-generate">🎲 Generate</button>
      <div style="text-align:center;padding:var(--space-8);">
        <div id="rng-result" style="font-size:var(--fs-4xl);font-weight:var(--fw-bold);color:var(--color-primary);word-break:break-all;">—</div>
      </div>
      <div id="rng-history" style="display:none;">
        <h4 style="margin-bottom:var(--space-2);color:var(--color-text-secondary)">History</h4>
        <div class="result-box" id="rng-history-list" style="max-height:200px;overflow-y:auto;"></div>
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
