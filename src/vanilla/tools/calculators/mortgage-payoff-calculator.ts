import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Current Mortgage</h4>
        <div class="input-group">
          <label for="mp-currency">Currency Symbol</label>
          <select id="mp-currency" class="input-field" style="padding: var(--space-3);">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="mp-balance">Remaining Principal Balance</label>
          <input type="number" class="input-field" id="mp-balance" value="250000" style="padding: var(--space-3);">
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <div class="input-group">
            <label for="mp-rate">Interest Rate (%)</label>
            <input type="number" class="input-field" id="mp-rate" value="4.0" step="0.1" style="padding: var(--space-3);">
          </div>
          <div class="input-group">
            <label for="mp-term">Remaining Term (Yrs)</label>
            <input type="number" class="input-field" id="mp-term" value="25" style="padding: var(--space-3);">
          </div>
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="mp-extra">Extra Monthly Payment</label>
          <input type="number" class="input-field" id="mp-extra" value="500" style="padding: var(--space-3); border: 1px solid var(--color-primary-border); background: var(--color-primary-lightish);">
        </div>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Acceleration Analysis</h3>
      </div>
      <div class="result-box" id="mp-result" style="padding: var(--space-10); display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--color-surface-hover); min-height: 350px;">
         <div style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: var(--space-2);">ESTIMATED TIME SAVED</div>
         <div id="mp-time-saved" style="font-size: 2.5rem; font-weight: 800; color: var(--color-primary); text-align: center; line-height: 1.1;">--</div>
         <div id="mp-interest-saved" style="margin-top: var(--space-8); font-size: 1.25rem; font-weight: 700; color: #166534; background: rgba(22, 101, 52, 0.1); padding: var(--space-3) var(--space-6); border-radius: var(--radius-lg); border: 1px solid rgba(22, 101, 52, 0.2);">Interest Saved: --</div>
         <p style="margin-top: var(--space-6); font-size: var(--fs-xs); color: var(--color-text-muted); text-align: center; max-width: 300px;">
            By paying an extra amount monthly, you significantly reduce the total interest paid and shorten your mortgage term.
         </p>
      </div>
    </div>
  `;

  const balanceIn = document.getElementById('mp-balance') as HTMLInputElement;
  const rateIn = document.getElementById('mp-rate') as HTMLInputElement;
  const termIn = document.getElementById('mp-term') as HTMLInputElement;
  const extraIn = document.getElementById('mp-extra') as HTMLInputElement;
  const currIn = document.getElementById('mp-currency') as HTMLSelectElement;
  const timeSavedRes = document.getElementById('mp-time-saved')!;
  const interestSavedRes = document.getElementById('mp-interest-saved')!;

  const calculate = () => {
    const balance = parseFloat(balanceIn.value) || 0;
    const annualRate = (parseFloat(rateIn.value) || 0) / 100;
    const monthlyRate = annualRate / 12;
    const termMonths = (parseFloat(termIn.value) || 0) * 12;
    const extra = parseFloat(extraIn.value) || 0;
    const symbol = currIn.value;

    if (balance <= 0 || termMonths <= 0) return;

    // Normal Monthly Payment
    let normalPayment = 0;
    if (monthlyRate > 0) {
      normalPayment = (balance * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    } else {
      normalPayment = balance / termMonths;
    }

    const totalInterestNormal = (normalPayment * termMonths) - balance;

    // Accelerated Payoff
    const acceleratedPayment = normalPayment + extra;
    let b = balance;
    let months = 0;
    let totalInterestAcc = 0;

    while (b > 0 && months < 600) { // Safety limit 50 years
      const interest = b * monthlyRate;
      totalInterestAcc += interest;
      const principal = acceleratedPayment - interest;
      if (principal <= 0 && monthlyRate > 0) break; // Won't pay off
      b -= principal;
      months++;
    }

    if (b > 0) {
      timeSavedRes.textContent = "Extra payment too low";
      interestSavedRes.textContent = "Balance continues to grow or stagnates.";
      return;
    }

    const monthsSaved = termMonths - months;
    const yearsSaved = Math.floor(monthsSaved / 12);
    const remainingMonths = monthsSaved % 12;
    const moneySaved = totalInterestNormal - totalInterestAcc;

    timeSavedRes.textContent = `Time Saved: ${yearsSaved} yrs, ${remainingMonths} mos`;
    interestSavedRes.textContent = `Interest Saved: ${symbol}${Math.max(0, moneySaved).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  [balanceIn, rateIn, termIn, extraIn, currIn].forEach(inp => inp.addEventListener('input', calculate));
  calculate();
}
