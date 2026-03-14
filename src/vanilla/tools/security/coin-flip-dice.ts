export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="stat-card" style="cursor: pointer;" id="coin-area">
          <div class="stat-card__value" id="coin-result" style="font-size: 4rem;">🪙</div>
          <div class="stat-card__label">Click to Flip Coin</div>
        </div>
        <div class="stat-card" style="cursor: pointer;" id="dice-area">
          <div class="stat-card__value" id="dice-result" style="font-size: 4rem;">🎲</div>
          <div class="stat-card__label">Click to Roll Dice</div>
        </div>
      </div>

      <div class="input-group">
        <label>History</label>
        <div class="result-box" id="roll-history" style="min-height: 100px; max-height: 200px; overflow-y: auto; font-size: var(--fs-xs);"></div>
        <button class="btn btn--secondary btn--sm result-box__copy" id="clear-history">Clear History</button>
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
        const time = new Date().toLocaleTimeString();
        historyDiv.innerHTML = `<div>[${time}] ${text}</div>` + historyDiv.innerHTML;
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
        historyDiv.innerHTML = '';
    });
}
