export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="b64-input">Input Text</label>
        <textarea class="input-field" id="b64-input" rows="5" placeholder="Enter text to encode or Base64 to decode..."></textarea>
      </div>
      <div style="display:flex;gap:var(--space-2);">
        <button class="btn btn--primary" id="btn-encode" style="flex:1;">Encode →</button>
        <button class="btn btn--primary" id="btn-decode" style="flex:1;">← Decode</button>
      </div>
      <div class="input-group">
        <label>Output</label>
        <textarea class="input-field" id="b64-output" rows="5" readonly></textarea>
      </div>
      <button class="btn btn--secondary btn--block" id="btn-copy">📋 Copy Output</button>
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
