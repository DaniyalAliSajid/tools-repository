export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="tr-input">Source Text</label>
        <textarea class="input-field" id="tr-input" rows="18" placeholder="Type text to reverse..." style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem;"></textarea>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Reverse Mode</h4>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:var(--space-2)">
          <button class="btn btn--primary" id="btn-reverse-chars">🔀 Characters</button>
          <button class="btn btn--primary" id="btn-reverse-words">📝 Words</button>
          <button class="btn btn--primary" id="btn-reverse-lines">📑 Lines</button>
          <button class="btn btn--secondary" id="btn-copy">📋 Copy Result</button>
        </div>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Reversed Result</h3>
      </div>
      <textarea class="input-field" id="tr-output" rows="22" readonly style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem; background: var(--color-surface-hover); border-color: var(--color-border);"></textarea>
    </div>
  `;

    const input = document.getElementById('tr-input') as HTMLTextAreaElement;
    const output = document.getElementById('tr-output') as HTMLTextAreaElement;

    document.getElementById('btn-reverse-chars')!.addEventListener('click', () => {
        output.value = [...input.value].reverse().join('');
    });

    document.getElementById('btn-reverse-words')!.addEventListener('click', () => {
        output.value = input.value.split(/\s+/).reverse().join(' ');
    });

    document.getElementById('btn-reverse-lines')!.addEventListener('click', () => {
        output.value = input.value.split('\n').reverse().join('\n');
    });

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText(output.value);
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅ Copied!';
        setTimeout(() => (btn.textContent = '📋 Copy'), 1500);
    });
}
