export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="cm-input">Paste your CSS</label>
        <textarea class="input-field" id="cm-input" rows="8" placeholder=".container {\n  display: flex;\n  /* Main layout */\n  gap: 16px;\n}"></textarea>
      </div>
      <button class="btn btn--primary btn--block" id="btn-minify">Minify CSS</button>
      <div class="input-group">
        <label>Minified Output</label>
        <textarea class="input-field" id="cm-output" rows="5" readonly></textarea>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-card__value" id="cm-original">0</div>
          <div class="stat-card__label">Original (bytes)</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="cm-minified">0</div>
          <div class="stat-card__label">Minified (bytes)</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="cm-savings" style="color:var(--color-success)">0%</div>
          <div class="stat-card__label">Savings</div>
        </div>
      </div>
      <button class="btn btn--secondary btn--block" id="btn-copy">📋 Copy</button>
    </div>
  `;

    document.getElementById('btn-minify')!.addEventListener('click', () => {
        const input = (document.getElementById('cm-input') as HTMLTextAreaElement).value;
        const minified = input
            .replace(/\/\*[\s\S]*?\*\//g, '')    // Remove comments
            .replace(/\s+/g, ' ')                 // Collapse whitespace
            .replace(/\s*{\s*/g, '{')             // Remove space around {
            .replace(/\s*}\s*/g, '}')             // Remove space around }
            .replace(/\s*;\s*/g, ';')             // Remove space around ;
            .replace(/\s*:\s*/g, ':')             // Remove space around :
            .replace(/\s*,\s*/g, ',')             // Remove space around ,
            .replace(/;}/g, '}')                   // Remove last ; before }
            .trim();

        (document.getElementById('cm-output') as HTMLTextAreaElement).value = minified;
        document.getElementById('cm-original')!.textContent = String(input.length);
        document.getElementById('cm-minified')!.textContent = String(minified.length);
        const savings = input.length > 0 ? ((1 - minified.length / input.length) * 100).toFixed(1) : '0';
        document.getElementById('cm-savings')!.textContent = `${savings}%`;
    });

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText((document.getElementById('cm-output') as HTMLTextAreaElement).value);
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅ Copied!';
        setTimeout(() => (btn.textContent = '📋 Copy'), 1500);
    });
}
