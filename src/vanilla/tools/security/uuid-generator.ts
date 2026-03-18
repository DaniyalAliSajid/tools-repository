export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Single Identifier</h4>
        <div class="result-box" style="text-align:center; padding: var(--space-6); background: var(--color-surface-hover); border: 2px solid var(--color-primary-border); margin-bottom: var(--space-4);">
          <div id="uuid-output" style="font-family: 'JetBrains Mono'; font-size: clamp(0.75rem, 4vw, 1.125rem); font-weight: 700; color: var(--color-primary); word-break: break-all;">Generating...</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2);">
          <button class="btn btn--primary btn--block" id="btn-generate">⚡ New UUID</button>
          <button class="btn btn--secondary btn--block" id="btn-copy">📋 Copy</button>
        </div>
      </div>

      <div class="p-card" style="margin-top: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Bulk Generation</h4>
        <div style="display: flex; gap: var(--space-2); align-items: flex-end; margin-bottom: var(--space-4);">
          <div class="input-group" style="flex: 1;">
            <label for="uuid-count">Quantity</label>
            <input type="number" class="input-field" id="uuid-count" value="10" min="1" max="100" style="padding: var(--space-3);" />
          </div>
          <button class="btn btn--secondary" id="btn-bulk" style="height: 48px; flex: 1.5;">✨ Multiple UUIDs</button>
        </div>
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> UUID v4 is randomly generated using cryptographically strong pseudo-random numbers.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Bulk Output</h3>
        <button class="btn btn--secondary btn--sm" id="btn-copy-bulk" style="display:none;">📋 Copy All</button>
      </div>
      <div class="input-group" style="height: calc(100% - 48px); margin-bottom: 0;">
        <textarea class="result-box" id="uuid-bulk" rows="18" readonly placeholder="Bulk results will appear here..." style="width: 100%; height: 100%; min-height: 500px; resize: none; border: none; outline: none; font-family: 'JetBrains Mono'; font-size: 0.875rem; background: var(--color-surface-hover); padding: var(--space-4); display: none;"></textarea>
      </div>
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
