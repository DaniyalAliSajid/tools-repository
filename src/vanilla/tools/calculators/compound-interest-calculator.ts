export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="ci-principal">Initial Investment ($)</label>
        <input type="number" class="input-field" id="ci-principal" placeholder="1000" step="100">
      </div>

      <div class="input-group">
        <label for="ci-contribution">Monthly Contribution ($)</label>
        <input type="number" class="input-field" id="ci-contribution" value="0" step="50">
      </div>

      <div class="input-group">
        <label for="ci-rate">Duration (Years)</label>
        <input type="number" class="input-field" id="ci-years" value="10" step="1">
      </div>

      <div class="input-group">
        <label for="ci-rate">Annual Interest Rate (%)</label>
        <input type="number" class="input-field" id="ci-rate" value="7" step="0.1">
      </div>

      <div class="stats-row" id="ci-stats">
        <div class="stat-card">
          <div class="stat-card__value" id="ci-total">$0.00</div>
          <div class="stat-card__label">Future Value</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="ci-invested">$0.00</div>
          <div class="stat-card__label">Total Invested</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="ci-interest">$0.00</div>
          <div class="stat-card__label">Total Interest</div>
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
