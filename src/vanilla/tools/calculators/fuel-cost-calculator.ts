import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Trip Information</h4>
        <div class="input-group">
          <label for="fuel-currency">Currency</label>
          <select id="fuel-currency" class="input-field" style="padding: var(--space-3);">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="fuel-dist">Total Distance</label>
            <input type="number" class="input-field" id="fuel-dist" value="100" style="padding: var(--space-3);">
          </div>
          <div class="input-group">
            <label for="fuel-price">Fuel Price (per unit)</label>
            <input type="number" class="input-field" id="fuel-price" value="1.5" style="padding: var(--space-3);">
          </div>
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="fuel-eff">Fuel Efficiency</label>
            <input type="number" class="input-field" id="fuel-eff" value="8" style="padding: var(--space-3);">
          </div>
          <div class="input-group">
            <label for="fuel-type">Efficiency Metric</label>
            <select id="fuel-type" class="input-field" style="padding: var(--space-3);">
              <option value="l100">L / 100km</option>
              <option value="mpg">MPG (US)</option>
            </select>
          </div>
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Pro Tip:</strong> Maintaining steady speeds and avoiding rapid acceleration can improve fuel efficiency by up to 15%.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Trip Cost Estimate</h3>
      </div>
      <div class="result-box" style="padding: var(--space-10); display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--color-surface-hover); min-height: 350px;">
        <div style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: var(--space-2);">TOTAL TRIP COST</div>
        <div id="fuel-cost" style="font-size: 5rem; font-weight: 900; color: var(--color-primary); line-height: 1;">$12.00</div>
        
        <div id="fuel-usage" style="margin-top: var(--space-8); font-size: var(--fs-sm); font-weight: 600; color: var(--color-text-secondary); padding: var(--space-2) var(--space-4); background: var(--color-primary-light); border-radius: var(--radius-full);">Total fuel: 8.00 units</div>
        
        <div style="margin-top: var(--space-10); width: 100%; height: 2px; background: var(--color-border); position: relative;">
          <div style="position: absolute; left: 0; top: -4px; width: 10px; height: 10px; background: var(--color-primary); border-radius: 50%;"></div>
          <div style="position: absolute; right: 0; top: -4px; width: 10px; height: 10px; background: var(--color-text-muted); border-radius: 50%;"></div>
        </div>
        <div style="margin-top: var(--space-3); display: flex; justify-content: space-between; width: 100%; font-size: var(--fs-xs); color: var(--color-text-muted); font-weight: 600;">
          <span>START</span>
          <span>DESTINATION</span>
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
