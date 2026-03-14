export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="section-gap">
          <div class="tool-grid-2">
            <div class="input-group">
              <label for="table-cols">Columns</label>
              <input type="number" id="table-cols" class="input-field" value="3" min="1" max="10">
            </div>
            <div class="input-group">
              <label for="table-rows">Rows</label>
              <input type="number" id="table-rows" class="input-field" value="3" min="1" max="50">
            </div>
          </div>
          <div class="input-group">
            <label for="table-border">Border Width (px)</label>
            <input type="number" id="table-border" class="input-field" value="1">
          </div>
          <div class="input-group">
            <label>Styles</label>
            <div style="display: flex; gap: var(--space-4);">
               <label><input type="checkbox" id="table-header" checked> Header Row</label>
               <label><input type="checkbox" id="table-stripes"> Striped Rows</label>
            </div>
          </div>
        </div>

        <div class="section-gap">
          <div class="input-group">
            <label>HTML Output</label>
            <div class="result-box" id="table-code" style="font-family: monospace; white-space: pre-wrap; background: white; height: 320px; overflow: auto;"></div>
            <button class="btn btn--secondary btn--sm result-box__copy" id="table-copy">Copy HTML</button>
          </div>
        </div>
      </div>
    </div>
  `;

    const colsIn = document.getElementById('table-cols') as HTMLInputElement;
    const rowsIn = document.getElementById('table-rows') as HTMLInputElement;
    const borderIn = document.getElementById('table-border') as HTMLInputElement;
    const headerIn = document.getElementById('table-header') as HTMLInputElement;
    const stripesIn = document.getElementById('table-stripes') as HTMLInputElement;

    const codeRes = document.getElementById('table-code')!;
    const copyBtn = document.getElementById('table-copy')!;

    const update = () => {
        const cols = parseInt(colsIn.value) || 1;
        const rows = parseInt(rowsIn.value) || 1;
        const border = borderIn.value || '1';
        const hasHeader = headerIn.checked;
        const isStriped = stripesIn.checked;

        let html = `<table border="${border}" style="width: 100%; border-collapse: collapse;">\n`;

        if (hasHeader) {
            html += `  <thead>\n    <tr style="background-color: #f3f4f6;">\n`;
            for (let j = 0; j < cols; j++) {
                html += `      <th style="padding: 8px; border: ${border}px solid #ccc;">Header ${j + 1}</th>\n`;
            }
            html += `    </tr>\n  </thead>\n`;
        }

        html += `  <tbody>\n`;
        for (let i = 0; i < rows; i++) {
            const bg = (isStriped && i % 2 === 0) ? ` style="background-color: #f9fafb;"` : '';
            html += `    <tr${bg}>\n`;
            for (let j = 0; j < cols; j++) {
                html += `      <td style="padding: 8px; border: ${border}px solid #ccc;">Data</td>\n`;
            }
            html += `    </tr>\n`;
        }
        html += `  </tbody>\n</table>`;

        codeRes.textContent = html;
    };

    [colsIn, rowsIn, borderIn, headerIn, stripesIn].forEach(inp => inp.addEventListener('input', update));

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeRes.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });

    update();
}
