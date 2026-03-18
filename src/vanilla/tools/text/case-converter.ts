export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Transform Actions</h4>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:var(--space-2);">
          <button class="btn btn--secondary btn--sm" id="btn-upper">Uppercase</button>
          <button class="btn btn--secondary btn--sm" id="btn-lower">Lowercase</button>
          <button class="btn btn--secondary btn--sm" id="btn-title">Title Case</button>
          <button class="btn btn--secondary btn--sm" id="btn-sentence">Sentence Case</button>
          <button class="btn btn--secondary btn--sm" id="btn-toggle" style="grid-column: span 2;">Toggle Case</button>
        </div>
      </div>
      
      <div class="input-group">
        <label for="cc-input">Original Text</label>
        <textarea class="input-field" id="cc-input" rows="14" placeholder="Type your text here..." style="resize: vertical; font-size: 1rem;"></textarea>
      </div>
    </div>

    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-3);">
        <h3 style="font-size: var(--fs-base);">Converted Result</h3>
        <button class="btn btn--primary btn--sm" id="btn-copy">📋 Copy Text</button>
      </div>
      <div class="input-group" style="height: calc(100% - 44px);">
        <textarea class="result-box" id="cc-output" rows="8" readonly placeholder="Converted text will appear here..." style="width: 100%; height: 100%; min-height: 240px; resize: none; border: none; outline: none;"></textarea>
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
