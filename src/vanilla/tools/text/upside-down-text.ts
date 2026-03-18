export function render(container: HTMLElement): void {
    const UPSIDE_DOWN: { [key: string]: string } = {
        'a': 'ɐ', 'b': 'q', 'c': 'ɔ', 'd': 'p', 'e': 'ǝ', 'f': 'ɟ', 'g': 'ƃ', 'h': 'ɥ',
        'i': 'ᴉ', 'j': 'ɾ', 'k': 'ʞ', 'l': 'l', 'm': 'ɯ', 'n': 'u', 'o': 'o', 'p': 'd',
        'q': 'b', 'r': 'ɹ', 's': 's', 't': 'ʇ', 'u': 'n', 'v': 'ʌ', 'w': 'ʍ', 'x': 'x',
        'y': 'ʎ', 'z': 'z', 'A': '∀', 'B': 'B', 'C': 'Ɔ', 'D': 'D', 'E': 'Ǝ', 'F': 'Ⅎ',
        'G': '⅁', 'H': 'H', 'I': 'I', 'J': 'Ր', 'K': 'K', 'L': '˥', 'M': 'W', 'N': 'N',
        'O': 'O', 'P': 'Ԁ', 'Q': 'Ό', 'R': 'ᴚ', 'S': 'S', 'T': '⊥', 'U': '∩', 'V': 'Λ',
        'W': 'M', 'X': 'X', 'Y': '⅄', 'Z': 'Z', '1': 'Ɩ', '2': 'ᄅ', '3': 'Ɛ', '4': 'ㄣ',
        '5': 'ϛ', '6': '9', '7': 'ㄥ', '8': '8', '9': '6', '0': '0', '.': '˙', ',': "'",
        "'": ',', '"': '„', '(': ')', ')': '(', '[': ']', ']': '[', '{': '}', '}': '{',
        '?': '¿', '!': '¡', '&': '⅋', '_': '‾', ';': '؛'
    };

    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="upside-input">Original Text</label>
        <textarea class="input-field" id="upside-input" rows="18" placeholder="Enter text to flip upside down..." style="resize: vertical; font-size: 1rem;"></textarea>
      </div>
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Fun Fact:</strong> This tool uses special Unicode characters to simulate an "upside down" effect.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Flipped Result</h3>
        <button class="btn btn--secondary btn--sm" id="upside-copy">📋 Copy</button>
      </div>
      <div class="result-box" id="upside-result" style="padding: var(--space-6); font-family: 'JetBrains Mono'; font-size: 1.5rem; font-weight: 500; line-height: 1.6; height: calc(100% - 48px); min-height: 500px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap; background: var(--color-surface-hover); text-align: center; display: flex; align-items: center; justify-content: center;"></div>
    </div>
  `;

    const input = document.getElementById('upside-input') as HTMLTextAreaElement;
    const result = document.getElementById('upside-result') as HTMLDivElement;
    const copyBtn = document.getElementById('upside-copy') as HTMLButtonElement;

    const flip = () => {
        const text = input.value;
        let flipped = '';
        for (let i = text.length - 1; i >= 0; i--) {
            flipped += UPSIDE_DOWN[text[i]] || text[i];
        }
        result.textContent = flipped;
    };

    input.addEventListener('input', flip);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(result.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
}
