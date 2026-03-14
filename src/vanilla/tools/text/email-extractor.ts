export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="email-input">Paste Text to Extract Emails</label>
        <textarea class="input-field" id="email-input" rows="8" placeholder="Contact us at info@example.com or support@test.org..."></textarea>
      </div>

      <div class="input-group">
        <label>Extracted Emails (<span id="email-count">0</span>)</label>
        <div class="result-box" id="email-result" style="height: 150px; overflow: auto; background: white;"></div>
        <button class="btn btn--secondary btn--sm result-box__copy" id="email-copy">Copy All</button>
      </div>
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
