export function render(container: HTMLElement): void {
    let timerId: any = null;

    container.innerHTML = `
    <div class="section-gap" style="text-align: center;">
      <div class="input-group" style="max-width: 400px; margin: 0 auto;">
        <label for="cd-date">Target Date & Time</label>
        <input type="datetime-local" id="cd-date" class="input-field">
      </div>

      <div id="cd-display" style="display: flex; gap: var(--space-4); justify-content: center; margin: var(--space-8) 0;">
        <div class="result-box" style="padding: var(--space-6); min-width: 80px; background: white;">
           <div id="cd-days" style="font-size: 3rem; font-weight: 700;">00</div>
           <div style="font-size: var(--fs-sm); opacity: 0.7;">Days</div>
        </div>
        <div class="result-box" style="padding: var(--space-6); min-width: 80px; background: white;">
           <div id="cd-hours" style="font-size: 3rem; font-weight: 700;">00</div>
           <div style="font-size: var(--fs-sm); opacity: 0.7;">Hours</div>
        </div>
        <div class="result-box" style="padding: var(--space-6); min-width: 80px; background: white;">
           <div id="cd-mins" style="font-size: 3rem; font-weight: 700;">00</div>
           <div style="font-size: var(--fs-sm); opacity: 0.7;">Mins</div>
        </div>
        <div class="result-box" style="padding: var(--space-6); min-width: 80px; background: white;">
           <div id="cd-secs" style="font-size: 3rem; font-weight: 700;">00</div>
           <div style="font-size: var(--fs-sm); opacity: 0.7;">Secs</div>
        </div>
      </div>

      <div id="cd-message" style="font-weight: 600; color: var(--color-primary); min-height: 1.5rem;"></div>
    </div>
  `;

    const dateIn = document.getElementById('cd-date') as HTMLInputElement;
    const daysEl = document.getElementById('cd-days')!;
    const hoursEl = document.getElementById('cd-hours')!;
    const minsEl = document.getElementById('cd-mins')!;
    const secsEl = document.getElementById('cd-secs')!;
    const messageEl = document.getElementById('cd-message')!;

    // Default to 1 week from now
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const offset = nextWeek.getTimezoneOffset() * 60000;
    dateIn.value = new Date(nextWeek.getTime() - offset).toISOString().slice(0, 16);

    const update = () => {
        const target = new Date(dateIn.value).getTime();
        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) {
            clearInterval(timerId);
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minsEl.textContent = '00';
            secsEl.textContent = '00';
            messageEl.textContent = 'Countdown Finished!';
            return;
        }

        messageEl.textContent = '';
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);

        daysEl.textContent = d.toString().padStart(2, '0');
        hoursEl.textContent = h.toString().padStart(2, '0');
        minsEl.textContent = m.toString().padStart(2, '0');
        secsEl.textContent = s.toString().padStart(2, '0');
    };

    dateIn.addEventListener('input', () => {
        clearInterval(timerId);
        update();
        timerId = setInterval(update, 1000);
    });

    update();
    timerId = setInterval(update, 1000);
}
