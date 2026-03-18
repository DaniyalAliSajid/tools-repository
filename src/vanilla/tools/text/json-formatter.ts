export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group" style="height: 100%; display: flex; flex-direction: column;">
        <label for="jf-input">Source JSON</label>
        <textarea class="input-field" id="jf-input" rows="18" placeholder='{"key": "value"}' style="flex: 1; font-family: 'JetBrains Mono'; resize: vertical; font-size: 0.875rem;"></textarea>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">JSON Actions</h4>
        <div style="display:grid; grid-template-columns: repeat(3, 1fr); gap:var(--space-2);">
          <button class="btn btn--primary" id="btn-format">Prettify</button>
          <button class="btn btn--secondary" id="btn-minify">Minify</button>
          <button class="btn btn--secondary" id="btn-validate">Validate</button>
        </div>
        <div id="jf-status" style="margin-top: var(--space-4); padding:var(--space-3); border-radius:var(--radius-md); font-size:var(--fs-xs); font-weight:var(--fw-medium); display:none; border: 1px solid transparent;"></div>
      </div>
    </div>

    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Formatted Output</h3>
        <button class="btn btn--secondary btn--sm" id="btn-copy">📋 Copy</button>
      </div>
      <div class="input-group" style="height: calc(100% - 48px); margin-bottom: 0;">
        <textarea class="result-box" id="jf-output" rows="18" readonly placeholder="Parsed output will appear here..." style="width: 100%; height: 100%; min-height: 500px; resize: none; border: none; outline: none; font-family: 'JetBrains Mono'; font-size: 0.875rem; background: var(--color-surface-hover);"></textarea>
      </div>
    </div>
  `;

    const input = document.getElementById('jf-input') as HTMLTextAreaElement;
    const output = document.getElementById('jf-output') as HTMLTextAreaElement;
    const status = document.getElementById('jf-status')!;

    function showStatus(msg: string, isError: boolean): void {
        status.style.display = 'block';
        status.textContent = msg;
        status.style.background = isError ? 'var(--color-error-light)' : 'var(--color-primary-light)';
        status.style.color = isError ? 'var(--color-error)' : 'var(--color-primary)';
        status.style.borderColor = isError ? 'var(--color-error-border)' : 'var(--color-primary-border)';
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
