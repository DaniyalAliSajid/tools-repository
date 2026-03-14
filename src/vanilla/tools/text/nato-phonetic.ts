export function render(container: HTMLElement): void {
    const NATO_ALPHABET: { [key: string]: string } = {
        'A': 'Alpha', 'B': 'Bravo', 'C': 'Charlie', 'D': 'Delta', 'E': 'Echo',
        'F': 'Foxtrot', 'G': 'Golf', 'H': 'Hotel', 'I': 'India', 'J': 'Juliett',
        'K': 'Kilo', 'L': 'Lima', 'M': 'Mike', 'N': 'November', 'O': 'Oscar',
        'P': 'Papa', 'Q': 'Quebec', 'R': 'Romeo', 'S': 'Sierra', 'T': 'Tango',
        'U': 'Uniform', 'V': 'Victor', 'W': 'Whiskey', 'X': 'X-ray', 'Y': 'Yankee',
        'Z': 'Zulu', '0': 'Zero', '1': 'One', '2': 'Two', '3': 'Three', '4': 'Four',
        '5': 'Five', '6': 'Six', '7': 'Seven', '8': 'Eight', '9': 'Nine'
    };

    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="nato-input">Text to Phonetic</label>
        <textarea class="input-field" id="nato-input" rows="5" placeholder="Type something..."></textarea>
      </div>

      <div class="input-group">
        <label>NATO Phonetic Result</label>
        <div class="result-box" id="nato-result" style="font-size: var(--fs-lg); font-weight: 500; height: 150px; overflow: auto; background: white;"></div>
      </div>
    </div>
  `;

    const input = document.getElementById('nato-input') as HTMLTextAreaElement;
    const result = document.getElementById('nato-result') as HTMLDivElement;

    const convert = () => {
        const text = input.value.toUpperCase();
        const words = text.split('').map(char => NATO_ALPHABET[char] || char);
        result.textContent = words.join(' ');
    };

    input.addEventListener('input', convert);
}
