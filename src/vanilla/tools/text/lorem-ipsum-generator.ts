const LOREM_WORDS: string[] =
    'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ');

export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="li-count">Number of paragraphs</label>
          <input type="number" class="input-field" id="li-count" value="3" min="1" max="50" />
        </div>
        <div class="input-group">
          <label for="li-sentPerPara">Sentences per paragraph</label>
          <input type="number" class="input-field" id="li-sentPerPara" value="5" min="1" max="20" />
        </div>
      </div>
      <div class="checkbox-group">
        <label class="checkbox-label">
          <input type="checkbox" id="li-startLorem" checked />
          Start with "Lorem ipsum..."
        </label>
      </div>
      <button class="btn btn--primary btn--block" id="btn-generate">Generate</button>
      <div class="input-group">
        <label>Generated Text</label>
        <textarea class="input-field" id="li-output" rows="12" readonly></textarea>
      </div>
      <button class="btn btn--secondary btn--block" id="btn-copy">📋 Copy to Clipboard</button>
    </div>
  `;

    document.getElementById('btn-generate')!.addEventListener('click', generate);
    document.getElementById('btn-copy')!.addEventListener('click', () => {
        const output = document.getElementById('li-output') as HTMLTextAreaElement;
        navigator.clipboard.writeText(output.value);
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅ Copied!';
        setTimeout(() => (btn.textContent = '📋 Copy to Clipboard'), 1500);
    });

    generate(); // Auto-generate on load
}

function generate(): void {
    const count = parseInt((document.getElementById('li-count') as HTMLInputElement).value) || 3;
    const sentPerPara = parseInt((document.getElementById('li-sentPerPara') as HTMLInputElement).value) || 5;
    const startLorem = (document.getElementById('li-startLorem') as HTMLInputElement).checked;

    const paragraphs: string[] = [];
    for (let p = 0; p < count; p++) {
        const sentences: string[] = [];
        for (let s = 0; s < sentPerPara; s++) {
            if (p === 0 && s === 0 && startLorem) {
                sentences.push('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
            } else {
                sentences.push(generateSentence());
            }
        }
        paragraphs.push(sentences.join(' '));
    }

    (document.getElementById('li-output') as HTMLTextAreaElement).value = paragraphs.join('\n\n');
}

function generateSentence(): string {
    const len = 8 + Math.floor(Math.random() * 12);
    const words: string[] = [];
    for (let i = 0; i < len; i++) {
        words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
    }
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
}
