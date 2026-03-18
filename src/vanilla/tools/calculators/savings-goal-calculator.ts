import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Goal details</h4>
        <div class="input-group">
          <label for="sg-currency">Currency</label>
          <select id="sg-currency" class="input-field" style="padding: var(--space-3);">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="sg-target">Savings Goal Amount</label>
          <input type="number" class="input-field" id="sg-target" value="10000" style="padding: var(--space-3);">
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="sg-current">Initial Deposit</label>
            <input type="number" class="input-field" id="sg-current" value="1000" style="padding: var(--space-3);">
          </div>
          <div class="input-group">
            <label for="sg-monthly">Monthly Add</label>
            <input type="number" class="input-field" id="sg-monthly" value="200" style="padding: var(--space-3);">
          </div>
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="sg-rate">Expected Annual Interest (%)</label>
          <input type="number" class="input-field" id="sg-rate" value="5" step="0.1" style="padding: var(--space-3);">
        </div>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Timeline Estimation</h3>
      </div>
      <div class="result-box" id="sg-result" style="padding: var(--space-10); display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--color-surface-hover); min-height: 350px;">
         <div style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: var(--space-3);">TIME TO REACH GOAL</div>
         <div id="sg-time" style="font-size: 3rem; font-weight: 900; color: var(--color-primary); text-align: center; line-height: 1.1;">--</div>
         <div id="sg-details" style="margin-top: var(--space-8); font-size: 1rem; color: var(--color-text-secondary); text-align: center; max-width: 320px; line-height: 1.5; font-weight: 500;">Fill details to see your timeline</div>
         
         <div style="margin-top: var(--space-10); display: flex; gap: var(--space-4); opacity: 0.3; filter: grayscale(1);">
            <div style="font-size: 2rem;">💰</div>
            <div style="font-size: 2rem;">📈</div>
            <div style="font-size: 2rem;">🏁</div>
         </div>
      </div>
    </div>
  `;

  const targetIn = document.getElementById('sg-target') as HTMLInputElement;
  const currentIn = document.getElementById('sg-current') as HTMLInputElement;
  const monthlyIn = document.getElementById('sg-monthly') as HTMLInputElement;
  const rateIn = document.getElementById('sg-rate') as HTMLInputElement;
  const currIn = document.getElementById('sg-currency') as HTMLSelectElement;
  const timeRes = document.getElementById('sg-time')!;
  const detailsRes = document.getElementById('sg-details')!;

  const calculate = () => {
    const target = parseFloat(targetIn.value);
    const current = parseFloat(currentIn.value);
    const monthly = parseFloat(monthlyIn.value);
    const rate = parseFloat(rateIn.value) / 100 / 12;
    const symbol = currIn.value;

    if (target <= current) {
      timeRes.textContent = "Goal reached!";
      detailsRes.textContent = "Your current savings already meet or exceed your target.";
      return;
    }

    if (monthly <= 0 && rate <= 0) {
      timeRes.textContent = "Infinity years";
      detailsRes.textContent = "With no monthly contribution or interest, you'll never reach the goal.";
      return;
    }

    let months = 0;
    if (rate > 0) {
      months = Math.log((target * rate + monthly) / (current * rate + monthly)) / Math.log(1 + rate);
    } else {
      months = (target - current) / monthly;
    }

    const years = Math.floor(months / 12);
    const remainingMonths = Math.ceil(months % 12);

    let timeStr = "";
    if (years > 0) timeStr += `${years} year${years > 1 ? 's' : ''} `;
    if (remainingMonths > 0) timeStr += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;

    timeRes.textContent = timeStr.trim();
    detailsRes.textContent = `At this rate, you'll save ${symbol}${target.toLocaleString()} in about ${timeStr.trim()}.`;
  };

  [targetIn, currentIn, monthlyIn, rateIn, currIn].forEach(inp => inp.addEventListener('input', calculate));
  calculate();
}
