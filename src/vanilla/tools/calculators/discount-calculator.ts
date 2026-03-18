import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Offer Details</h4>
        <div class="input-group">
          <label for="dc-price">Original Retail Price</label>
          <div style="display: flex; gap: var(--space-3);">
            <select id="dc-currency" class="input-field" style="flex: 1; padding: var(--space-3); font-weight: 600;">
              ${getCurrencyOptionsHTML()}
            </select>
            <input type="number" class="input-field" id="dc-price" placeholder="e.g. 1000" style="flex: 3; padding: var(--space-3); font-weight: 700;" min="0" step="0.01" />
          </div>
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="dc-discount">Discount Percentage (%)</label>
          <input type="number" class="input-field" id="dc-discount" placeholder="e.g. 20" min="0" max="100" style="padding: var(--space-3); font-weight: 700;" />
        </div>
        <button class="btn btn--primary btn--block btn--lg" id="btn-calc" style="margin-top: var(--space-6); padding: var(--space-4);">✨ Compute Instant Savings</button>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Shopping Hack:</strong> Always check if the "original price" was inflated before the sale.
        </p>
      </div>
    </div>
    <div class="tool-layout__output">
      <h3 style="margin-bottom: var(--space-4); font-size: var(--fs-base);">Savings Summary</h3>
      <div class="stats-row" id="dc-results" style="display:none">
        <div class="stat-card">
          <div class="stat-card__value" id="dc-saved" style="color:#10b981">—</div>
          <div class="stat-card__label">You Save</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="dc-final">—</div>
          <div class="stat-card__label">Final Price</div>
        </div>
      </div>
      <div id="dc-placeholder" style="text-align: center; padding: var(--space-12); color: var(--color-text-muted);">
        Enter the original price and discount to see how much you'll save.
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

    document.getElementById('dc-results')!.style.display = 'grid';
    document.getElementById('dc-placeholder')!.style.display = 'none';
    document.getElementById('dc-saved')!.textContent = `${symbol}${saved.toFixed(2)}`;
    document.getElementById('dc-final')!.textContent = `${symbol}${final_.toFixed(2)}`;
  });
}
