export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="csv-input">Source CSV</label>
        <textarea class="input-field" id="csv-input" rows="18" placeholder="name,age,city\nJohn,30,New York\nJane,25,London" style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem;"></textarea>
      </div>
    </div>
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Generated JSON</h3>
        <button class="btn btn--secondary btn--sm" id="csv-copy">📋 Copy Code</button>
      </div>
      <div class="result-box" id="csv-result" style="padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: var(--fs-sm); line-height: 1.5; height: calc(100% - 48px); min-height: 400px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap;"></div>
    </div>
  `;

    const input = document.getElementById('csv-input') as HTMLTextAreaElement;
    const result = document.getElementById('csv-result') as HTMLDivElement;
    const copyBtn = document.getElementById('csv-copy') as HTMLButtonElement;

    const convert = () => {
        const text = input.value.trim();
        if (!text) {
            result.textContent = '';
            return;
        }

        try {
            const lines = text.split('\n');
            const headers = lines[0].split(',').map(h => h.trim());
            const data = lines.slice(1).map(line => {
                const values = line.split(',');
                const obj: any = {};
                headers.forEach((h, i) => {
                    obj[h] = values[i]?.trim();
                });
                return obj;
            });
            result.textContent = JSON.stringify(data, null, 2);
        } catch (e) {
            result.textContent = 'Invalid CSV format.';
        }
    };

    input.addEventListener('input', convert);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(result.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
}
