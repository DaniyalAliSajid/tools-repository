export function render(container: HTMLElement): void {
    const ZALGO_UP = ['\u030d', '\u030e', '\u0304', '\u0305', '\u033f', '\u0311', '\u0306', '\u0310', '\u0352', '\u0357', '\u0351', '\u0307', '\u0308', '\u030a', '\u0342', '\u0343', '\u0344', '\u034a', '\u034b', '\u034c', '\u0303', '\u0302', '\u030c', '\u0350', '\u0300', '\u0301', '\u030b', '\u030f', '\u0312', '\u0313', '\u0314', '\u033d', '\u0309', '\u0363', '\u0364', '\u0365', '\u0366', '\u0367', '\u0368', '\u0369', '\u036a', '\u036b', '\u036c', '\u036d', '\u036e', '\u036f', '\u0350', '\u0351', '\u0357', '\u035b', '\u0346', '\u0341'];
    const ZALGO_DOWN = ['\u0316', '\u0317', '\u0318', '\u0319', '\u031c', '\u031d', '\u031e', '\u031f', '\u0320', '\u0324', '\u0325', '\u0326', '\u0329', '\u032a', '\u032b', '\u032c', '\u032d', '\u032e', '\u032f', '\u0330', '\u0331', '\u0332', '\u0333', '\u0339', '\u033a', '\u033b', '\u033c', '\u0345', '\u0347', '\u0348', '\u0349', '\u034d', '\u034e', '\u0353', '\u0354', '\u0355', '\u0356', '\u0359', '\u035a', '\u0323'];
    const ZALGO_MID = ['\u0315', '\u031b', '\u0340', '\u0341', '\u0358', '\u0321', '\u0322', '\u0327', '\u0328', '\u0334', '\u0335', '\u0336', '\u034f', '\u035c', '\u035d', '\u035e', '\u035f', '\u0360', '\u0362', '\u0338', '\u0337', '\u0361', '\u0489'];

    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="zalgo-input">Original Text</label>
        <textarea class="input-field" id="zalgo-input" rows="12" placeholder="Enter text to corrupt..." style="resize: vertical; font-family: var(--font-main); font-size: 1rem;"></textarea>
      </div>

      <div class="p-card" style="margin-top: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Corruption Level</h4>
        <div class="slider-group">
          <div class="slider-group__header">
            <span class="slider-group__label">Intensity</span>
            <span class="slider-group__value" id="zalgo-val">5</span>
          </div>
          <input type="range" id="zalgo-intensity" min="1" max="20" value="5">
        </div>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Corrupted Output</h3>
        <button class="btn btn--secondary btn--sm" id="zalgo-copy">📋 Copy Code</button>
      </div>
      <div class="result-box" id="zalgo-result" style="padding: var(--space-8); font-family: 'JetBrains Mono'; font-size: 1.25rem; line-height: 2; height: calc(100% - 48px); min-height: 480px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap; background: #000; color: #0f0; text-shadow: 0 0 5px rgba(0,255,0,0.5);"></div>
    </div>
  `;

    const input = document.getElementById('zalgo-input') as HTMLTextAreaElement;
    const intensity = document.getElementById('zalgo-intensity') as HTMLInputElement;
    const intensityVal = document.getElementById('zalgo-val')!;
    const result = document.getElementById('zalgo-result') as HTMLDivElement;
    const copyBtn = document.getElementById('zalgo-copy') as HTMLButtonElement;

    const generate = () => {
        const text = input.value;
        const count = parseInt(intensity.value);
        intensityVal.textContent = count.toString();

        let corrupted = '';
        for (let i = 0; i < text.length; i++) {
            corrupted += text[i];
            for (let j = 0; j < count; j++) {
                corrupted += ZALGO_UP[Math.floor(Math.random() * ZALGO_UP.length)];
                corrupted += ZALGO_DOWN[Math.floor(Math.random() * ZALGO_DOWN.length)];
                corrupted += ZALGO_MID[Math.floor(Math.random() * ZALGO_MID.length)];
            }
        }
        result.textContent = corrupted;
    };

    input.addEventListener('input', generate);
    intensity.addEventListener('input', generate);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(result.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });
}
