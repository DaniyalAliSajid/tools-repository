import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Vehicle & Terms</h4>
        <div class="input-group">
          <label for="al-currency">Currency</label>
          <select id="al-currency" class="input-field" style="padding: var(--space-3);">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="al-price">Vehicle Price</label>
            <input type="number" class="input-field" id="al-price" value="30000" style="padding: var(--space-3);">
          </div>
          <div class="input-group">
            <label for="al-down">Down Payment</label>
            <input type="number" class="input-field" id="al-down" value="5000" style="padding: var(--space-3);">
          </div>
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="al-rate">Interest Rate (%)</label>
            <input type="number" class="input-field" id="al-rate" value="4.5" step="0.1" style="padding: var(--space-3);">
          </div>
          <div class="input-group">
            <label for="al-term">Loan Term (Months)</label>
            <input type="number" class="input-field" id="al-term" value="60" style="padding: var(--space-3);">
          </div>
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> Increasing your down payment reduces your monthly liability and the total interest you'll pay over time.
        </p>
      </div>
    </div>
    <div class="tool-layout__output">
      <h3 style="margin-bottom: var(--space-4); font-size: var(--fs-base);">Payment Breakdown</h3>
      <div class="stat-card" style="margin-bottom: var(--space-6); background: var(--color-primary-light); border-color: rgba(37, 99, 235, 0.2);">
        <div class="stat-card__label" style="color: var(--color-primary);">Monthly Payment</div>
        <div class="stat-card__value" id="al-payment" style="font-size: 3.5rem;">$0.00</div>
      </div>
      <div class="stats-row" id="al-results-row">
        <div class="stat-card">
          <div class="stat-card__label">Total Interest</div>
          <div class="stat-card__value" id="al-interest" style="font-size: var(--fs-xl); color: #ef4444;">$0.00</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__label">Total Cost</div>
          <div class="stat-card__value" id="al-total" style="font-size: var(--fs-xl);">$0.00</div>
        </div>
      </div>
      <p id="al-details" style="margin-top: var(--space-6); text-align: center; font-size: var(--fs-sm); color: var(--color-text-muted); line-height: 1.6;"></p>
    </div>
  `;

  const priceIn = document.getElementById('al-price') as HTMLInputElement;
  const downIn = document.getElementById('al-down') as HTMLInputElement;
  const rateIn = document.getElementById('al-rate') as HTMLInputElement;
  const termIn = document.getElementById('al-term') as HTMLInputElement;
  const currIn = document.getElementById('al-currency') as HTMLSelectElement;
  const paymentRes = document.getElementById('al-payment')!;
  const interestRes = document.getElementById('al-interest')!;
  const totalRes = document.getElementById('al-total')!;
  const detailsRes = document.getElementById('al-details')!;

  const calculate = () => {
    const price = parseFloat(priceIn.value) || 0;
    const down = parseFloat(downIn.value) || 0;
    const rate = (parseFloat(rateIn.value) || 0) / 100 / 12;
    const term = parseFloat(termIn.value) || 0;
    const symbol = currIn.value;

    const principal = price - down;
    if (principal <= 0) {
      paymentRes.textContent = `${symbol}0.00`;
      detailsRes.textContent = "Vehicle is paid in full via down payment.";
      return;
    }

    let monthlyPayment = 0;
    if (rate > 0) {
      monthlyPayment = (principal * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    } else {
      monthlyPayment = principal / term;
    }

    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - principal;

    paymentRes.textContent = `${symbol}${monthlyPayment.toFixed(2)}`;
    interestRes.textContent = `${symbol}${totalInterest.toFixed(2)}`;
    totalRes.textContent = `${symbol}${totalPayment.toFixed(2)}`;
    detailsRes.textContent = `Principal: ${symbol}${(price - down).toLocaleString()} | Down Payment: ${symbol}${down.toLocaleString()}`;
  };

  [priceIn, downIn, rateIn, termIn, currIn].forEach(inp => inp.addEventListener('input', calculate));
  calculate();
}
