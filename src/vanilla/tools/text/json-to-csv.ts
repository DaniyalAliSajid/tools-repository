export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="json-csv-input">Source JSON (Array)</label>
        <textarea class="input-field" id="json-csv-input" rows="18" placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]' style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem;"></textarea>
      </div>
    </div>
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Generated CSV</h3>
        <button class="btn btn--secondary btn--sm" id="json-csv-copy">📋 Copy CSV</button>
      </div>
      <div class="result-box" id="json-csv-result" style="padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: var(--fs-sm); line-height: 1.5; height: calc(100% - 48px); min-height: 400px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap;"></div>
    </div>
  `;

    const input = document.getElementById('json-csv-input') as HTMLTextAreaElement;
    const result = document.getElementById('json-csv-result') as HTMLDivElement;
    const copyBtn = document.getElementById('json-csv-copy') as HTMLButtonElement;

    const convert = () => {
        const text = input.value.trim();
        if (!text) {
            result.textContent = '';
            return;
        }

        try {
            const data = JSON.parse(text);
            if (!Array.isArray(data) || data.length === 0) {
                result.textContent = 'Please provide an array of objects.';
                return;
            }

            const headers = Object.keys(data[0]);
            const csvRows = [
                headers.join(','),
                ...data.map(row => headers.map(h => row[h]).join(','))
            ];

            result.textContent = csvRows.join('\n');
        } catch (e) {
            result.textContent = 'Invalid JSON format.';
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
