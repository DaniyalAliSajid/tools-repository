import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="sg-currency">Currency</label>
          <select id="sg-currency" class="input-field">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="input-group">
          <label for="sg-target">Savings Goal</label>
          <input type="number" class="input-field" id="sg-target" value="10000">
        </div>
        <div class="input-group">
          <label for="sg-current">Current Savings</label>
          <input type="number" class="input-field" id="sg-current" value="1000">
        </div>
        <div class="input-group">
          <label for="sg-monthly">Monthly Contribution</label>
          <input type="number" class="input-field" id="sg-monthly" value="200">
        </div>
        <div class="input-group">
          <label for="sg-rate">Annual Interest Rate (%)</label>
          <input type="number" class="input-field" id="sg-rate" value="5" step="0.1">
        </div>
      </div>

      <div class="input-group">
        <label>Estimation Result</label>
        <div class="result-box" id="sg-result" style="text-align: center; padding: var(--space-8);">
           <div id="sg-time" style="font-size: var(--fs-xl); font-weight: 700; color: var(--color-primary);">--</div>
           <div id="sg-details" style="margin-top: var(--space-2); opacity: 0.7;">Fill details to see your timeline</div>
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
