import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Transaction Details</h4>
        <div class="input-group">
          <label for="tax-currency">Currency</label>
          <select id="tax-currency" class="input-field" style="padding: var(--space-3);">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="tax-amount">Amount</label>
            <input type="number" class="input-field" id="tax-amount" placeholder="100" step="0.01" style="padding: var(--space-3);">
          </div>
          <div class="input-group">
            <label for="tax-rate">Tax Rate (%)</label>
            <input type="number" class="input-field" id="tax-rate" value="5" step="0.1" style="padding: var(--space-3);">
          </div>
        </div>
        
        <div class="input-group" style="margin-top: var(--space-4);">
          <label>Calculation Mode</label>
          <div class="toggle-group" id="tax-mode" style="display: flex; gap: 4px; background: var(--color-surface-hover); padding: 4px; border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
            <button class="btn btn--sm active" data-mode="add" style="flex: 1; border: none; border-radius: var(--radius-md);">Add Tax</button>
            <button class="btn btn--sm" data-mode="remove" style="flex: 1; border: none; border-radius: var(--radius-md);">Remove Tax</button>
          </div>
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Note:</strong> "Remove Tax" calculates the original price of an item that already includes sales tax in its total price.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Tax Breakdown</h3>
      </div>
      
      <div class="stat-card" style="margin-bottom: var(--space-6); background: var(--color-primary-light); border-color: rgba(37, 99, 235, 0.2);">
        <div class="stat-card__label" style="color: var(--color-primary);">Estimated Tax</div>
        <div class="stat-card__value" id="tax-calc-val" style="font-size: 3.5rem;">$0.00</div>
      </div>

      <div class="stats-row" id="tax-stats">
        <div class="stat-card">
          <div class="stat-card__label">Total Bill</div>
          <div class="stat-card__value" id="tax-total-val" style="font-size: var(--fs-xl);">$0.00</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__label">Base Price</div>
          <div class="stat-card__value" id="tax-net-val" style="font-size: var(--fs-xl);">$0.00</div>
        </div>
      </div>
    </div>
  `;

  const amountInput = document.getElementById('tax-amount') as HTMLInputElement;
  const rateInput = document.getElementById('tax-rate') as HTMLInputElement;
  const modeBtns = document.querySelectorAll('#tax-mode .toggle-group__btn');
  const currIn = document.getElementById('tax-currency') as HTMLSelectElement;

  const taxVal = document.getElementById('tax-calc-val')!;
  const totalVal = document.getElementById('tax-total-val')!;
  const netVal = document.getElementById('tax-net-val')!;

  let mode = 'add';

  const update = () => {
    const inputAmount = parseFloat(amountInput.value) || 0;
    const rate = (parseFloat(rateInput.value) || 0) / 100;
    const symbol = currIn.value;

    let taxAmount = 0;
    let totalAmount = 0;
    let netAmount = 0;

    if (mode === 'add') {
      taxAmount = inputAmount * rate;
      totalAmount = inputAmount + taxAmount;
      netAmount = inputAmount;
    } else {
      netAmount = inputAmount / (1 + rate);
      taxAmount = inputAmount - netAmount;
      totalAmount = inputAmount;
    }

    taxVal.textContent = `${symbol}${taxAmount.toFixed(2)}`;
    totalVal.textContent = `${symbol}${totalAmount.toFixed(2)}`;
    netVal.textContent = `${symbol}${netAmount.toFixed(2)}`;
  };

  [amountInput, rateInput, currIn].forEach(inp => inp.addEventListener('input', update));

  modeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      mode = (btn as HTMLElement).dataset.mode!;
      update();
    });
  });

  update();
}
