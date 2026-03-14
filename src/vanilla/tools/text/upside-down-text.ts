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
    <div class="section-gap">
      <div class="input-group">
        <label for="upside-input">Upside Down Input</label>
        <textarea class="input-field" id="upside-input" rows="5" placeholder="Enter text to flip..."></textarea>
      </div>

      <div class="input-group">
        <label>Flipped Result</label>
        <div class="result-box" id="upside-result" style="height: 150px; overflow: auto; background: white; font-size: var(--fs-lg);"></div>
        <button class="btn btn--secondary btn--sm result-box__copy" id="upside-copy">Copy Flipped</button>
      </div>
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
