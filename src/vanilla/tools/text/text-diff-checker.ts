export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="diff-original">Original Text (Base)</label>
        <textarea class="input-field" id="diff-original" rows="12" placeholder="Paste original version here..." style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem;"></textarea>
      </div>
      <div class="input-group" style="margin-top: var(--space-4);">
        <label for="diff-changed">Modified Text (New)</label>
        <textarea class="input-field" id="diff-changed" rows="12" placeholder="Paste changed version here..." style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem;"></textarea>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Live Comparison</h3>
        <div style="display: flex; gap: var(--space-2);">
          <span style="font-size: var(--fs-xs); color: #166534; background: #dcfce7; padding: 2px 8px; border-radius: 4px;">+ Added</span>
          <span style="font-size: var(--fs-xs); color: #991b1b; background: #fee2e2; padding: 2px 8px; border-radius: 4px;">- Removed</span>
        </div>
      </div>
      <div class="result-box" id="diff-result" style="padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: var(--fs-sm); line-height: 1.6; height: calc(100% - 48px); min-height: 520px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap; background: var(--color-surface-hover);"></div>
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
                html += `<div style="color: var(--color-text-muted); opacity: 0.5; border-left: 4px solid transparent; padding-left: 8px; font-weight: 300;">  ${line1}</div>`;
            } else {
                if (i < s1.length) {
                    html += `<div style="background: #fee2e2; color: #991b1b; border-left: 4px solid #ef4444; padding-left: 8px; font-weight: 500;">- ${line1}</div>`;
                }
                if (i < s2.length) {
                    html += `<div style="background: #dcfce7; color: #166534; border-left: 4px solid #22c55e; padding-left: 8px; font-weight: 500;">+ ${line2}</div>`;
                }
            }
        }
        resultDiv.innerHTML = html || '<div style="color: var(--color-text-muted); text-align: center; margin-top: 100px;">Paste text to see differences.</div>';
    };

    originalInput.addEventListener('input', compare);
    changedInput.addEventListener('input', compare);
}
