export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="b64-input">Input Data</label>
        <textarea class="input-field" id="b64-input" rows="10" placeholder="Enter text to encode or Base64 to decode..." style="resize: vertical;"></textarea>
      </div>
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:var(--space-2); margin-top: var(--space-4);">
        <button class="btn btn--primary" id="btn-encode">Encode →</button>
        <button class="btn btn--primary" id="btn-decode">← Decode</button>
      </div>
    </div>
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Output</h3>
        <button class="btn btn--secondary btn--sm" id="btn-copy">📋 Copy Result</button>
      </div>
      <div class="input-group" style="height: calc(100% - 48px); margin-bottom: 0;">
        <textarea class="result-box" id="b64-output" rows="10" readonly style="width: 100%; height: 100%; min-height: 280px; resize: none; border: none; outline: none;"></textarea>
      </div>
    </div>
  `;

    const input = document.getElementById('b64-input') as HTMLTextAreaElement;
    const output = document.getElementById('b64-output') as HTMLTextAreaElement;

    document.getElementById('btn-encode')!.addEventListener('click', () => {
        try {
            output.value = btoa(unescape(encodeURIComponent(input.value)));
        } catch {
            output.value = 'Error: Could not encode input.';
        }
    });

    document.getElementById('btn-decode')!.addEventListener('click', () => {
        try {
            output.value = decodeURIComponent(escape(atob(input.value.trim())));
        } catch {
            output.value = 'Error: Invalid Base64 input.';
        }
    });

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText(output.value);
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅ Copied!';
        setTimeout(() => (btn.textContent = '📋 Copy Output'), 1500);
    });
}
