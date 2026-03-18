export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Tactile Actions</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
          <div class="stat-card" style="cursor: pointer; background: var(--color-surface-hover); transition: transform 0.2s;" id="coin-area">
            <div id="coin-result" style="font-size: 5rem; margin-bottom: var(--space-2); filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));">🪙</div>
            <div class="stat-card__label" style="font-weight: 700;">Flip Coin</div>
          </div>
          <div class="stat-card" style="cursor: pointer; background: var(--color-surface-hover); transition: transform 0.2s;" id="dice-area">
            <div id="dice-result" style="font-size: 5rem; margin-bottom: var(--space-2); filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));">🎲</div>
            <div class="stat-card__label" style="font-weight: 700;">Roll Dice</div>
          </div>
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> Use these tools for quick decision-making or as simple game mechanics.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Interactive History</h3>
        <button class="btn btn--secondary btn--sm" id="clear-history">🗑️ Clear</button>
      </div>
      <div class="result-box" id="roll-history" style="height: calc(100% - 48px); min-height: 400px; overflow-y: auto; padding: var(--space-4); background: var(--color-surface-hover); display: flex; flex-direction: column; gap: var(--space-2);">
        <p style="color: var(--color-text-muted); text-align: center; margin-top: var(--space-8); font-size: var(--fs-sm);">No history yet. Start flipping or rolling!</p>
      </div>
    </div>
  `;

    const coinArea = document.getElementById('coin-area')!;
    const diceArea = document.getElementById('dice-area')!;
    const coinRes = document.getElementById('coin-result')!;
    const diceRes = document.getElementById('dice-result')!;
    const historyDiv = document.getElementById('roll-history')!;
    const clearBtn = document.getElementById('clear-history')!;

    const addHistory = (text: string) => {
        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        const item = document.createElement('div');
        item.style.padding = 'var(--space-3) var(--space-4)';
        item.style.background = 'var(--color-surface)';
        item.style.borderRadius = 'var(--radius-md)';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        item.style.alignItems = 'center';
        item.style.boxShadow = 'var(--shadow-sm)';
        item.innerHTML = `
            <span style="font-weight: 600; color: var(--color-text);">${text}</span>
            <span style="font-size: var(--fs-xs); color: var(--color-text-muted);">${time}</span>
        `;
        
        if (historyDiv.querySelector('p')) historyDiv.innerHTML = '';
        historyDiv.prepend(item);
    };

    coinArea.addEventListener('click', () => {
        coinRes.style.transform = 'rotateY(720deg)';
        coinRes.style.transition = 'transform 0.6s ease-out';

        setTimeout(() => {
            const isHeads = Math.random() > 0.5;
            const result = isHeads ? 'Heads' : 'Tails';
            coinRes.textContent = isHeads ? '🤴' : '🏦';
            coinRes.style.transform = '';
            coinRes.style.transition = '';
            addHistory(`Coin Flip: ${result}`);
        }, 600);
    });

    diceArea.addEventListener('click', () => {
        diceRes.style.transform = 'rotate(360deg)';
        diceRes.style.transition = 'transform 0.4s ease-out';

        setTimeout(() => {
            const roll = Math.floor(Math.random() * 6) + 1;
            const diceFaces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
            diceRes.textContent = diceFaces[roll - 1];
            diceRes.style.transform = '';
            diceRes.style.transition = '';
            addHistory(`Dice Roll: ${roll}`);
        }, 400);
    });

    clearBtn.addEventListener('click', () => {
        historyDiv.innerHTML = '<p style="color: var(--color-text-muted); text-align: center; margin-top: var(--space-8); font-size: var(--fs-sm);">No history yet. Start flipping or rolling!</p>';
    });
}
