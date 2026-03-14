export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="rot13-input">ROT13 Input/Output</label>
        <textarea class="input-field" id="rot13-input" rows="8" placeholder="Type or paste text..."></textarea>
      </div>

      <div class="input-group">
        <label>Result</label>
        <div class="result-box" id="rot13-result" style="height: 150px; overflow: auto; background: white;"></div>
        <button class="btn btn--secondary btn--sm result-box__copy" id="rot13-copy">Copy Result</button>
      </div>
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
