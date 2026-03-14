import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="tip-currency">Currency</label>
          <select id="tip-currency" class="input-field">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="input-group">
          <label for="tip-bill">Bill Amount</label>
          <input type="number" class="input-field" id="tip-bill" placeholder="0.00" step="0.01">
        </div>
        <div class="input-group">
          <label for="tip-percentage">Tip Percentage (%)</label>
          <input type="number" class="input-field" id="tip-percentage" value="15" step="1">
        </div>
        <div class="input-group">
          <label for="tip-people">Number of People</label>
          <input type="number" class="input-field" id="tip-people" value="1" min="1">
        </div>
      </div>

      <div class="stats-row" id="tip-stats">
        <div class="stat-card">
          <div class="stat-card__value" id="tip-amount">--</div>
          <div class="stat-card__label">Tip Amount</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="tip-total">--</div>
          <div class="stat-card__label">Total Bill</div>
        </div>
        <div class="stat-card">
          <div class="stat-card__value" id="tip-per-person">--</div>
          <div class="stat-card__label">Total Per Person</div>
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
