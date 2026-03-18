import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Loan parameters</h4>
        <div class="input-group">
          <label for="emi-currency">Currency Selection</label>
          <select id="emi-currency" class="input-field" style="padding: var(--space-3);">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="emi-amount">Total Principal Amount</label>
          <input type="number" class="input-field" id="emi-amount" value="500000" style="padding: var(--space-3);" />
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="emi-rate">Interest Rate (%)</label>
            <input type="number" class="input-field" id="emi-rate" value="8.5" step="0.1" style="padding: var(--space-3);" />
          </div>
          <div class="input-group">
            <label for="emi-tenure">Tenure (Months)</label>
            <input type="number" class="input-field" id="emi-tenure" value="60" style="padding: var(--space-3);" />
          </div>
        </div>
        <button class="btn btn--primary btn--block btn--lg" id="btn-calc" style="margin-top: var(--space-6);">📊 Calculate Breakdown</button>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Did you know?</strong> A lower interest rate can save you thousands over long-term tenures. Use this to compare different loan offers.
        </p>
      </div>
    </div>
    <div class="tool-layout__output">
      <h3 style="margin-bottom: var(--space-4); font-size: var(--fs-base);">EMI Summary</h3>
      <div id="emi-results">
        <div class="stat-card" style="margin-bottom: var(--space-6); background: #f0fdf4; border-color: #bbf7d0;">
          <div class="stat-card__label" style="color: #16a34a;">Monthly EMI</div>
          <div class="stat-card__value" id="emi-monthly" style="font-size: 3.5rem; color: #16a34a;">$0.00</div>
        </div>
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-card__label">Principal</div>
            <div class="stat-card__value" id="emi-principal" style="font-size: var(--fs-xl);">—</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__label">Total Interest</div>
            <div class="stat-card__value" id="emi-interest" style="font-size: var(--fs-xl); color: #ef4444;">—</div>
          </div>
        </div>
        <div class="stat-card" style="margin-top: var(--space-4);">
          <div class="stat-card__label">Total Payment</div>
          <div class="stat-card__value" id="emi-total" style="font-size: var(--fs-2xl);">$0.00</div>
        </div>
      </div>
    </div>
  `;

  const calcBtn = document.getElementById('btn-calc')!;
  const currIn = document.getElementById('emi-currency') as HTMLSelectElement;

  calcBtn.addEventListener('click', () => {
    const P = parseFloat((document.getElementById('emi-amount') as HTMLInputElement).value);
    const annualRate = parseFloat((document.getElementById('emi-rate') as HTMLInputElement).value);
    const n = parseInt((document.getElementById('emi-tenure') as HTMLInputElement).value);
    const symbol = currIn.value;

    if (isNaN(P) || isNaN(annualRate) || isNaN(n) || P <= 0 || annualRate <= 0 || n <= 0) return;

    const r = annualRate / 12 / 100; // monthly rate
    const emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - P;

    // document.getElementById('emi-results')!.style.display = 'block';
    document.getElementById('emi-monthly')!.textContent = `${symbol}${emi.toFixed(2)}`;
    document.getElementById('emi-principal')!.textContent = `${symbol}${P.toLocaleString()}`;
    document.getElementById('emi-interest')!.textContent = `${symbol}${totalInterest.toFixed(2)}`;
    document.getElementById('emi-total')!.textContent = `${symbol}${totalPayment.toFixed(2)}`;
  });
}
