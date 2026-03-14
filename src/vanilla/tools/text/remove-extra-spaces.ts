export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="res-input">Enter your text</label>
        <textarea class="input-field" id="res-input" rows="6" placeholder="Paste text with extra spaces..."></textarea>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
        <button class="btn btn--primary" id="btn-clean">Remove Extra Spaces</button>
        <button class="btn btn--secondary" id="btn-trim-lines">Trim Each Line</button>
        <button class="btn btn--secondary" id="btn-remove-blank">Remove Blank Lines</button>
        <button class="btn btn--secondary" id="btn-copy">📋 Copy</button>
      </div>
      <div class="input-group">
        <label>Result</label>
        <textarea class="input-field" id="res-output" rows="6" readonly></textarea>
      </div>
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
