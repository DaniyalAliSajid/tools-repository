export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">String parameters</h4>
        <div class="slider-group">
          <div class="slider-group__header" style="margin-bottom: var(--space-2);">
            <span class="slider-group__label" style="font-weight: 600;">Length</span>
            <span class="slider-group__value" id="rsg-len-val" style="color: var(--color-primary); font-weight: 800;">16</span>
          </div>
          <input type="range" id="rsg-length" min="1" max="128" value="16" style="width: 100%; cursor: pointer; accent-color: var(--color-primary);">
        </div>

        <div class="checkbox-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3); margin-top: var(--space-6);">
          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="rsg-upper" checked> <span>Uppercase</span>
          </label>
          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="rsg-lower" checked> <span>Lowercase</span>
          </label>
          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="rsg-numbers" checked> <span>Numbers</span>
          </label>
          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="rsg-symbols"> <span>Symbols</span>
          </label>
        </div>
      </div>
      
      <button class="btn btn--primary btn--block btn--lg" id="rsg-regen" style="margin-top: var(--space-4);">⚡ Generate Random String</button>
    </div>

    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Generated Result</h3>
        <button class="btn btn--secondary btn--sm" id="rsg-copy">📋 Copy</button>
      </div>
      
      <div class="result-box" style="padding: var(--space-10); display: flex; align-items: center; justify-content: center; background: var(--color-surface-hover); min-height: 250px;">
        <div id="rsg-result" style="word-break: break-all; font-family: 'JetBrains Mono'; font-size: 1.5rem; font-weight: 700; color: var(--color-primary); text-align: center;"></div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-6);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Utility:</strong> Perfect for generating secure tokens, keys, or random identifiers for development.
        </p>
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
