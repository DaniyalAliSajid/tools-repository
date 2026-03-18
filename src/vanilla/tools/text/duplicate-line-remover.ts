export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Input Options</h4>
        <div class="checkbox-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="dl-case" /> <span>Ignore Case</span>
          </label>
          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="dl-trim" checked /> <span>Trim Space</span>
          </label>
        </div>
      </div>
      
      <div class="input-group">
        <label for="dl-input">Paste Text (One per line)</label>
        <textarea class="input-field" id="dl-input" rows="16" placeholder="Line 1\nLine 2\nLine 1\nLine 3\nLine 2" style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem;"></textarea>
      </div>
      
      <button class="btn btn--primary btn--block btn--lg" id="btn-remove" style="margin-top: var(--space-4);">⚡ Remove Duplicates</button>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Unique Results</h3>
        <button class="btn btn--secondary btn--sm" id="btn-copy">📋 Copy Code</button>
      </div>

      <div class="stats-row" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-4); margin-bottom: var(--space-4);">
        <div class="stat-card" style="padding: var(--space-3); text-align: center;">
          <div class="stat-card__value" id="dl-original" style="font-size: var(--fs-lg); font-weight: 700;">0</div>
          <div class="stat-card__label" style="font-size: var(--fs-xs); color: var(--color-text-muted);">Original</div>
        </div>
        <div class="stat-card" style="padding: var(--space-3); text-align: center;">
          <div class="stat-card__value" id="dl-unique" style="font-size: var(--fs-lg); font-weight: 700; color: var(--color-primary);">0</div>
          <div class="stat-card__label" style="font-size: var(--fs-xs); color: var(--color-text-muted);">Unique</div>
        </div>
        <div class="stat-card" style="padding: var(--space-3); text-align: center;">
          <div class="stat-card__value" id="dl-removed" style="font-size: var(--fs-lg); font-weight: 700; color: #ef4444;">0</div>
          <div class="stat-card__label" style="font-size: var(--fs-xs); color: var(--color-text-muted);">Removed</div>
        </div>
      </div>

      <textarea class="input-field" id="dl-output" rows="18" readonly style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem; background: var(--color-surface-hover); border-color: var(--color-border);"></textarea>
    </div>
  `;

    document.getElementById('btn-remove')!.addEventListener('click', () => {
        const input = (document.getElementById('dl-input') as HTMLTextAreaElement).value;
        const caseInsensitive = (document.getElementById('dl-case') as HTMLInputElement).checked;
        const trimWs = (document.getElementById('dl-trim') as HTMLInputElement).checked;

        let lines = input.split('\n');
        if (trimWs) lines = lines.map((l) => l.trim());

        const seen = new Set<string>();
        const unique: string[] = [];
        for (const line of lines) {
            const key = caseInsensitive ? line.toLowerCase() : line;
            if (!seen.has(key)) {
                seen.add(key);
                unique.push(line);
            }
        }

        document.getElementById('dl-original')!.textContent = String(lines.length);
        document.getElementById('dl-unique')!.textContent = String(unique.length);
        document.getElementById('dl-removed')!.textContent = String(lines.length - unique.length);
        (document.getElementById('dl-output') as HTMLTextAreaElement).value = unique.join('\n');
    });

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        const output = (document.getElementById('dl-output') as HTMLTextAreaElement).value;
        navigator.clipboard.writeText(output);
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅ Copied!';
        setTimeout(() => (btn.textContent = '📋 Copy Result'), 1500);
    });
}
