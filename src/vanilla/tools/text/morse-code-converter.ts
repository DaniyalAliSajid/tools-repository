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
    <div class="section-gap">
      <div class="input-group">
        <label for="morse-input">Text or Morse Code</label>
        <textarea class="input-field" id="morse-input" rows="6" placeholder="Enter text to translate to Morse, or Morse code to translate to text..."></textarea>
      </div>

      <div class="toggle-group" id="morse-mode">
        <button class="toggle-group__btn active" data-mode="to-morse">Text to Morse</button>
        <button class="toggle-group__btn" data-mode="to-text">Morse to Text</button>
      </div>

      <div class="input-group">
        <label>Result</label>
        <div class="result-box" id="morse-result"></div>
        <button class="btn btn--secondary btn--sm result-box__copy" id="morse-copy">Copy</button>
      </div>
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
