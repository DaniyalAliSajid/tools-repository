export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Sort Configuration</h4>
        <div class="toggle-group" id="ls-sort-order" style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: var(--space-1); background: var(--color-surface-hover); padding: 4px; border-radius: var(--radius-lg); border: 1px solid var(--color-border); margin-bottom: var(--space-3);">
          <button class="toggle-group__btn active" data-order="asc" style="padding: 10px; border-radius: var(--radius-md); font-size: var(--fs-xs);">A-Z</button>
          <button class="toggle-group__btn" data-order="desc" style="padding: 10px; border-radius: var(--radius-md); font-size: var(--fs-xs);">Z-A</button>
          <button class="toggle-group__btn" data-order="random" style="padding: 10px; border-radius: var(--radius-md); font-size: var(--fs-xs);">Random</button>
        </div>
        
        <div class="checkbox-group" style="display: grid; grid-template-columns: 1fr; gap: var(--space-2);">
          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="ls-numeric"> <span style="font-size: var(--fs-sm);">Sort Numerically</span>
          </label>
          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="ls-unique"> <span style="font-size: var(--fs-sm);">Remove Duplicates</span>
          </label>
        </div>
      </div>

      <div class="input-group">
        <label for="ls-input">Source List (One per line)</label>
        <textarea class="input-field" id="ls-input" rows="12" placeholder="Item 1\nItem 2\nItem 3..." style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem;"></textarea>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Sorted List</h3>
        <button class="btn btn--secondary btn--sm" id="ls-copy">📋 Copy</button>
      </div>
      <div class="result-box" id="ls-result" style="padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: var(--fs-sm); line-height: 1.5; height: calc(100% - 48px); min-height: 400px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap;"></div>
    </div>
  `;

    const input = document.getElementById('ls-input') as HTMLTextAreaElement;
    const result = document.getElementById('ls-result') as HTMLDivElement;
    const orderBtns = document.querySelectorAll('#ls-sort-order .toggle-group__btn');
    const numericCheck = document.getElementById('ls-numeric') as HTMLInputElement;
    const uniqueCheck = document.getElementById('ls-unique') as HTMLInputElement;
    const copyBtn = document.getElementById('ls-copy') as HTMLButtonElement;

    let sortOrder = 'asc';

    const update = () => {
        let items = input.value.split('\n').filter(item => item.trim() !== '');
        if (items.length === 0) {
            result.textContent = '';
            return;
        }

        if (uniqueCheck.checked) {
            items = Array.from(new Set(items));
        }

        if (sortOrder === 'random') {
            items.sort(() => Math.random() - 0.5);
        } else {
            const isNumeric = numericCheck.checked;
            items.sort((a, b) => {
                if (isNumeric) {
                    return Number(a) - Number(b);
                }
                return a.localeCompare(b);
            });

            if (sortOrder === 'desc') {
                items.reverse();
            }
        }

        result.textContent = items.join('\n');
    };

    input.addEventListener('input', update);
    numericCheck.addEventListener('change', update);
    uniqueCheck.addEventListener('change', update);

    orderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            orderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            sortOrder = (btn as HTMLElement).dataset.order!;
            update();
        });
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(result.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
}
