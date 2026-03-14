import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="fuel-currency">Currency</label>
          <select id="fuel-currency" class="input-field">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="input-group">
          <label for="fuel-dist">Distance (km or miles)</label>
          <input type="number" class="input-field" id="fuel-dist" value="100">
        </div>
        <div class="input-group">
          <label for="fuel-eff">Fuel Efficiency (MPG or L/100km)</label>
          <input type="number" class="input-field" id="fuel-eff" value="8">
        </div>
        <div class="input-group">
          <label for="fuel-price">Fuel Price (per unit)</label>
          <input type="number" class="input-field" id="fuel-price" value="1.5">
        </div>
        <div class="input-group">
          <label for="fuel-type">Efficiency Type</label>
          <select id="fuel-type" class="input-field">
            <option value="l100">L/100km</option>
            <option value="mpg">MPG (US)</option>
          </select>
        </div>
      </div>

      <div class="input-group">
        <label>Total Trip Cost</label>
        <div class="result-box" id="fuel-result" style="text-align: center; padding: var(--space-8);">
           <div id="fuel-cost" style="font-size: 3rem; font-weight: 700; color: var(--color-primary);">$12.00</div>
           <div id="fuel-usage" style="margin-top: var(--space-2); opacity: 0.7;">Total fuel: 8.00 units</div>
        </div>
      </div>
    </div>
  `;

  const distIn = document.getElementById('fuel-dist') as HTMLInputElement;
  const effIn = document.getElementById('fuel-eff') as HTMLInputElement;
  const priceIn = document.getElementById('fuel-price') as HTMLInputElement;
  const typeIn = document.getElementById('fuel-type') as HTMLSelectElement;
  const currIn = document.getElementById('fuel-currency') as HTMLSelectElement;
  const costRes = document.getElementById('fuel-cost')!;
  const usageRes = document.getElementById('fuel-usage')!;

  const calculate = () => {
    const dist = parseFloat(distIn.value) || 0;
    const eff = parseFloat(effIn.value) || 0;
    const price = parseFloat(priceIn.value) || 0;
    const type = typeIn.value;
    const symbol = currIn.value;

    let totalFuel = 0;
    if (type === 'l100') {
      totalFuel = (dist / 100) * eff;
    } else {
      totalFuel = dist / eff;
    }

    const totalCost = totalFuel * price;

    costRes.textContent = `${symbol}${totalCost.toFixed(2)}`;
    usageRes.textContent = `Total fuel: ${totalFuel.toFixed(2)} units`;
  };

  [distIn, effIn, priceIn, typeIn, currIn].forEach(inp => inp.addEventListener('input', calculate));
  calculate();
}
