const MORSE_CODE: { [key: string]: string } = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
    'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
    'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
    'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
    'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
    '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
    '9': '----.', '0': '-----', ' ': '/'
};

const REVERSE_MORSE: { [key: string]: string } = Object.entries(MORSE_CODE).reduce((acc, [key, val]) => {
    acc[val] = key;
    return acc;
}, {} as { [key: string]: string });

export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Mode Selection</h4>
        <div class="toggle-group" id="morse-mode" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-1); background: var(--color-surface-hover); padding: 4px; border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
          <button class="toggle-group__btn active" data-mode="to-morse" style="padding: 10px; border-radius: var(--radius-md); font-size: var(--fs-xs);">Text to Morse</button>
          <button class="toggle-group__btn" data-mode="to-text" style="padding: 10px; border-radius: var(--radius-md); font-size: var(--fs-xs);">Morse to Text</button>
        </div>
      </div>

      <div class="input-group">
        <label for="morse-input">Source Content</label>
        <textarea class="input-field" id="morse-input" rows="14" placeholder="Enter text or Morse code here..." style="resize: vertical; font-size: 1rem;"></textarea>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Translation Result</h3>
        <button class="btn btn--secondary btn--sm" id="morse-copy">📋 Copy</button>
      </div>
      <div class="result-box" id="morse-result" style="padding: var(--space-6); font-family: 'JetBrains Mono'; font-size: 1.25rem; font-weight: 600; line-height: 1.8; color: var(--color-primary); height: calc(100% - 48px); min-height: 520px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap; background: var(--color-surface-hover);"></div>
    </div>
  `;

    const input = document.getElementById('morse-input') as HTMLTextAreaElement;
    const result = document.getElementById('morse-result') as HTMLDivElement;
    const modeBtns = document.querySelectorAll('#morse-mode .toggle-group__btn');
    const copyBtn = document.getElementById('morse-copy') as HTMLButtonElement;

    let mode = 'to-morse';

    const update = () => {
        const value = input.value.trim().toUpperCase();
        if (!value) {
            result.textContent = '';
            return;
        }

        if (mode === 'to-morse') {
            result.textContent = value.split('').map(char => MORSE_CODE[char] || char).join(' ');
        } else {
            result.textContent = value.split(' ').map(code => REVERSE_MORSE[code] || '').join('');
        }
    };

    input.addEventListener('input', update);

    modeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            mode = (btn as HTMLElement).dataset.mode!;
            update();
        });
    });

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(result.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
}
