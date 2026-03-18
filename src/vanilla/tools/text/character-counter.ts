export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="cc-input">Source Content</label>
        <textarea class="input-field" id="cc-input" rows="22" placeholder="Type or paste text here to see character density..." style="resize: vertical; font-size: 1rem;"></textarea>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Density Analysis</h3>
      </div>
      
      <div class="stats-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
        <div class="stat-card">
          <div class="stat-card__value" id="cc-total">0</div>
          <div class="stat-card__label">Total</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="cc-no-spaces">0</div>
          <div class="stat-card__label">No Spaces</div>
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
          <div class="stat-card__label">Special</div>
        </div>
      </div>
      <div style="margin-top: var(--space-6); padding: var(--space-4); background: var(--color-surface); border-radius: var(--radius-lg); font-size: var(--fs-sm); color: var(--color-text-secondary); line-height: 1.5;">
        <p>💡 Tip: Use this tool to verify length limits for social media posts, meta descriptions, or code snippets.</p>
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
