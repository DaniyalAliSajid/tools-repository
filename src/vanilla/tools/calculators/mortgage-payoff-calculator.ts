import { getCurrencyOptionsHTML } from '../../utils/currencies';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="mp-currency">Currency</label>
          <select id="mp-currency" class="input-field">
            ${getCurrencyOptionsHTML()}
          </select>
        </div>
        <div class="input-group">
          <label for="mp-balance">Remaining Balance</label>
          <input type="number" class="input-field" id="mp-balance" value="250000">
        </div>
        <div class="input-group">
          <label for="mp-rate">Interest Rate (%)</label>
          <input type="number" class="input-field" id="mp-rate" value="4.0" step="0.1">
        </div>
        <div class="input-group">
          <label for="mp-term">Remaining Term (Years)</label>
          <input type="number" class="input-field" id="mp-term" value="25">
        </div>
        <div class="input-group">
          <label for="mp-extra">Extra Monthly Payment</label>
          <input type="number" class="input-field" id="mp-extra" value="500">
        </div>
      </div>

      <div class="input-group">
        <label>Payoff Estimation</label>
        <div class="result-box" id="mp-result" style="text-align: center; padding: var(--space-8);">
           <div id="mp-time-saved" style="font-size: var(--fs-xl); font-weight: 700; color: var(--color-primary);">--</div>
           <div id="mp-interest-saved" style="margin-top: var(--space-2); font-weight: 600; color: #166534;">Interest Saved: --</div>
        </div>
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
