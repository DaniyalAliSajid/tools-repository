export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="wc-input">Enter or paste your text below</label>
        <textarea class="input-field" id="wc-input" rows="8" placeholder="Start typing or paste your text here..."></textarea>
      </div>
      <div class="stats-row" id="wc-stats">
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
        <div class="stat-card">
          <div class="stat-card__value" id="wc-reading">0 min</div>
          <div class="stat-card__label">Reading Time</div>
        </div>
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
