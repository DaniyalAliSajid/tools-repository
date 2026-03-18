export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Investment Plan</h4>
        <div class="input-group">
          <label for="ci-principal">Initial Investment ($)</label>
          <input type="number" class="input-field" id="ci-principal" placeholder="1000" step="100" style="padding: var(--space-3);">
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="ci-contribution">Monthly Contribution ($)</label>
          <input type="number" class="input-field" id="ci-contribution" value="0" step="50" style="padding: var(--space-3);">
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="ci-years">Duration (Years)</label>
            <input type="number" class="input-field" id="ci-years" value="10" step="1" style="padding: var(--space-3);">
          </div>
          <div class="input-group">
            <label for="ci-rate">Annual Rate (%)</label>
            <input type="number" class="input-field" id="ci-rate" value="7" step="0.1" style="padding: var(--space-3);">
          </div>
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Power of Compounding:</strong> Reinvesting your earnings allows your investment to grow exponentially over time.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Growth Projection</h3>
      </div>
      
      <div class="stats-row" id="ci-stats" style="display: flex; flex-direction: column; gap: var(--space-4);">
        <div class="stat-card" style="background: var(--color-primary-light); border-color: var(--color-primary-border);">
          <div class="stat-card__label" style="color: var(--color-primary);">Future Value</div>
          <div class="stat-card__value" id="ci-total" style="font-size: 3rem; color: var(--color-primary);">$0.00</div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
          <div class="stat-card">
            <div class="stat-card__label">Total Invested</div>
            <div class="stat-card__value" id="ci-invested" style="font-size: var(--fs-xl);">$0.00</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__label">Total Interest</div>
            <div class="stat-card__value" id="ci-interest" style="font-size: var(--fs-xl); color: var(--color-success);">$0.00</div>
          </div>
        </div>
      </div>
    </div>
  `;

    const principalInput = document.getElementById('ci-principal') as HTMLInputElement;
    const contributionInput = document.getElementById('ci-contribution') as HTMLInputElement;
    const yearsInput = document.getElementById('ci-years') as HTMLInputElement;
    const rateInput = document.getElementById('ci-rate') as HTMLInputElement;

    const totalVal = document.getElementById('ci-total')!;
    const investedVal = document.getElementById('ci-invested')!;
    const interestVal = document.getElementById('ci-interest')!;

    const update = () => {
        const P = parseFloat(principalInput.value) || 0;
        const PMT = parseFloat(contributionInput.value) || 0;
        const t = parseFloat(yearsInput.value) || 0;
        const r = (parseFloat(rateInput.value) || 0) / 100;
        const n = 12; // Monthly compounding

        // Simple Future Value of Principal: P * (1 + r/n)^(nt)
        // Future Value of Serial Contributions: PMT * (((1 + r/n)^(nt) - 1) / (r/n))

        const nt = n * t;
        const rn = r / n;

        let futureValue = 0;
        if (r === 0) {
            futureValue = P + (PMT * nt);
        } else {
            const compoundFactor = Math.pow(1 + rn, nt);
            futureValue = (P * compoundFactor) + (PMT * (compoundFactor - 1) / rn);
        }

        const totalInvested = P + (PMT * nt);
        const totalInterest = futureValue - totalInvested;

        totalVal.textContent = `$${futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        investedVal.textContent = `$${totalInvested.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        interestVal.textContent = `$${totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    [principalInput, contributionInput, yearsInput, rateInput].forEach(inp => inp.addEventListener('input', update));
    update();
}
