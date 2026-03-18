export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Financial Data</h4>
        <div class="input-group">
          <label for="inf-amount">Initial Principal Amount</label>
          <input type="number" class="input-field" id="inf-amount" value="1000" style="padding: var(--space-3);">
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="inf-rate">Annual Inflation (%)</label>
            <input type="number" class="input-field" id="inf-rate" value="3" step="0.1" style="padding: var(--space-3);">
          </div>
          <div class="input-group">
            <label for="inf-years">Duration (Years)</label>
            <input type="number" class="input-field" id="inf-years" value="10" style="padding: var(--space-3);">
          </div>
        </div>
      </div>

      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Concept:</strong> Inflation reduces the purchasing power of your money over time. This calculation shows what your initial amount will be "worth" in the future.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Purchasing Power Result</h3>
      </div>
      <div class="result-box" id="inf-result" style="padding: var(--space-12); display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--color-surface-hover); min-height: 250px;">
         <div style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: var(--space-2);">FUTURE VALUE</div>
         <div id="inf-value" style="font-size: 4rem; font-weight: 900; color: #991b1b; line-height: 1;">$744.09</div>
         <div id="inf-details" style="margin-top: var(--space-6); font-weight: 600; color: var(--color-text-secondary); background: rgba(153, 27, 27, 0.1); padding: var(--space-2) var(--space-4); border-radius: var(--radius-full);">Effective loss: 25.59%</div>
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
