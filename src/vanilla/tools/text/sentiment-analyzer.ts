export function render(container: HTMLElement): void {
    const POSITIVE_WORDS = ['good', 'great', 'excellent', 'happy', 'love', 'wonderful', 'amazing', 'best', 'awesome', 'nice', 'fantastic', 'perfect', 'sunny', 'joy', 'smile'];
    const NEGATIVE_WORDS = ['bad', 'horrible', 'terrible', 'sad', 'hate', 'awful', 'worst', 'poor', 'wrong', 'fail', 'angry', 'cry', 'dark', 'pain', 'broken'];

    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="sentiment-input">Your Text / feedback</label>
        <textarea class="input-field" id="sentiment-input" rows="16" placeholder="Paste content to analyze emotional tone..." style="resize: vertical; font-family: var(--font-main); font-size: 1rem; line-height: 1.6;"></textarea>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>How it works:</strong> Our simplified algorithm checks for over 30 positive and negative emotional markers to determine the overall sentiment of your text.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Sentiment Verdict</h3>
      </div>
      
      <div class="result-box" id="sentiment-result" style="padding: var(--space-12); display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 350px;">
        <div id="sentiment-emoji" style="font-size: 6rem; margin-bottom: var(--space-6); filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1));">🤔</div>
        <div id="sentiment-label" style="font-size: 2rem; font-weight: 800; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Neutral</div>
        <div style="margin-top: var(--space-6); width: 100%; max-width: 200px;">
          <div id="sentiment-score" style="text-align: center; font-size: var(--fs-sm); font-weight: 600; margin-bottom: 8px;">Confidence Score: 0</div>
          <div style="height: 6px; background: var(--color-surface-hover); border-radius: 3px; overflow: hidden;">
            <div id="sentiment-bar" style="height: 100%; width: 50%; background: var(--color-text-muted); transition: all 0.5s ease;"></div>
          </div>
        </div>
      </div>
    </div>
  `;

    const input = document.getElementById('sentiment-input') as HTMLTextAreaElement;
    const emoji = document.getElementById('sentiment-emoji')!;
    const label = document.getElementById('sentiment-label')!;
    const scoreEl = document.getElementById('sentiment-score')!;
    const bar = document.getElementById('sentiment-bar')!;

    const analyze = () => {
        const text = input.value.toLowerCase();
        if (!text.trim()) {
            emoji.textContent = '🤔';
            label.textContent = 'Neutral';
            label.style.color = 'var(--color-text-muted)';
            scoreEl.textContent = 'Confidence Score: 0';
            bar.style.width = '50%';
            bar.style.background = 'var(--color-text-muted)';
            return;
        }

        const words = text.split(/\W+/);
        let score = 0;

        words.forEach(word => {
            if (POSITIVE_WORDS.includes(word)) score++;
            if (NEGATIVE_WORDS.includes(word)) score--;
        });

        scoreEl.textContent = `Confidence Score: ${Math.abs(score)}`;

        if (score > 0) {
            emoji.textContent = '😊';
            label.textContent = 'Positive';
            label.style.color = '#059669';
            bar.style.width = '100%';
            bar.style.background = '#059669';
        } else if (score < 0) {
            emoji.textContent = '😟';
            label.textContent = 'Negative';
            label.style.color = '#dc2626';
            bar.style.width = '100%';
            bar.style.background = '#dc2626';
        } else {
            emoji.textContent = '😐';
            label.textContent = 'Neutral';
            label.style.color = 'var(--color-text-muted)';
            bar.style.width = '50%';
            bar.style.background = 'var(--color-text-muted)';
        }
    };

    input.addEventListener('input', analyze);
}
