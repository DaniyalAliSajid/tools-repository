export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="jts-json">JSON Input</label>
          <textarea id="jts-json" class="input-field" rows="15" placeholder='{"id": 1, "name": "Test", "active": true}'></textarea>
        </div>

        <div class="input-group">
          <label>TypeScript Interface</label>
          <div class="result-box" id="jts-code" style="font-family: monospace; white-space: pre-wrap; background: white; height: 320px; overflow: auto;"></div>
          <button class="btn btn--secondary btn--sm result-box__copy" id="jts-copy">Copy Interface</button>
        </div>
      </div>
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
