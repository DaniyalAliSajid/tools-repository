export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="jts-json">Source JSON</label>
        <textarea id="jts-json" class="input-field" rows="18" placeholder='{"id": 1, "name": "Antigravity", "active": true}' style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem;"></textarea>
      </div>
    </div>
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Generated Interfaces</h3>
        <button class="btn btn--secondary btn--sm" id="jts-copy">📋 Copy Code</button>
      </div>
      <div class="result-box" id="jts-code" style="padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: var(--fs-sm); line-height: 1.5; height: calc(100% - 48px); min-height: 400px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap;"></div>
    </div>
  `;

    const jsonIn = document.getElementById('jts-json') as HTMLTextAreaElement;
    const codeRes = document.getElementById('jts-code')!;
    const copyBtn = document.getElementById('jts-copy')!;

    const toTS = (obj: any, interfaceName: string = 'RootObject'): string => {
        let result = `interface ${interfaceName} {\n`;
        for (const key in obj) {
            const value = obj[key];
            const type = typeof value;
            if (value === null) result += `  ${key}: any;\n`;
            else if (Array.isArray(value)) {
                const itemType = value.length > 0 ? typeof value[0] : 'any';
                result += `  ${key}: ${itemType}[];\n`;
            } else if (type === 'object') {
                const subName = key.charAt(0).toUpperCase() + key.slice(1);
                result += `  ${key}: ${subName};\n`;
                // Note: This simple implementation doesn't handle nested interface generation in a single string well
                // but for a quick tool it works for shallow objects.
            } else {
                result += `  ${key}: ${type};\n`;
            }
        }
        result += `}`;
        return result;
    };

    const update = () => {
        try {
            const obj = JSON.parse(jsonIn.value);
            codeRes.textContent = toTS(obj);
        } catch (e) {
            codeRes.textContent = 'Invalid JSON';
        }
    };

    jsonIn.addEventListener('input', update);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeRes.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
}
