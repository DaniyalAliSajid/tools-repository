export function render(container: HTMLElement): void {
    // Simple YAML to JSON logic (basic key-value pairs)
    // For production, a library like js-yaml would be better, but we'll stick to basic implementation

    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="yaml-input">Source YAML</label>
        <textarea class="input-field" id="yaml-input" rows="18" placeholder="name: John Doe\nage: 30\ncity: New York" style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem;"></textarea>
      </div>
    </div>
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Generated JSON</h3>
        <button class="btn btn--secondary btn--sm" id="yaml-copy">📋 Copy Code</button>
      </div>
      <div class="result-box" id="yaml-result" style="padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: var(--fs-sm); line-height: 1.5; height: calc(100% - 48px); min-height: 480px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap;"></div>
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
