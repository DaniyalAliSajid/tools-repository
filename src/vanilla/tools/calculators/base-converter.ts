export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="bc-dec">Decimal (Base 10)</label>
        <input type="number" class="input-field" id="bc-dec" value="255">
      </div>
      <div class="input-group">
        <label for="bc-bin">Binary (Base 2)</label>
        <input type="text" class="input-field" id="bc-bin" value="11111111">
      </div>
      <div class="input-group">
        <label for="bc-hex">Hexadecimal (Base 16)</label>
        <input type="text" class="input-field" id="bc-hex" value="FF">
      </div>
      <div class="input-group">
        <label for="bc-oct">Octal (Base 8)</label>
        <input type="text" class="input-field" id="bc-oct" value="377">
      </div>
    </div>
  `;

    const decIn = document.getElementById('bc-dec') as HTMLInputElement;
    const binIn = document.getElementById('bc-bin') as HTMLInputElement;
    const hexIn = document.getElementById('bc-hex') as HTMLInputElement;
    const octIn = document.getElementById('bc-oct') as HTMLInputElement;

    const update = (src: 'dec' | 'bin' | 'hex' | 'oct') => {
        let val = 0;
        try {
            if (src === 'dec') val = parseInt(decIn.value, 10);
            else if (src === 'bin') val = parseInt(binIn.value, 2);
            else if (src === 'hex') val = parseInt(hexIn.value, 16);
            else if (src === 'oct') val = parseInt(octIn.value, 8);

            if (isNaN(val)) return;

            if (src !== 'dec') decIn.value = val.toString(10);
            if (src !== 'bin') binIn.value = val.toString(2);
            if (src !== 'hex') hexIn.value = val.toString(16).toUpperCase();
            if (src !== 'oct') octIn.value = val.toString(8);
        } catch (e) { }
    };

    decIn.addEventListener('input', () => update('dec'));
    binIn.addEventListener('input', () => update('bin'));
    hexIn.addEventListener('input', () => update('hex'));
    octIn.addEventListener('input', () => update('oct'));
}
