export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="jf-input">Paste your JSON</label>
        <textarea class="input-field" id="jf-input" rows="10" placeholder='{"key": "value"}'></textarea>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
        <button class="btn btn--primary" id="btn-format">Format / Beautify</button>
        <button class="btn btn--secondary" id="btn-minify">Minify</button>
        <button class="btn btn--secondary" id="btn-validate">Validate Only</button>
        <button class="btn btn--secondary" id="btn-copy">📋 Copy</button>
      </div>
      <div id="jf-status" style="padding:var(--space-3);border-radius:var(--radius-md);font-size:var(--fs-sm);font-weight:var(--fw-medium);display:none;"></div>
      <div class="input-group">
        <label>Output</label>
        <textarea class="input-field" id="jf-output" rows="10" readonly></textarea>
      </div>
    </div>
  `;

    const input = document.getElementById('jf-input') as HTMLTextAreaElement;
    const output = document.getElementById('jf-output') as HTMLTextAreaElement;
    const status = document.getElementById('jf-status')!;

    function showStatus(msg: string, isError: boolean): void {
        status.style.display = 'block';
        status.textContent = msg;
        status.style.background = isError ? 'var(--color-cat-security-bg)' : 'var(--color-cat-developer-bg)';
        status.style.color = isError ? 'var(--color-error)' : 'var(--color-success)';
    }

    document.getElementById('btn-format')!.addEventListener('click', () => {
        try {
            const parsed = JSON.parse(input.value);
            output.value = JSON.stringify(parsed, null, 2);
            showStatus('✅ Valid JSON — Formatted successfully', false);
        } catch (e) {
            output.value = '';
            showStatus(`❌ Invalid JSON: ${(e as Error).message}`, true);
        }
    });

    document.getElementById('btn-minify')!.addEventListener('click', () => {
        try {
            const parsed = JSON.parse(input.value);
            output.value = JSON.stringify(parsed);
            showStatus('✅ Minified successfully', false);
        } catch (e) {
            output.value = '';
            showStatus(`❌ Invalid JSON: ${(e as Error).message}`, true);
        }
    });

    document.getElementById('btn-validate')!.addEventListener('click', () => {
        try {
            JSON.parse(input.value);
            showStatus('✅ Valid JSON!', false);
        } catch (e) {
            showStatus(`❌ Invalid JSON: ${(e as Error).message}`, true);
        }
    });

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText(output.value);
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅ Copied!';
        setTimeout(() => (btn.textContent = '📋 Copy'), 1500);
    });
}
