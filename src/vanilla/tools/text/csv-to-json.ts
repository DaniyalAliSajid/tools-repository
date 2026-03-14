export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="csv-input">CSV Input</label>
        <textarea class="input-field" id="csv-input" rows="10" placeholder="name,age,city\nJohn,30,New York\nJane,25,London"></textarea>
      </div>

      <div class="input-group">
        <label>JSON Result</label>
        <div class="result-box" id="csv-result" style="height: 250px; overflow: auto; background: white;"></div>
        <button class="btn btn--secondary btn--sm result-box__copy" id="csv-copy">Copy JSON</button>
      </div>
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
