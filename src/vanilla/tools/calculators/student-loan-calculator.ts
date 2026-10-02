export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Loan parameters</h4>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="sl-amount">Loan Amount ($)</label>
          <input type="number" class="input-field" id="sl-amount" value="30000" style="padding: var(--space-3);" />
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="sl-rate">Interest Rate (%)</label>
            <input type="number" class="input-field" id="sl-rate" value="5.8" step="0.1" style="padding: var(--space-3);" />
          </div>
          <div class="input-group">
            <label for="sl-term">Term (Years)</label>
            <input type="number" class="input-field" id="sl-term" value="10" style="padding: var(--space-3);" />
          </div>
        </div>
        <button class="btn btn--primary btn--block btn--lg" id="btn-sl-calc" style="margin-top: var(--space-6);">📊 Calculate Breakdown</button>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> Making extra payments towards your principal can significantly reduce the total interest paid over the life of your student loan.
        </p>
      </div>
    </div>
    <div class="tool-layout__output">
      <h3 style="margin-bottom: var(--space-4); font-size: var(--fs-base);">Loan Summary</h3>
      <div id="sl-results">
        <div class="stat-card" style="margin-bottom: var(--space-6); background: #f0fdf4; border-color: #bbf7d0;">
          <div class="stat-card__label" style="color: #16a34a;">Monthly Payment</div>
          <div class="stat-card__value" id="sl-monthly" style="font-size: 3.5rem; color: #16a34a;">$0.00</div>
        </div>
        <div class="stats-row">
          <div class="stat-card">
            <div class="stat-card__label">Total Principal</div>
            <div class="stat-card__value" id="sl-principal" style="font-size: var(--fs-xl);">—</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__label">Total Interest</div>
            <div class="stat-card__value" id="sl-interest" style="font-size: var(--fs-xl); color: #ef4444;">—</div>
          </div>
        </div>
        <div class="stat-card" style="margin-top: var(--space-4);">
          <div class="stat-card__label">Total Paid</div>
          <div class="stat-card__value" id="sl-total" style="font-size: var(--fs-2xl);">$0.00</div>
        </div>
      </div>
    </div>
  `;

  const calcBtn = document.getElementById('btn-sl-calc')!;

  calcBtn.addEventListener('click', () => {
    const P = parseFloat((document.getElementById('sl-amount') as HTMLInputElement).value);
    const annualRate = parseFloat((document.getElementById('sl-rate') as HTMLInputElement).value);
    const years = parseInt((document.getElementById('sl-term') as HTMLInputElement).value);

    if (isNaN(P) || isNaN(annualRate) || isNaN(years) || P <= 0 || annualRate < 0 || years <= 0) return;

    let emi = 0;
    let totalPayment = 0;
    let totalInterest = 0;

    if (annualRate === 0) {
       emi = P / (years * 12);
       totalPayment = P;
    } else {
        const r = annualRate / 12 / 100; // monthly rate
        const n = years * 12; // total months
        emi = P * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1);
        totalPayment = emi * n;
        totalInterest = totalPayment - P;
    }

    document.getElementById('sl-monthly')!.textContent = `$${emi.toFixed(2)}`;
    document.getElementById('sl-principal')!.textContent = `$${P.toLocaleString()}`;
    document.getElementById('sl-interest')!.textContent = `$${totalInterest.toFixed(2)}`;
    document.getElementById('sl-total')!.textContent = `$${totalPayment.toFixed(2)}`;
  });
}
