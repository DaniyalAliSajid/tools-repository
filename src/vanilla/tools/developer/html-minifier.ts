export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="hm-input">Source HTML</label>
        <textarea class="input-field" id="hm-input" rows="12" placeholder="<div>\n  <p>Hello World</p>\n</div>" style="resize: vertical;"></textarea>
      </div>
      <button class="btn btn--primary btn--block" id="btn-minify" style="margin-top: var(--space-4);">⚡ Minify HTML</button>
    </div>
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Minified Result</h3>
        <button class="btn btn--secondary btn--sm" id="btn-copy">📋 Copy</button>
      </div>
      <textarea class="result-box" id="hm-output" rows="8" readonly style="width: 100%; min-height: 200px; margin-bottom: var(--space-6); border: none; outline: none;"></textarea>
      
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-card__value" id="hm-original">0</div>
          <div class="stat-card__label">Original Size</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="hm-minified">0</div>
          <div class="stat-card__label">Minified Size</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="hm-savings" style="color:#10b981">0%</div>
          <div class="stat-card__label">Total Savings</div>
        </div>
      </div>
    </div>
  `;

    document.getElementById('btn-minify')!.addEventListener('click', () => {
        const input = (document.getElementById('hm-input') as HTMLTextAreaElement).value;
        const minified = input
            .replace(/<!--[\s\S]*?-->/g, '')      // Remove comments
            .replace(/\s+/g, ' ')                  // Collapse whitespace
            .replace(/>\s+</g, '><')               // Remove space between tags
            .replace(/\s+>/g, '>')                 // Remove space before >
            .replace(/<\s+/g, '<')                 // Remove space after <
            .trim();

        (document.getElementById('hm-output') as HTMLTextAreaElement).value = minified;
        document.getElementById('hm-original')!.textContent = String(input.length);
        document.getElementById('hm-minified')!.textContent = String(minified.length);
        const savings = input.length > 0 ? ((1 - minified.length / input.length) * 100).toFixed(1) : '0';
        document.getElementById('hm-savings')!.textContent = `${savings}%`;
    });

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText((document.getElementById('hm-output') as HTMLTextAreaElement).value);
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅ Copied!';
        setTimeout(() => (btn.textContent = '📋 Copy'), 1500);
    });
}
