import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="emi-currency">Currency</label>
          <select id="emi-currency" class="input-field">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="input-group">
          <label for="emi-amount">Loan Amount</label>
          <input type="number" class="input-field" id="emi-amount" placeholder="e.g. 500000" min="1" />
        </div>
        <div class="input-group">
          <label for="emi-rate">Annual Interest Rate (%)</label>
          <input type="number" class="input-field" id="emi-rate" placeholder="e.g. 8.5" min="0.1" step="0.1" />
        </div>
        <div class="input-group">
          <label for="emi-tenure">Loan Tenure (months)</label>
          <input type="number" class="input-field" id="emi-tenure" placeholder="e.g. 60" min="1" />
        </div>
      </div>
      <button class="btn btn--primary btn--block" id="btn-calc">Calculate EMI</button>
      <div id="emi-results" style="display:none">
        <div style="text-align:center;padding:var(--space-6);background:var(--color-surface-alt);border-radius:var(--radius-lg);margin-bottom:var(--space-4);">
          <div style="font-size:var(--fs-sm);color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.05em">Monthly EMI</div>
          <div style="font-size:var(--fs-4xl);font-weight:var(--fw-bold);color:var(--color-primary);" id="emi-monthly">—</div>
        </div>
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-card__value" id="emi-principal">—</div>
            <div class="stat-card__label">Principal</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__value" id="emi-interest" style="color:var(--color-error)">—</div>
            <div class="stat-card__label">Total Interest</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__value" id="emi-total">—</div>
            <div class="stat-card__label">Total Payment</div>
          </div>
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

    document.getElementById('emi-results')!.style.display = 'block';
    document.getElementById('emi-monthly')!.textContent = `${symbol}${emi.toFixed(2)}`;
    document.getElementById('emi-principal')!.textContent = `${symbol}${P.toLocaleString()}`;
    document.getElementById('emi-interest')!.textContent = `${symbol}${totalInterest.toFixed(2)}`;
    document.getElementById('emi-total')!.textContent = `${symbol}${totalPayment.toFixed(2)}`;
  });
}
