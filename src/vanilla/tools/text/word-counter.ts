export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="wc-input">Document / Content Editor</label>
        <textarea class="input-field" id="wc-input" rows="22" placeholder="Start typing or paste your text here for a detailed breakdown..." style="resize: vertical; font-size: 1rem; line-height: 1.6;"></textarea>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Content Insights</h3>
      </div>
      
      <div class="stats-row" id="wc-stats" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
        <div class="stat-card">
          <div class="stat-card__value" id="wc-words">0</div>
          <div class="stat-card__label">Words</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="wc-chars">0</div>
          <div class="stat-card__label">Characters</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="wc-sentences">0</div>
          <div class="stat-card__label">Sentences</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="wc-paragraphs">0</div>
          <div class="stat-card__label">Paragraphs</div>
        </div>
      </div>
      <div class="stat-card" style="margin-top: var(--space-4); display: flex; align-items: center; justify-content: space-between; text-align: left;">
        <div>
          <div class="stat-card__label">Estimated Reading Time</div>
          <div class="stat-card__value" id="wc-reading" style="font-size: var(--fs-xl); margin: 0;">0 min</div>
        </div>
        <div style="font-size: 2rem; opacity: 0.2;">⏱️</div>
      </div>
    </div>
  `;

    const input = document.getElementById('wc-input') as HTMLTextAreaElement;
    input.addEventListener('input', () => update(input.value));
}

function update(text: string): void {
    const trimmed = text.trim();
    const words = trimmed ? trimmed.split(/\s+/).length : 0;
    const chars = text.length;
    const sentences = trimmed ? (trimmed.match(/[.!?]+/g) || []).length : 0;
    const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
    const readingMinutes = Math.ceil(words / 200);

    document.getElementById('wc-words')!.textContent = String(words);
    document.getElementById('wc-chars')!.textContent = String(chars);
    document.getElementById('wc-sentences')!.textContent = String(sentences);
    document.getElementById('wc-paragraphs')!.textContent = String(paragraphs || (trimmed ? 1 : 0));
    document.getElementById('wc-reading')!.textContent = `${readingMinutes} min`;
}
