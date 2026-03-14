export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="binary-input">Text or Binary</label>
        <textarea class="input-field" id="binary-input" rows="6" placeholder="Enter text to convert to binary, or binary to convert to text..."></textarea>
      </div>

      <div class="toggle-group" id="binary-mode">
        <button class="toggle-group__btn active" data-mode="to-binary">Text to Binary</button>
        <button class="toggle-group__btn" data-mode="to-text">Binary to Text</button>
      </div>

      <div class="input-group">
        <label>Result</label>
        <div class="result-box" id="binary-result"></div>
        <button class="btn btn--secondary btn--sm result-box__copy" id="binary-copy">Copy</button>
      </div>
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
