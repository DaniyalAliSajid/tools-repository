import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="al-currency">Currency</label>
          <select id="al-currency" class="input-field">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="input-group">
          <label for="al-price">Car Price</label>
          <input type="number" class="input-field" id="al-price" value="30000">
        </div>
        <div class="input-group">
          <label for="al-down">Down Payment</label>
          <input type="number" class="input-field" id="al-down" value="5000">
        </div>
        <div class="input-group">
          <label for="al-rate">Interest Rate (%)</label>
          <input type="number" class="input-field" id="al-rate" value="4.5" step="0.1">
        </div>
        <div class="input-group">
          <label for="al-term">Loan Term (Months)</label>
          <input type="number" class="input-field" id="al-term" value="60">
        </div>
      </div>

      <div class="input-group">
        <label>Monthly Payment</label>
        <div class="result-box" id="al-result" style="text-align: center; padding: var(--space-8);">
           <div id="al-payment" style="font-size: 3.5rem; font-weight: 700; color: var(--color-primary);">$0.00</div>
           <div id="al-details" style="margin-top: var(--space-2); opacity: 0.7;">Total Interest: $0.00</div>
        </div>
      </div>
    </div>
  `;

  const priceIn = document.getElementById('al-price') as HTMLInputElement;
  const downIn = document.getElementById('al-down') as HTMLInputElement;
  const rateIn = document.getElementById('al-rate') as HTMLInputElement;
  const termIn = document.getElementById('al-term') as HTMLInputElement;
  const currIn = document.getElementById('al-currency') as HTMLSelectElement;
  const paymentRes = document.getElementById('al-payment')!;
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
    detailsRes.textContent = `Total Interest: ${symbol}${totalInterest.toFixed(2)} | Total Cost: ${symbol}${totalPayment.toFixed(2)}`;
  };

  [priceIn, downIn, rateIn, termIn, currIn].forEach(inp => inp.addEventListener('input', calculate));
  calculate();
}
