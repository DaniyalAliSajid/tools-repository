export function render(container: HTMLElement): void {
    const MORSE_MAP: { [key: string]: string } = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
        '9': '----.', '0': '-----', ' ': '/'
    };

    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="ma-input">Text to Morse Audio</label>
        <textarea id="ma-input" class="input-field" rows="3" placeholder="HELLO WORLD"></textarea>
      </div>

      <div class="input-group">
        <label>Morse Code</label>
        <div class="result-box" id="ma-result" style="font-size: var(--fs-lg); font-weight: 700; height: 100px; overflow: auto; background: white; letter-spacing: 2px;"></div>
      </div>

      <div style="text-align: center; margin-top: var(--space-4);">
        <button class="btn btn--primary" id="ma-play">Play Morse Audio</button>
      </div>
    </div>
  `;

    const input = document.getElementById('ma-input') as HTMLTextAreaElement;
    const resultEl = document.getElementById('ma-result')!;
    const playBtn = document.getElementById('ma-play')!;

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();

    const playNote = (duration: number) => {
        return new Promise(resolve => {
            const osc = audioCtx.createOscillator();
            const gain = audioCtx.createGain();
            osc.connect(gain);
            gain.connect(audioCtx.destination);
            osc.frequency.value = 600;
            osc.start();
            setTimeout(() => {
                osc.stop();
                resolve(null);
            }, duration);
        });
    };

    const playMorse = async (morse: string) => {
        const dot = 100;
        const dash = 300;
        for (let i = 0; i < morse.length; i++) {
            const char = morse[i];
            if (char === '.') await playNote(dot);
            else if (char === '-') await playNote(dash);
            else if (char === ' ') await new Promise(r => setTimeout(r, dot * 3));
            else if (char === '/') await new Promise(r => setTimeout(r, dot * 7));

            await new Promise(r => setTimeout(r, dot)); // gap between dots/dashes
        }
    };

    const update = () => {
        const text = input.value.toUpperCase();
        const morse = text.split('').map(c => MORSE_MAP[c] || '').join(' ');
        resultEl.textContent = morse;
    };

    input.addEventListener('input', update);
    playBtn.addEventListener('click', () => {
        playMorse(resultEl.textContent || '');
    });

    update();
}
