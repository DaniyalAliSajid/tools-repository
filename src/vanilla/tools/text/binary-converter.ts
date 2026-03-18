export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Conversion Mode</h4>
        <div class="toggle-group" id="binary-mode" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-1); background: var(--color-surface-hover); padding: 4px; border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
          <button class="toggle-group__btn active" data-mode="to-binary" style="padding: 10px; border-radius: var(--radius-md); font-weight: 500;">To Binary</button>
          <button class="toggle-group__btn" data-mode="to-text" style="padding: 10px; border-radius: var(--radius-md); font-weight: 500;">To Text</button>
        </div>
      </div>
      <div class="input-group">
        <label for="binary-input">Input Data</label>
        <textarea class="input-field" id="binary-input" rows="12" placeholder="Enter text to convert to binary, or binary to convert to text..." style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem;"></textarea>
      </div>
    </div>
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Result</h3>
        <button class="btn btn--secondary btn--sm" id="binary-copy">📋 Copy</button>
      </div>
      <div class="result-box" id="binary-result" style="padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: var(--fs-sm); line-height: 1.5; height: calc(100% - 48px); min-height: 400px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap;"></div>
    </div>
  `;

    const input = document.getElementById('binary-input') as HTMLTextAreaElement;
    const result = document.getElementById('binary-result') as HTMLDivElement;
    const modeBtns = document.querySelectorAll('#binary-mode .toggle-group__btn');
    const copyBtn = document.getElementById('binary-copy') as HTMLButtonElement;

    let mode = 'to-binary';

    const update = () => {
        const value = input.value.trim();
        if (!value) {
            result.textContent = '';
            return;
        }

        try {
            if (mode === 'to-binary') {
                result.textContent = value.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
            } else {
                const binaryArray = value.split(/\s+/);
                result.textContent = binaryArray.map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
            }
        } catch (e) {
            result.textContent = 'Invalid input for selected mode.';
        }
    };

    input.addEventListener('input', update);

    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            mode = (btn as HTMLElement).dataset.mode!;
            update();
        });
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(result.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
}
