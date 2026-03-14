export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="jm-input">Paste your JavaScript</label>
        <textarea class="input-field" id="jm-input" rows="8" placeholder="function hello() {\n  // Say hello\n  console.log('Hello World');\n}"></textarea>
      </div>
      <button class="btn btn--primary btn--block" id="btn-minify">Minify JavaScript</button>
      <div class="input-group">
        <label>Minified Output</label>
        <textarea class="input-field" id="jm-output" rows="5" readonly></textarea>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-card__value" id="jm-original">0</div>
          <div class="stat-card__label">Original (bytes)</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="jm-minified">0</div>
          <div class="stat-card__label">Minified (bytes)</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="jm-savings" style="color:var(--color-success)">0%</div>
          <div class="stat-card__label">Savings</div>
        </div>
      </div>
      <button class="btn btn--secondary btn--block" id="btn-copy">📋 Copy</button>
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
