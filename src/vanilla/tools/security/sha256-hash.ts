export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group" style="height: 100%; display: flex; flex-direction: column;">
        <label for="sha-input">Source Text</label>
        <textarea class="input-field" id="sha-input" rows="15" placeholder="Enter text to generate SHA-256 hash..." style="flex: 1; resize: vertical; padding: var(--space-4); font-size: 1rem;"></textarea>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> SHA-256 is a member of the SHA-2 family and is widely used for secure hashing and digital signatures.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Secure Hash Result</h3>
        <button class="btn btn--secondary btn--sm" id="sha-copy">📋 Copy</button>
      </div>
      <div class="result-box" style="padding: var(--space-10); display: flex; align-items: center; justify-content: center; background: var(--color-surface-hover); min-height: 200px;">
        <div id="sha-result" style="word-break: break-all; font-family: 'JetBrains Mono'; font-size: 1.25rem; font-weight: 700; color: var(--color-primary); text-align: center; max-width: 100%;">—</div>
      </div>
      <div style="margin-top: var(--space-6); text-align: center; opacity: 0.05; font-size: 5rem;">🔑</div>
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
