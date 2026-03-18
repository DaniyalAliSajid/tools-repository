export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Contestants</h4>
        <div class="input-group">
          <label for="rnp-input">Entries List</label>
          <textarea class="input-field" id="rnp-input" rows="12" placeholder="Alice\nBob\nCharlie\nDiana\nEve" style="padding: var(--space-4); font-size: 1rem; line-height: 1.5;"></textarea>
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="rnp-count">Number of Winners</label>
          <input type="number" class="input-field" id="rnp-count" value="1" min="1" style="padding: var(--space-3);" />
        </div>
        <button class="btn btn--primary btn--block btn--lg" id="btn-pick" style="margin-top: var(--space-6);">🎯 Start Random Selection</button>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Selection Result</h3>
      </div>
      <div id="rnp-result" style="display:none; height: 100%;">
        <div style="text-align:center; padding:var(--space-12); background: var(--color-surface-hover); border-radius:var(--radius-2xl); border: 2px solid var(--color-primary-border); height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center;">
          <div style="font-size:var(--fs-xs); color:var(--color-primary); text-transform:uppercase; letter-spacing: 0.2em; margin-bottom:var(--space-6); font-weight: 800;">🎉 Winner Announced</div>
          <div id="rnp-winner" style="font-size: 4rem; font-weight: 900; color: var(--color-primary); line-height: 1.1; letter-spacing: -0.02em; word-break: break-all;"></div>
          <div style="margin-top: var(--space-8); opacity: 0.1; font-size: 6rem;">🏆</div>
        </div>
      </div>
      <div id="rnp-placeholder" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: var(--color-text-muted); text-align: center; background: var(--color-surface-hover); border-radius: var(--radius-2xl); border: 2px dashed var(--color-border);">
        <div style="font-size: 4rem; margin-bottom: var(--space-4); opacity: 0.2;">🎁</div>
        <p style="font-size: var(--fs-sm);">Click the button to pick a winner</p>
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
        document.getElementById('rnp-placeholder')!.style.display = 'none';

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
