export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="inf-amount">Initial Amount ($)</label>
          <input type="number" class="input-field" id="inf-amount" value="1000">
        </div>
        <div class="input-group">
          <label for="inf-rate">Avg. Annual Inflation (%)</label>
          <input type="number" class="input-field" id="inf-rate" value="3" step="0.1">
        </div>
        <div class="input-group">
          <label for="inf-years">Number of Years</label>
          <input type="number" class="input-field" id="inf-years" value="10">
        </div>
      </div>

      <div class="input-group">
        <label>Future Value (Purchasing Power)</label>
        <div class="result-box" id="inf-result" style="text-align: center; padding: var(--space-8);">
           <div id="inf-value" style="font-size: 3rem; font-weight: 700; color: #991b1b;">$744.09</div>
           <div id="inf-details" style="margin-top: var(--space-2); opacity: 0.7;">Effective loss: 25.59%</div>
        </div>
      </div>
    </div>
  `;

    const amountIn = document.getElementById('inf-amount') as HTMLInputElement;
    const rateIn = document.getElementById('inf-rate') as HTMLInputElement;
    const yearsIn = document.getElementById('inf-years') as HTMLInputElement;
    const valueRes = document.getElementById('inf-value')!;
    const detailsRes = document.getElementById('inf-details')!;

    const calculate = () => {
        const amount = parseFloat(amountIn.value) || 0;
        const rate = (parseFloat(rateIn.value) || 0) / 100;
        const years = parseFloat(yearsIn.value) || 0;

        // Future Value in terms of today's purchasing power: PV = FV / (1 + r)^n
        // Or if we want to see what $1000 today will be worth in the future:
        const futurePower = amount / Math.pow(1 + rate, years);
        const loss = ((amount - futurePower) / amount) * 100;

        valueRes.textContent = `$${futurePower.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
        detailsRes.textContent = `Effective loss in purchasing power: ${loss.toFixed(2)}%`;
    };

    [amountIn, rateIn, yearsIn].forEach(inp => inp.addEventListener('input', calculate));
    calculate();
}
