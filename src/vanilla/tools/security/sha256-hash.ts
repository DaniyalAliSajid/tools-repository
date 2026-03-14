export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="sha-input">Input Text</label>
        <textarea class="input-field" id="sha-input" rows="6" placeholder="Enter text to generate SHA-256 hash..."></textarea>
      </div>

      <div class="input-group">
        <label>SHA-256 Hash Result</label>
        <div class="result-box" id="sha-result" style="word-break: break-all; font-family: monospace;"></div>
        <button class="btn btn--secondary btn--sm result-box__copy" id="sha-copy">Copy</button>
      </div>
    </div>
  `;

    const input = document.getElementById('sha-input') as HTMLTextAreaElement;
    const result = document.getElementById('sha-result') as HTMLDivElement;
    const copyBtn = document.getElementById('sha-copy') as HTMLButtonElement;

    const update = async () => {
        const text = input.value;
        if (!text) {
            result.textContent = '';
            return;
        }

        const msgBuffer = new TextEncoder().encode(text);
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

        result.textContent = hashHex;
    };

    input.addEventListener('input', update);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(result.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
}
