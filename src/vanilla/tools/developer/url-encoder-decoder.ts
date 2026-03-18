export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="url-input">Input Data</label>
        <textarea class="input-field" id="url-input" rows="10" placeholder="Enter URL or encoded string..." style="resize: vertical;"></textarea>
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
        <textarea class="result-box" id="url-output" rows="10" readonly style="width: 100%; height: 100%; min-height: 280px; resize: none; border: none; outline: none;"></textarea>
      </div>
    </div>
  `;

    const input = document.getElementById('url-input') as HTMLTextAreaElement;
    const output = document.getElementById('url-output') as HTMLTextAreaElement;

    document.getElementById('btn-encode')!.addEventListener('click', () => {
        output.value = encodeURIComponent(input.value);
    });

    document.getElementById('btn-decode')!.addEventListener('click', () => {
        try { output.value = decodeURIComponent(input.value); }
        catch { output.value = 'Error: Invalid encoded string.'; }
    });

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText(output.value);
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅ Copied!';
        setTimeout(() => (btn.textContent = '📋 Copy Output'), 1500);
    });
}
