export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="url-input">Input</label>
        <textarea class="input-field" id="url-input" rows="4" placeholder="Enter URL or encoded string..."></textarea>
      </div>
      <div style="display:flex;gap:var(--space-2);">
        <button class="btn btn--primary" id="btn-encode" style="flex:1;">Encode →</button>
        <button class="btn btn--primary" id="btn-decode" style="flex:1;">← Decode</button>
      </div>
      <div class="input-group">
        <label>Output</label>
        <textarea class="input-field" id="url-output" rows="4" readonly></textarea>
      </div>
      <button class="btn btn--secondary btn--block" id="btn-copy">📋 Copy Output</button>
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
