export function render(container: HTMLElement): void {
    const POSITIVE_WORDS = ['good', 'great', 'excellent', 'happy', 'love', 'wonderful', 'amazing', 'best', 'awesome', 'nice', 'fantastic', 'perfect', 'sunny', 'joy', 'smile'];
    const NEGATIVE_WORDS = ['bad', 'horrible', 'terrible', 'sad', 'hate', 'awful', 'worst', 'poor', 'wrong', 'fail', 'angry', 'cry', 'dark', 'pain', 'broken'];

    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="sentiment-input">Analyze Sentiment</label>
        <textarea class="input-field" id="sentiment-input" rows="5" placeholder="Enter text to analyze..."></textarea>
      </div>

      <div class="input-group">
        <label>Result</label>
        <div class="result-box" id="sentiment-result" style="text-align: center; padding: var(--space-8);">
           <div id="sentiment-emoji" style="font-size: 4rem; margin-bottom: var(--space-4);">🤔</div>
           <div id="sentiment-label" style="font-size: var(--fs-xl); font-weight: 700; color: var(--color-text-muted);">Neutral</div>
           <div id="sentiment-score" style="margin-top: var(--space-2); opacity: 0.7;">Score: 0</div>
        </div>
      </div>
    </div>
  `;

    const input = document.getElementById('sentiment-input') as HTMLTextAreaElement;
    const emoji = document.getElementById('sentiment-emoji')!;
    const label = document.getElementById('sentiment-label')!;
    const scoreEl = document.getElementById('sentiment-score')!;

    const analyze = () => {
        const text = input.value.toLowerCase();
        if (!text.trim()) {
            emoji.textContent = '🤔';
            label.textContent = 'Neutral';
            label.style.color = 'var(--color-text-muted)';
            scoreEl.textContent = 'Score: 0';
            return;
        }

        const words = text.split(/\W+/);
        let score = 0;

        words.forEach(word => {
            if (POSITIVE_WORDS.includes(word)) score++;
            if (NEGATIVE_WORDS.includes(word)) score--;
        });

        scoreEl.textContent = `Score: ${score}`;

        if (score > 0) {
            emoji.textContent = '😊';
            label.textContent = 'Positive';
            label.style.color = '#166534';
        } else if (score < 0) {
            emoji.textContent = '😟';
            label.textContent = 'Negative';
            label.style.color = '#991b1b';
        } else {
            emoji.textContent = '😐';
            label.textContent = 'Neutral';
            label.style.color = 'var(--color-text-muted)';
        }
    };

    input.addEventListener('input', analyze);
}
