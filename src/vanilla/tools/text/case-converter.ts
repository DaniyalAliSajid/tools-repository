export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="cc-input">Enter your text</label>
        <textarea class="input-field" id="cc-input" rows="6" placeholder="Type your text here..."></textarea>
      </div>
      <div style="display:flex;flex-wrap:wrap;gap:var(--space-2)">
        <button class="btn btn--primary" id="btn-upper">UPPERCASE</button>
        <button class="btn btn--primary" id="btn-lower">lowercase</button>
        <button class="btn btn--primary" id="btn-title">Title Case</button>
        <button class="btn btn--primary" id="btn-sentence">Sentence case</button>
        <button class="btn btn--primary" id="btn-toggle">tOGGLE cASE</button>
        <button class="btn btn--secondary" id="btn-copy">📋 Copy</button>
      </div>
      <div class="input-group">
        <label>Result</label>
        <textarea class="input-field" id="cc-output" rows="6" readonly placeholder="Converted text will appear here..."></textarea>
      </div>
    </div>
  `;

    const input = document.getElementById('cc-input') as HTMLTextAreaElement;
    const output = document.getElementById('cc-output') as HTMLTextAreaElement;

    const setOutput = (text: string) => { output.value = text; };

    document.getElementById('btn-upper')!.addEventListener('click', () =>
        setOutput(input.value.toUpperCase()));

    document.getElementById('btn-lower')!.addEventListener('click', () =>
        setOutput(input.value.toLowerCase()));

    document.getElementById('btn-title')!.addEventListener('click', () =>
        setOutput(input.value.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())));

    document.getElementById('btn-sentence')!.addEventListener('click', () =>
        setOutput(input.value.toLowerCase().replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase())));

    document.getElementById('btn-toggle')!.addEventListener('click', () =>
        setOutput(input.value.split('').map((c) => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join('')));

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText(output.value);
        showToast('Copied to clipboard!');
    });
}

function showToast(msg: string): void {
    const toast = document.createElement('div');
    toast.className = 'toast toast--success';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}
