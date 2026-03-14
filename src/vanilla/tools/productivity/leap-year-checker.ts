export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap" style="text-align: center;">
      <div class="input-group" style="max-width: 300px; margin: 0 auto;">
        <label for="ly-year">Enter Year</label>
        <input type="number" id="ly-year" class="input-field" value="${new Date().getFullYear()}">
      </div>

      <div class="input-group" style="margin-top: var(--space-8);">
        <div id="ly-result" style="text-align: center; padding: var(--space-8); border-radius: 12px;">
           <div id="ly-emoji" style="font-size: 5rem; margin-bottom: var(--space-4);">🗓️</div>
           <div id="ly-text" style="font-size: var(--fs-xl); font-weight: 700;">--</div>
        </div>
      </div>
    </div>
  `;

    const yearIn = document.getElementById('ly-year') as HTMLInputElement;
    const resultBox = document.getElementById('ly-result')!;
    const emojiEl = document.getElementById('ly-emoji')!;
    const textEl = document.getElementById('ly-text')!;

    const check = () => {
        const year = parseInt(yearIn.value);
        if (isNaN(year)) return;

        const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

        if (isLeap) {
            resultBox.style.backgroundColor = '#dcfce7';
            emojiEl.textContent = '✅';
            textEl.textContent = `${year} is a Leap Year!`;
            textEl.style.color = '#166534';
        } else {
            resultBox.style.backgroundColor = '#fee2e2';
            emojiEl.textContent = '❌';
            textEl.textContent = `${year} is NOT a Leap Year.`;
            textEl.style.color = '#991b1b';
        }
    };

    yearIn.addEventListener('input', check);
    check();
}
