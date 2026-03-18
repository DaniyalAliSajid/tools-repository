export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Number Bases</h4>
        <div class="input-group">
          <label for="bc-dec">Decimal (Base 10)</label>
          <input type="number" class="input-field" id="bc-dec" value="255" style="padding: var(--space-3); font-family: 'JetBrains Mono'; font-weight: 700;">
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="bc-hex">Hexadecimal (Base 16)</label>
          <input type="text" class="input-field" id="bc-hex" value="FF" style="padding: var(--space-3); font-family: 'JetBrains Mono'; text-transform: uppercase;">
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="bc-bin">Binary (Base 2)</label>
          <input type="text" class="input-field" id="bc-bin" value="11111111" style="padding: var(--space-3); font-family: 'JetBrains Mono'; font-size: 0.875rem;">
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="bc-oct">Octal (Base 8)</label>
          <input type="text" class="input-field" id="bc-oct" value="377" style="padding: var(--space-3); font-family: 'JetBrains Mono';">
        </div>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Interactive Preview</h3>
      </div>
      <div class="result-box" style="padding: var(--space-8); background: var(--color-surface-hover); min-height: 250px; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
         <div style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: var(--space-2);">SELECTED VALUE (DEC)</div>
         <div id="bc-preview-dec" style="font-size: 4rem; font-weight: 900; color: var(--color-primary); line-height: 1;">255</div>
         <p style="margin-top: var(--space-6); font-size: var(--fs-sm); color: var(--color-text-secondary); max-width: 280px;">
           All fields are linked. Changing one automatically converts all others in real-time.
         </p>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-6);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Utility:</strong> Essential for programmers and computer science students working with memory addresses, color codes, or bitwise operations.
        </p>
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
            
            document.getElementById('bc-preview-dec')!.textContent = val.toString(10);
        } catch (e) { }
    };

    decIn.addEventListener('input', () => update('dec'));
    binIn.addEventListener('input', () => update('bin'));
    hexIn.addEventListener('input', () => update('hex'));
    octIn.addEventListener('input', () => update('oct'));
}
