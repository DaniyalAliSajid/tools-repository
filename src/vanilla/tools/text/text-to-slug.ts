export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="ts-input">Source Title / Text</label>
        <input type="text" class="input-field" id="ts-input" placeholder="e.g. My Awesome Blog Post Title!" style="padding: var(--space-4); font-size: 1.125rem; font-weight: 500;" />
      </div>
      
      <div class="stats-row" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4); margin-top: var(--space-6);">
        <div class="stat-card" style="padding: var(--space-4); text-align: center; background: var(--color-surface-hover); border-radius: var(--radius-xl);">
          <div class="stat-card__value" id="ts-length" style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">0</div>
          <div class="stat-card__label" style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase;">Characters</div>
        </div>
        <div class="stat-card" style="padding: var(--space-4); text-align: center; background: var(--color-surface-hover); border-radius: var(--radius-xl);">
          <div class="stat-card__value" id="ts-words" style="font-size: 1.5rem; font-weight: 700; color: var(--color-primary);">0</div>
          <div class="stat-card__label" style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase;">Words</div>
        </div>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">SEO-Friendly Slug</h3>
        <button class="btn btn--secondary btn--sm" id="btn-copy">📋 Copy</button>
      </div>
      
      <div class="result-box" id="ts-output" style="padding: var(--space-8); display: flex; align-items: center; justify-content: center; min-height: 120px;">
        <span id="ts-slug" style="font-family: 'JetBrains Mono'; font-size: 1.25rem; font-weight: 600; color: var(--color-primary); word-break: break-all; text-align: center;">your-slug-here</span>
      </div>
      
      <p style="font-size: var(--fs-xs); color: var(--color-text-muted); margin-top: var(--space-4); text-align: center;">
        Characters like !, @, #, etc. are automatically removed to ensure URL compatibility.
      </p>
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
