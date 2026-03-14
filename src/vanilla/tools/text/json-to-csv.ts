export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="json-csv-input">JSON Input (Array of Objects)</label>
        <textarea class="input-field" id="json-csv-input" rows="10" placeholder='[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]'></textarea>
      </div>

      <div class="input-group">
        <label>CSV Result</label>
        <div class="result-box" id="json-csv-result" style="height: 250px; overflow: auto; background: white;"></div>
        <button class="btn btn--secondary btn--sm result-box__copy" id="json-csv-copy">Copy CSV</button>
      </div>
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
