export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="ts-input">Enter text to convert to slug</label>
        <input type="text" class="input-field" id="ts-input" placeholder="e.g. My Blog Post Title!" />
      </div>
      <div class="input-group">
        <label>Generated Slug</label>
        <div class="result-box" id="ts-output" style="min-height:44px;display:flex;align-items:center;">
          <span id="ts-slug" style="flex:1;">your-slug-here</span>
          <button class="btn btn--sm btn--primary result-box__copy" id="btn-copy">📋 Copy</button>
        </div>
      </div>
      <div class="stats-row">
        <div class="stat-card">
          <div class="stat-card__value" id="ts-length">0</div>
          <div class="stat-card__label">Characters</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="ts-words">0</div>
          <div class="stat-card__label">Words</div>
        </div>
      </div>
    </div>
  `;

    const input = document.getElementById('ts-input') as HTMLInputElement;
    const slugEl = document.getElementById('ts-slug')!;

    input.addEventListener('input', () => {
        const slug = toSlug(input.value);
        slugEl.textContent = slug || 'your-slug-here';
        document.getElementById('ts-length')!.textContent = String(slug.length);
        document.getElementById('ts-words')!.textContent = String(slug ? slug.split('-').length : 0);
    });

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText(slugEl.textContent || '');
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅';
        setTimeout(() => (btn.textContent = '📋 Copy'), 1500);
    });
}

function toSlug(text: string): string {
    return text
        .toLowerCase()
        .trim()
        .replace(/[àáâãäå]/g, 'a')
        .replace(/[èéêë]/g, 'e')
        .replace(/[ìíîï]/g, 'i')
        .replace(/[òóôõö]/g, 'o')
        .replace(/[ùúûü]/g, 'u')
        .replace(/[ñ]/g, 'n')
        .replace(/[ç]/g, 'c')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
}
