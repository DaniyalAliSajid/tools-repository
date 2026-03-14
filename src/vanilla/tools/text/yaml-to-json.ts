export function render(container: HTMLElement): void {
    // Simple YAML to JSON logic (basic key-value pairs)
    // For production, a library like js-yaml would be better, but we'll stick to basic implementation

    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="yaml-input">YAML Input (Basic)</label>
        <textarea class="input-field" id="yaml-input" rows="10" placeholder="name: John Doe\nage: 30\ncity: New York"></textarea>
      </div>

      <div class="input-group">
        <label>JSON Result</label>
        <div class="result-box" id="yaml-result" style="height: 250px; overflow: auto; background: white;"></div>
        <button class="btn btn--secondary btn--sm result-box__copy" id="yaml-copy">Copy JSON</button>
      </div>
    </div>
  `;

    const input = document.getElementById('yaml-input') as HTMLTextAreaElement;
    const result = document.getElementById('yaml-result') as HTMLDivElement;
    const copyBtn = document.getElementById('yaml-copy') as HTMLButtonElement;

    const convert = () => {
        const text = input.value.trim();
        if (!text) {
            result.textContent = '';
            return;
        }

        try {
            const lines = text.split('\n');
            const obj: any = {};
            lines.forEach(line => {
                const parts = line.split(':');
                if (parts.length >= 2) {
                    const key = parts[0].trim();
                    const value = parts.slice(1).join(':').trim();
                    obj[key] = isNaN(Number(value)) ? value : Number(value);
                }
            });
            result.textContent = JSON.stringify(obj, null, 2);
        } catch (e) {
            result.textContent = 'Invalid basic YAML format.';
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
