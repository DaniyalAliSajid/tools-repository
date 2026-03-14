export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="tr-input">Enter your text</label>
        <textarea class="input-field" id="tr-input" rows="6" placeholder="Type text to reverse..."></textarea>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
        <button class="btn btn--primary" id="btn-reverse-chars">Reverse Characters</button>
        <button class="btn btn--primary" id="btn-reverse-words">Reverse Words</button>
        <button class="btn btn--primary" id="btn-reverse-lines">Reverse Lines</button>
        <button class="btn btn--secondary" id="btn-copy">📋 Copy</button>
      </div>
      <div class="input-group">
        <label>Result</label>
        <textarea class="input-field" id="tr-output" rows="6" readonly></textarea>
      </div>
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
