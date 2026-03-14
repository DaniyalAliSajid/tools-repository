import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="tax-currency">Currency</label>
          <select id="tax-currency" class="input-field">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="input-group">
          <label for="tax-amount">Amount</label>
          <input type="number" class="input-field" id="tax-amount" placeholder="100" step="0.01">
        </div>
        <div class="input-group">
          <label for="tax-rate">Sales Tax (%)</label>
          <input type="number" class="input-field" id="tax-rate" value="5" step="0.1">
        </div>
      </div>

      <div class="toggle-group" id="tax-mode">
        <button class="toggle-group__btn active" data-mode="add">Add Tax</button>
        <button class="toggle-group__btn" data-mode="remove">Remove Tax (Inclusive)</button>
      </div>

      <div class="stats-row" id="tax-stats">
        <div class="stat-card">
          <div class="stat-card__value" id="tax-calc-val">--</div>
          <div class="stat-card__label">Tax Amount</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="tax-total-val">--</div>
          <div class="stat-card__label">Total Amount</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="tax-net-val">--</div>
          <div class="stat-card__label">Net Amount (Base)</div>
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
