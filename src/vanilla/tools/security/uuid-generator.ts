export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <button class="btn btn--primary btn--block" id="btn-generate" style="font-size:var(--fs-lg);padding:var(--space-4);">🆔 Generate UUID</button>
      <div class="result-box" style="text-align:center;font-size:var(--fs-lg);font-family:'Courier New',monospace;letter-spacing:.05em;">
        <span id="uuid-output" style="flex:1;user-select:all;">Click the button to generate a UUID</span>
        <button class="btn btn--sm btn--primary result-box__copy" id="btn-copy">📋 Copy</button>
      </div>
      <div class="input-group">
        <label>Bulk Generate</label>
        <div style="display:flex;gap:var(--space-2);align-items:end;">
          <input type="number" class="input-field" id="uuid-count" value="5" min="1" max="100" style="max-width:100px;" />
          <button class="btn btn--secondary" id="btn-bulk">Generate Bulk</button>
        </div>
      </div>
      <textarea class="input-field" id="uuid-bulk" rows="8" readonly style="display:none;"></textarea>
      <button class="btn btn--secondary btn--block" id="btn-copy-bulk" style="display:none;">📋 Copy All</button>
    </div>
  `;

    document.getElementById('btn-generate')!.addEventListener('click', () => {
        document.getElementById('uuid-output')!.textContent = generateUUID();
    });

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText(document.getElementById('uuid-output')!.textContent || '');
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅';
        setTimeout(() => (btn.textContent = '📋 Copy'), 1500);
    });

    document.getElementById('btn-bulk')!.addEventListener('click', () => {
        const count = Math.min(parseInt((document.getElementById('uuid-count') as HTMLInputElement).value) || 5, 100);
        const uuids = Array.from({ length: count }, () => generateUUID());
        const textarea = document.getElementById('uuid-bulk') as HTMLTextAreaElement;
        textarea.value = uuids.join('\n');
        textarea.style.display = 'block';
        document.getElementById('btn-copy-bulk')!.style.display = 'block';
    });

    document.getElementById('btn-copy-bulk')!.addEventListener('click', () => {
        navigator.clipboard.writeText((document.getElementById('uuid-bulk') as HTMLTextAreaElement).value);
        const btn = document.getElementById('btn-copy-bulk')!;
        btn.textContent = '✅ Copied!';
        setTimeout(() => (btn.textContent = '📋 Copy All'), 1500);
    });

    // Auto-generate one on load
    document.getElementById('uuid-output')!.textContent = generateUUID();
}

function generateUUID(): string {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // Fallback v4 UUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
