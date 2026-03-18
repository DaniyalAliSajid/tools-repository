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
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="nato-input">Source Text</label>
        <textarea class="input-field" id="nato-input" rows="18" placeholder="Type something to hear it in NATO alphabet..." style="resize: vertical; font-size: 1rem;"></textarea>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> The NATO phonetic alphabet is used worldwide to clarify communications over radio or phone.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Phonetic Result</h3>
      </div>
      <div class="result-box" id="nato-result" style="padding: var(--space-6); font-family: 'JetBrains Mono'; font-size: 1.25rem; font-weight: 600; line-height: 1.8; color: var(--color-primary); height: calc(100% - 48px); min-height: 500px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap; background: var(--color-surface-hover);"></div>
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
