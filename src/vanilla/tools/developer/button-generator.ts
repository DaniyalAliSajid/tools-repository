export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="section-gap">
          <div class="input-group">
            <label for="btn-text">Button Text</label>
            <input type="text" id="btn-text" class="input-field" value="Click Me">
          </div>
          <div class="input-group">
            <label for="btn-bg">Background Color</label>
            <input type="color" id="btn-bg" class="input-field" value="#3b82f6" style="height: 40px;">
          </div>
          <div class="input-group">
            <label for="btn-color">Text Color</label>
            <input type="color" id="btn-color" class="input-field" value="#ffffff" style="height: 40px;">
          </div>
          <div class="slider-group">
            <label>Padding: <span id="btn-pad-val">12px 24px</span></label>
            <input type="range" id="btn-pad-x" min="0" max="50" value="24">
            <input type="range" id="btn-pad-y" min="0" max="50" value="12">
          </div>
          <div class="slider-group">
            <label>Border Radius: <span id="btn-radius-val">8px</span></label>
            <input type="range" id="btn-radius" min="0" max="50" value="8">
          </div>
        </div>

        <div class="section-gap">
          <div class="preview-box">
             <button id="btn-preview">Click Me</button>
          </div>
          <div class="input-group">
            <label>Generated CSS</label>
            <div class="result-box" id="btn-code" style="font-family: monospace; white-space: pre-wrap; background: white;"></div>
            <button class="btn btn--secondary btn--sm result-box__copy" id="btn-copy">Copy CSS</button>
          </div>
        </div>
      </div>
    </div>
  `;

    const textIn = document.getElementById('btn-text') as HTMLInputElement;
    const bgIn = document.getElementById('btn-bg') as HTMLInputElement;
    const colorIn = document.getElementById('btn-color') as HTMLInputElement;
    const padXIn = document.getElementById('btn-pad-x') as HTMLInputElement;
    const padYIn = document.getElementById('btn-pad-y') as HTMLInputElement;
    const radiusIn = document.getElementById('btn-radius') as HTMLInputElement;

    const padVal = document.getElementById('btn-pad-val')!;
    const radiusVal = document.getElementById('btn-radius-val')!;
    const preview = document.getElementById('btn-preview') as HTMLButtonElement;
    const codeRes = document.getElementById('btn-code')!;
    const copyBtn = document.getElementById('btn-copy')!;

    const update = () => {
        const text = textIn.value;
        const bg = bgIn.value;
        const color = colorIn.value;
        const px = padXIn.value;
        const py = padYIn.value;
        const r = radiusIn.value;

        preview.textContent = text;
        preview.style.backgroundColor = bg;
        preview.style.color = color;
        preview.style.padding = `${py}px ${px}px`;
        preview.style.borderRadius = `${r}px`;
        preview.style.border = 'none';
        preview.style.cursor = 'pointer';
        preview.style.transition = 'all 0.3s ease';

        padVal.textContent = `${py}px ${px}px`;
        radiusVal.textContent = `${r}px`;

        const css = `.custom-button {
  background-color: ${bg};
  color: ${color};
  padding: ${py}px ${px}px;
  border-radius: ${r}px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-button:hover {
  filter: brightness(1.1);
  transform: translateY(-1px);
}`;
        codeRes.textContent = css;
    };

    [textIn, bgIn, colorIn, padXIn, padYIn, radiusIn].forEach(inp => inp.addEventListener('input', update));

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeRes.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });

    update();
}
