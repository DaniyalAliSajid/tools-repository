export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="cm-input">Source CSS</label>
        <textarea class="input-field" id="cm-input" rows="12" placeholder=".container {\n  display: flex;\n  gap: 16px;\n}" style="resize: vertical;"></textarea>
      </div>
      <button class="btn btn--primary btn--block" id="btn-minify" style="margin-top: var(--space-4);">⚡ Minify CSS</button>
    </div>
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Minified Result</h3>
        <button class="btn btn--secondary btn--sm" id="btn-copy">📋 Copy</button>
      </div>
      <textarea class="result-box" id="cm-output" rows="8" readonly style="width: 100%; min-height: 200px; margin-bottom: var(--space-6); border: none; outline: none;"></textarea>
      
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-card__value" id="cm-original">0</div>
          <div class="stat-card__label">Original Size</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="cm-minified">0</div>
          <div class="stat-card__label">Minified Size</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="cm-savings" style="color:#10b981">0%</div>
          <div class="stat-card__label">Total Savings</div>
        </div>
      </div>
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
