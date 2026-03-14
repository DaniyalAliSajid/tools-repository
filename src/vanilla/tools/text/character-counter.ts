export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="cc-input">Enter your text</label>
        <textarea class="input-field" id="cc-input" rows="8" placeholder="Type or paste text here..."></textarea>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-card__value" id="cc-total">0</div>
          <div class="stat-card__label">Total Characters</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="cc-no-spaces">0</div>
          <div class="stat-card__label">Without Spaces</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="cc-letters">0</div>
          <div class="stat-card__label">Letters</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="cc-digits">0</div>
          <div class="stat-card__label">Digits</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="cc-special">0</div>
          <div class="stat-card__label">Special Chars</div>
        </div>
      </div>
    </div>
  `;

    const input = document.getElementById('cc-input') as HTMLTextAreaElement;
    input.addEventListener('input', () => {
        const text = input.value;
        document.getElementById('cc-total')!.textContent = String(text.length);
        document.getElementById('cc-no-spaces')!.textContent = String(text.replace(/\s/g, '').length);
        document.getElementById('cc-letters')!.textContent = String((text.match(/[a-zA-Z]/g) || []).length);
        document.getElementById('cc-digits')!.textContent = String((text.match(/\d/g) || []).length);
        document.getElementById('cc-special')!.textContent = String((text.match(/[^a-zA-Z0-9\s]/g) || []).length);
    });
}
