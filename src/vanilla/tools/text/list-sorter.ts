export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="ls-input">Enter your list (one item per line)</label>
        <textarea class="input-field" id="ls-input" rows="8" placeholder="Item 1\nItem 2\nItem 3..."></textarea>
      </div>

      <div class="toggle-group" id="ls-sort-order">
        <button class="toggle-group__btn active" data-order="asc">A-Z (Ascending)</button>
        <button class="toggle-group__btn" data-order="desc">Z-A (Descending)</button>
        <button class="toggle-group__btn" data-order="random">Randomize</button>
      </div>

      <div class="checkbox-group">
        <label class="checkbox-label">
          <input type="checkbox" id="ls-numeric"> Sort Numerically
        </label>
        <label class="checkbox-label">
          <input type="checkbox" id="ls-unique"> Remove Duplicates
        </label>
      </div>

      <div class="input-group">
        <label>Sorted Result</label>
        <div class="result-box" id="ls-result"></div>
        <button class="btn btn--secondary btn--sm result-box__copy" id="ls-copy">Copy</button>
      </div>
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
