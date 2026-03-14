import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="dc-currency">Currency</label>
          <select id="dc-currency" class="input-field">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="input-group">
          <label for="dc-price">Original Price</label>
          <input type="number" class="input-field" id="dc-price" placeholder="e.g. 1000" min="0" step="0.01" />
        </div>
        <div class="input-group">
          <label for="dc-discount">Discount (%)</label>
          <input type="number" class="input-field" id="dc-discount" placeholder="e.g. 20" min="0" max="100" />
        </div>
      </div>
      <button class="btn btn--primary btn--block" id="btn-calc">Calculate</button>
      <div class="stats-row" id="dc-results" style="display:none">
        <div class="stat-card">
          <div class="stat-card__value" id="dc-saved" style="color:var(--color-success)">—</div>
          <div class="stat-card__label">You Save</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="dc-final">—</div>
          <div class="stat-card__label">Final Price</div>
        </div>
      </div>
    </div>
  `;

  const calcBtn = document.getElementById('btn-calc')!;
  const currIn = document.getElementById('dc-currency') as HTMLSelectElement;

  calcBtn.addEventListener('click', () => {
    const price = parseFloat((document.getElementById('dc-price') as HTMLInputElement).value);
    const discount = parseFloat((document.getElementById('dc-discount') as HTMLInputElement).value);
    const symbol = currIn.value;

    if (isNaN(price) || isNaN(discount)) return;

    const saved = price * (discount / 100);
    const final_ = price - saved;

    document.getElementById('dc-results')!.style.display = 'flex';
    document.getElementById('dc-saved')!.textContent = `${symbol}${saved.toFixed(2)}`;
    document.getElementById('dc-final')!.textContent = `${symbol}${final_.toFixed(2)}`;
  });
}
