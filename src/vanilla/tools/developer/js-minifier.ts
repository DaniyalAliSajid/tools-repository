export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="jm-input">Source JavaScript</label>
        <textarea class="input-field" id="jm-input" rows="12" placeholder="function hello() {\n  console.log('Hello');\n}" style="resize: vertical;"></textarea>
      </div>
      <button class="btn btn--primary btn--block" id="btn-minify" style="margin-top: var(--space-4);">⚡ Minify JS</button>
    </div>
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Minified Result</h3>
        <button class="btn btn--secondary btn--sm" id="btn-copy">📋 Copy</button>
      </div>
      <textarea class="result-box" id="jm-output" rows="8" readonly style="width: 100%; min-height: 200px; margin-bottom: var(--space-6); border: none; outline: none;"></textarea>
      
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-card__value" id="jm-original">0</div>
          <div class="stat-card__label">Original Size</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="jm-minified">0</div>
          <div class="stat-card__label">Minified Size</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="jm-savings" style="color:#10b981">0%</div>
          <div class="stat-card__label">Total Savings</div>
        </div>
      </div>
    </div>
  `;

    document.getElementById('btn-minify')!.addEventListener('click', () => {
        const input = (document.getElementById('jm-input') as HTMLTextAreaElement).value;
        const minified = input
            .replace(/\/\/.*$/gm, '')              // Remove single-line comments
            .replace(/\/\*[\s\S]*?\*\//g, '')      // Remove multi-line comments
            .replace(/\n\s*\n/g, '\n')             // Remove empty lines
            .split('\n')
            .map((line) => line.trim())
            .filter(Boolean)
            .join(' ')
            .replace(/\s*([{}();,=+\-*/<>!&|?:])\s*/g, '$1') // Remove space around operators
            .replace(/\s+/g, ' ')
            .trim();

        (document.getElementById('jm-output') as HTMLTextAreaElement).value = minified;
        document.getElementById('jm-original')!.textContent = String(input.length);
        document.getElementById('jm-minified')!.textContent = String(minified.length);
        const savings = input.length > 0 ? ((1 - minified.length / input.length) * 100).toFixed(1) : '0';
        document.getElementById('jm-savings')!.textContent = `${savings}%`;
    });

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText((document.getElementById('jm-output') as HTMLTextAreaElement).value);
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅ Copied!';
        setTimeout(() => (btn.textContent = '📋 Copy'), 1500);
    });
}
