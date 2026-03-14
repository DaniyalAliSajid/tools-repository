export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="rsg-length">String Length: <span id="rsg-len-val">16</span></label>
        <input type="range" id="rsg-length" min="1" max="128" value="16">
      </div>

      <div class="checkbox-group">
        <label class="checkbox-label">
          <input type="checkbox" id="rsg-upper" checked> Uppercase (A-Z)
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="rsg-lower" checked> Lowercase (a-z)
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="rsg-numbers" checked> Numbers (0-9)
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="rsg-symbols"> Symbols (!@#$%...)
        </label>
      </div>

      <div class="input-group">
        <label>Generated String</label>
        <div class="result-box" id="rsg-result" style="word-break: break-all; font-family: monospace;"></div>
        <div style="display: flex; gap: var(--space-2); margin-top: var(--space-2);">
          <button class="btn btn--primary btn--sm" id="rsg-regen">Regenerate</button>
          <button class="btn btn--secondary btn--sm" id="rsg-copy">Copy</button>
        </div>
      </div>
    </div>
  `;

    const lengthInput = document.getElementById('rsg-length') as HTMLInputElement;
    const lengthVal = document.getElementById('rsg-len-val')!;
    const upperCheck = document.getElementById('rsg-upper') as HTMLInputElement;
    const lowerCheck = document.getElementById('rsg-lower') as HTMLInputElement;
    const numberCheck = document.getElementById('rsg-numbers') as HTMLInputElement;
    const symbolCheck = document.getElementById('rsg-symbols') as HTMLInputElement;
    const resultDiv = document.getElementById('rsg-result')!;
    const regenBtn = document.getElementById('rsg-regen')!;
    const copyBtn = document.getElementById('rsg-copy')!;

    const generate = () => {
        const length = parseInt(lengthInput.value);
        lengthVal.textContent = length.toString();

        let charset = "";
        if (upperCheck.checked) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (lowerCheck.checked) charset += "abcdefghijklmnopqrstuvwxyz";
        if (numberCheck.checked) charset += "0123456789";
        if (symbolCheck.checked) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";

        if (!charset) {
            resultDiv.textContent = "(Select at least one option)";
            return;
        }

        let result = "";
        for (let i = 0; i < length; i++) {
            result += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        resultDiv.textContent = result;
    };

    [lengthInput, upperCheck, lowerCheck, numberCheck, symbolCheck].forEach(inp => inp.addEventListener('input', generate));
    regenBtn.addEventListener('click', generate);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(resultDiv.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });

    generate();
}
