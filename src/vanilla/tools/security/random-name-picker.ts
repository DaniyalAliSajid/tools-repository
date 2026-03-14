export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="rnp-input">Enter names/items (one per line)</label>
        <textarea class="input-field" id="rnp-input" rows="8" placeholder="Alice\nBob\nCharlie\nDiana\nEve"></textarea>
      </div>
      <div class="input-group">
        <label for="rnp-count">Number of winners</label>
        <input type="number" class="input-field" id="rnp-count" value="1" min="1" />
      </div>
      <button class="btn btn--primary btn--block" id="btn-pick">🎯 Pick Random</button>
      <div id="rnp-result" style="display:none;">
        <div style="text-align:center;padding:var(--space-8);background:var(--color-primary-light);border-radius:var(--radius-xl);">
          <div style="font-size:var(--fs-sm);color:var(--color-text-muted);text-transform:uppercase;letter-spacing:.05em;margin-bottom:var(--space-2);">🎉 Selected</div>
          <div id="rnp-winner" style="font-size:var(--fs-3xl);font-weight:var(--fw-bold);color:var(--color-primary);"></div>
        </div>
      </div>
    </div>
  `;

    document.getElementById('btn-pick')!.addEventListener('click', () => {
        const text = (document.getElementById('rnp-input') as HTMLTextAreaElement).value;
        const names = text.split('\n').map((n) => n.trim()).filter(Boolean);
        const count = Math.min(
            parseInt((document.getElementById('rnp-count') as HTMLInputElement).value) || 1,
            names.length
        );

        if (names.length === 0) return;

        // Shuffle and pick
        const shuffled = [...names].sort(() => Math.random() - 0.5);
        const winners = shuffled.slice(0, count);

        document.getElementById('rnp-result')!.style.display = 'block';

        // Animation effect
        const winnerEl = document.getElementById('rnp-winner')!;
        let i = 0;
        const interval = setInterval(() => {
            winnerEl.textContent = names[Math.floor(Math.random() * names.length)];
            i++;
            if (i > 15) {
                clearInterval(interval);
                winnerEl.textContent = winners.join('\n');
            }
        }, 80);
    });
}
