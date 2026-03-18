export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="rot13-input">Source Text</label>
        <textarea class="input-field" id="rot13-input" rows="18" placeholder="Type or paste text to obfuscate..." style="resize: vertical; font-size: 1rem;"></textarea>
      </div>
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Note:</strong> ROT13 is a simple substitution cipher that replaces a letter with the 13th letter after it in the alphabet.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">ROT13 Result</h3>
        <button class="btn btn--secondary btn--sm" id="rot13-copy">📋 Copy</button>
      </div>
      <div class="result-box" id="rot13-result" style="padding: var(--space-6); font-family: 'JetBrains Mono'; font-size: 1rem; line-height: 1.6; height: calc(100% - 48px); min-height: 500px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap; background: var(--color-surface-hover);"></div>
    </div>
  `;

    const input = document.getElementById('rot13-input') as HTMLTextAreaElement;
    const result = document.getElementById('rot13-result') as HTMLDivElement;
    const copyBtn = document.getElementById('rot13-copy') as HTMLButtonElement;

    const rot13 = (str: string) => {
        return str.replace(/[a-zA-Z]/g, (c: string) => {
            const charCode = c.charCodeAt(0);
            const isUpper = charCode <= 90;
            const start = isUpper ? 65 : 97;
            return String.fromCharCode(((charCode - start + 13) % 26) + start);
        });
    };

    input.addEventListener('input', () => {
        result.textContent = rot13(input.value);
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(result.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
}
