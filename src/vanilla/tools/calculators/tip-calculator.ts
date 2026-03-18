import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Billing Details</h4>
        <div class="input-group">
          <label for="tip-currency">Currency</label>
          <select id="tip-currency" class="input-field" style="padding: var(--space-3); font-weight: 600;">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="tip-bill">Subtotal Bill Amount</label>
          <input type="number" class="input-field" id="tip-bill" placeholder="0.00" step="0.01" style="padding: var(--space-3); font-weight: 700;">
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="tip-percentage">Tip Percentage (%)</label>
            <input type="number" class="input-field" id="tip-percentage" value="15" step="1" style="padding: var(--space-3);">
          </div>
          <div class="input-group">
            <label for="tip-people">Number of People</label>
            <input type="number" class="input-field" id="tip-people" value="1" min="1" style="padding: var(--space-3);">
          </div>
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Dining Tip:</strong> In many countries, a service charge is already included. Check your bill before adding more.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Interactive Share</h3>
      </div>
      
      <div class="result-box" style="padding: var(--space-10); display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--color-surface-hover); min-height: 350px;">
        <div style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: var(--space-2);">SPLIT PER PERSON</div>
        <div id="tip-per-person" style="font-size: 6rem; font-weight: 900; color: var(--color-primary); line-height: 1;">--</div>
        
        <div class="stats-row" style="margin-top: var(--space-10); width: 100%;">
          <div class="stat-card" style="padding: var(--space-4);">
            <div class="stat-card__value" id="tip-amount" style="font-size: 1.5rem; color: var(--color-text);">--</div>
            <div class="stat-card__label">Total Tip</div>
          </div>
          <div class="stat-card" style="padding: var(--space-4);">
            <div class="stat-card__value" id="tip-total" style="font-size: 1.5rem; color: var(--color-text);">--</div>
            <div class="stat-card__label">Total Bill</div>
          </div>
        </div>
      </div>
    </div>
  `;

  const billInput = document.getElementById('tip-bill') as HTMLInputElement;
  const tipInput = document.getElementById('tip-percentage') as HTMLInputElement;
  const peopleInput = document.getElementById('tip-people') as HTMLInputElement;
  const currIn = document.getElementById('tip-currency') as HTMLSelectElement;

  const tipVal = document.getElementById('tip-amount')!;
  const totalVal = document.getElementById('tip-total')!;
  const personVal = document.getElementById('tip-per-person')!;

  const update = () => {
    const bill = parseFloat(billInput.value) || 0;
    const tipPercent = parseFloat(tipInput.value) || 0;
    const people = parseInt(peopleInput.value) || 1;
    const symbol = currIn.value;

    const totalTip = (bill * tipPercent) / 100;
    const totalBill = bill + totalTip;
    const perPerson = totalBill / people;

    tipVal.textContent = `${symbol}${totalTip.toFixed(2)}`;
    totalVal.textContent = `${symbol}${totalBill.toFixed(2)}`;
    personVal.textContent = `${symbol}${perPerson.toFixed(2)}`;
  };

  [billInput, tipInput, peopleInput, currIn].forEach(inp => inp.addEventListener('input', update));
  update();
}
