export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap" style="text-align: center;">
      <div class="input-group">
        <label for="wheel-options">Options (one per line)</label>
        <textarea id="wheel-options" class="input-field" rows="5" placeholder="Pizza\nBurgers\nSalad\nSushi"></textarea>
      </div>

      <div style="margin: var(--space-8) 0;">
        <div id="wheel-result" style="font-size: 3rem; font-weight: 700; min-height: 4rem; color: var(--color-primary);">?</div>
      </div>

      <button class="btn btn--primary btn--lg" id="wheel-spin">Spin the Wheel!</button>
    </div>
  `;

    const optionsIn = document.getElementById('wheel-options') as HTMLTextAreaElement;
    const resultEl = document.getElementById('wheel-result')!;
    const spinBtn = document.getElementById('wheel-spin')!;

    spinBtn.addEventListener('click', () => {
        const options = optionsIn.value.split('\n').map(o => o.trim()).filter(o => o);
        if (options.length === 0) {
            resultEl.textContent = "Add options!";
            return;
        }

        resultEl.classList.add('animate-pulse');
        let count = 0;
        const interval = setInterval(() => {
            resultEl.textContent = options[Math.floor(Math.random() * options.length)];
            count++;
            if (count > 20) {
                clearInterval(interval);
                resultEl.classList.remove('animate-pulse');
                const final = options[Math.floor(Math.random() * options.length)];
                resultEl.textContent = final;
                resultEl.style.color = '#166534';
                setTimeout(() => resultEl.style.color = 'var(--color-primary)', 2000);
            }
        }, 50);
    });
}
