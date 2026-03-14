export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="dl-input">Paste your text (one item per line)</label>
        <textarea class="input-field" id="dl-input" rows="8" placeholder="Line 1\nLine 2\nLine 1\nLine 3\nLine 2"></textarea>
      </div>
      <div class="checkbox-group">
        <label class="checkbox-label">
          <input type="checkbox" id="dl-case" />
          Case-insensitive comparison
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="dl-trim" checked />
          Trim whitespace
        </label>
      </div>
      <button class="btn btn--primary btn--block" id="btn-remove">Remove Duplicates</button>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-card__value" id="dl-original">0</div>
          <div class="stat-card__label">Original Lines</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="dl-unique">0</div>
          <div class="stat-card__label">Unique Lines</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="dl-removed">0</div>
          <div class="stat-card__label">Removed</div>
        </div>
      </div>
      <div class="input-group">
        <label>Result</label>
        <textarea class="input-field" id="dl-output" rows="8" readonly></textarea>
      </div>
      <button class="btn btn--secondary btn--block" id="btn-copy">📋 Copy Result</button>
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
