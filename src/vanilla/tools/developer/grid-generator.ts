export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="section-gap">
          <div class="input-group">
            <label for="grid-cols">Columns</label>
            <input type="number" id="grid-cols" class="input-field" value="3" min="1" max="12">
          </div>
          <div class="input-group">
            <label for="grid-rows">Rows</label>
            <input type="number" id="grid-rows" class="input-field" value="2" min="1" max="12">
          </div>
          <div class="input-group">
            <label for="grid-gap">Gap (px)</label>
            <input type="number" id="grid-gap" class="input-field" value="10">
          </div>
        </div>

        <div class="section-gap">
          <div class="preview-box" id="grid-preview" style="display: grid; min-height: 200px; border: 2px dashed var(--color-border); padding: var(--space-4); background: var(--color-surface);">
             <!-- Dynamically generated items -->
          </div>
          <div class="input-group">
            <label>Generated CSS</label>
            <div class="result-box" id="grid-code" style="font-family: monospace; white-space: pre-wrap; background: white;"></div>
            <button class="btn btn--secondary btn--sm result-box__copy" id="grid-copy">Copy CSS</button>
          </div>
        </div>
      </div>
    </div>
  `;

    const colsIn = document.getElementById('grid-cols') as HTMLInputElement;
    const rowsIn = document.getElementById('grid-rows') as HTMLInputElement;
    const gapIn = document.getElementById('grid-gap') as HTMLInputElement;
    const preview = document.getElementById('grid-preview')!;
    const codeRes = document.getElementById('grid-code')!;
    const copyBtn = document.getElementById('grid-copy')!;

    const update = () => {
        const cols = parseInt(colsIn.value) || 1;
        const rows = parseInt(rowsIn.value) || 1;
        const gap = gapIn.value || '0';

        preview.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
        preview.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
        preview.style.gap = `${gap}px`;

        // Regenerate preview items
        preview.innerHTML = '';
        for (let i = 0; i < cols * rows; i++) {
            const item = document.createElement('div');
            item.style.background = 'var(--color-primary)';
            item.style.borderRadius = '8px';
            item.style.minHeight = '50px';
            item.style.display = 'flex';
            item.style.alignItems = 'center';
            item.style.justifyContent = 'center';
            item.style.color = 'white';
            item.textContent = (i + 1).toString();
            preview.appendChild(item);
        }

        const css = `.container {
  display: grid;
  grid-template-columns: repeat(${cols}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  gap: ${gap}px;
}`;
        codeRes.textContent = css;
    };

    [colsIn, rowsIn, gapIn].forEach(inp => inp.addEventListener('input', update));

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeRes.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });

    update();
}
