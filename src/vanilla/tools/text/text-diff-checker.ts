export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="diff-original">Original Text</label>
          <textarea class="input-field" id="diff-original" rows="10" placeholder="Paste original text here..."></textarea>
        </div>
        <div class="input-group">
          <label for="diff-changed">Modified Text</label>
          <textarea class="input-field" id="diff-changed" rows="10" placeholder="Paste modified text here..."></textarea>
        </div>
      </div>

      <div class="input-group">
        <label>Differences</label>
        <div class="result-box" id="diff-result" style="white-space: pre-wrap; font-family: monospace; background: white; padding: var(--space-6);"></div>
      </div>
    </div>
  `;

    const originalInput = document.getElementById('diff-original') as HTMLTextAreaElement;
    const changedInput = document.getElementById('diff-changed') as HTMLTextAreaElement;
    const resultDiv = document.getElementById('diff-result') as HTMLDivElement;

    const compare = () => {
        const s1 = originalInput.value.split('\n');
        const s2 = changedInput.value.split('\n');

        let html = '';
        const max = Math.max(s1.length, s2.length);

        for (let i = 0; i < max; i++) {
            const line1 = s1[i] || '';
            const line2 = s2[i] || '';

            if (line1 === line2) {
                html += `<div style="color: var(--color-text-muted); opacity: 0.6;">  ${line1}</div>`;
            } else {
                if (i < s1.length) {
                    html += `<div style="background: #fee2e2; color: #991b1b;">- ${line1}</div>`;
                }
                if (i < s2.length) {
                    html += `<div style="background: #dcfce7; color: #166534;">+ ${line2}</div>`;
                }
            }
        }
        resultDiv.innerHTML = html || '<div style="color: var(--color-text-muted)">No changes detected.</div>';
    };

    originalInput.addEventListener('input', compare);
    changedInput.addEventListener('input', compare);
}
