export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="email-input">Source Text</label>
        <textarea class="input-field" id="email-input" rows="18" placeholder="Paste web content, documents, or raw text here to find all buried email addresses..." style="resize: vertical; font-size: 1rem;"></textarea>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> This tool uses deep regex scanning to find emails hidden in messy text. Duplicates are automatically removed.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Emails Found (<span id="email-count" style="color: var(--color-primary); font-weight: 700;">0</span>)</h3>
        <button class="btn btn--secondary btn--sm" id="email-copy">📋 Copy All</button>
      </div>
      <div class="result-box" id="email-result" style="padding: var(--space-6); font-family: 'JetBrains Mono'; font-size: 0.9375rem; line-height: 1.6; height: calc(100% - 48px); min-height: 520px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap; background: var(--color-surface-hover);"></div>
    </div>
  `;

    const input = document.getElementById('email-input') as HTMLTextAreaElement;
    const countEl = document.getElementById('email-count')!;
    const result = document.getElementById('email-result') as HTMLDivElement;
    const copyBtn = document.getElementById('email-copy') as HTMLButtonElement;

    const extract = () => {
        const text = input.value;
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
        const matches = text.match(emailRegex) || [];
        const uniqueEmails = Array.from(new Set(matches));

        countEl.textContent = uniqueEmails.length.toString();
        result.textContent = uniqueEmails.join('\n');
    };

    input.addEventListener('input', extract);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(result.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
}
