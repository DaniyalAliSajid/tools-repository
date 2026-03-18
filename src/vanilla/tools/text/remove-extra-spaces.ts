export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="res-input">Source Text</label>
        <textarea class="input-field" id="res-input" rows="18" placeholder="Paste text with extra spaces..." style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem;"></textarea>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Quick Actions</h4>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:var(--space-2)">
          <button class="btn btn--primary" id="btn-clean">✨ Clean Spaces</button>
          <button class="btn btn--secondary" id="btn-trim-lines">Trim Lines</button>
          <button class="btn btn--secondary" id="btn-remove-blank">Remove Blanks</button>
          <button class="btn btn--secondary" id="btn-copy">📋 Copy Result</button>
        </div>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Cleaned Result</h3>
      </div>
      <textarea class="input-field" id="res-output" rows="22" readonly style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem; background: var(--color-surface-hover); border-color: var(--color-border);"></textarea>
    </div>
  `;

    const input = document.getElementById('res-input') as HTMLTextAreaElement;
    const output = document.getElementById('res-output') as HTMLTextAreaElement;

    document.getElementById('btn-clean')!.addEventListener('click', () => {
        output.value = input.value.replace(/[^\S\n]+/g, ' ').replace(/\n\s*\n/g, '\n\n').trim();
    });

    document.getElementById('btn-trim-lines')!.addEventListener('click', () => {
        output.value = input.value.split('\n').map((l) => l.trim()).join('\n');
    });

    document.getElementById('btn-remove-blank')!.addEventListener('click', () => {
        output.value = input.value.split('\n').filter((l) => l.trim()).join('\n');
    });

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText(output.value);
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅ Copied!';
        setTimeout(() => (btn.textContent = '📋 Copy'), 1500);
    });
}
