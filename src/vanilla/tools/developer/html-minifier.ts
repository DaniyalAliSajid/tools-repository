export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="hm-input">Paste your HTML</label>
        <textarea class="input-field" id="hm-input" rows="8" placeholder="<div>\n  <p>Hello World</p>\n</div>"></textarea>
      </div>
      <button class="btn btn--primary btn--block" id="btn-minify">Minify HTML</button>
      <div class="input-group">
        <label>Minified Output</label>
        <textarea class="input-field" id="hm-output" rows="5" readonly></textarea>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-card__value" id="hm-original">0</div>
          <div class="stat-card__label">Original (bytes)</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="hm-minified">0</div>
          <div class="stat-card__label">Minified (bytes)</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="hm-savings" style="color:var(--color-success)">0%</div>
          <div class="stat-card__label">Savings</div>
        </div>
      </div>
      <button class="btn btn--secondary btn--block" id="btn-copy">📋 Copy</button>
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
