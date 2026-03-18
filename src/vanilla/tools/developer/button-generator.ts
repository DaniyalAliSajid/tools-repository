export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Content & Colors</h4>
        <div class="input-group">
          <label for="btn-text">Label Text</label>
          <input type="text" id="btn-text" class="input-field" value="Click Me">
        </div>
        <div class="tool-grid-2">
          <div class="input-group">
            <label for="btn-bg">Background</label>
            <input type="color" id="btn-bg" class="input-field" value="#3b82f6" style="height: 44px; padding: 4px;">
          </div>
          <div class="input-group">
            <label for="btn-color">Text</label>
            <input type="color" id="btn-color" class="input-field" value="#ffffff" style="height: 44px; padding: 4px;">
          </div>
        </div>
      </div>

      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Sizing & Shape</h4>
        <div class="slider-group">
          <div class="slider-group__header">
            <span class="slider-group__label">Vertical Padding</span>
            <span class="slider-group__value" id="btn-pad-y-val">12px</span>
          </div>
          <input type="range" id="btn-pad-y" min="0" max="50" value="12">
        </div>
        <div class="slider-group" style="margin-top: var(--space-4);">
          <div class="slider-group__header">
            <span class="slider-group__label">Horizontal Padding</span>
            <span class="slider-group__value" id="btn-pad-x-val">24px</span>
          </div>
          <input type="range" id="btn-pad-x" min="0" max="50" value="24">
        </div>
        <div class="slider-group" style="margin-top: var(--space-4);">
          <div class="slider-group__header">
            <span class="slider-group__label">Border Radius</span>
            <span class="slider-group__value" id="btn-radius-val">8px</span>
          </div>
          <input type="range" id="btn-radius" min="0" max="50" value="8">
        </div>
      </div>
    </div>
    <div class="tool-layout__output">
      <h3 style="margin-bottom: var(--space-4); font-size: var(--fs-base);">Live Preview</h3>
      <div class="preview-area" style="margin-bottom: var(--space-6);">
        <button id="btn-preview" style="border: none; outline: none; font-weight: 600; cursor: pointer;">Click Me</button>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase;">Generated Styles</h3>
        <button class="btn btn--secondary btn--sm" id="btn-copy">📋 Copy CSS</button>
      </div>
      <div class="result-box" style="padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: var(--fs-sm); line-height: 1.5; white-space: pre;">
        <code id="btn-code"></code>
      </div>
    </div>
  `;

    const textIn = document.getElementById('btn-text') as HTMLInputElement;
    const bgIn = document.getElementById('btn-bg') as HTMLInputElement;
    const colorIn = document.getElementById('btn-color') as HTMLInputElement;
    const padXIn = document.getElementById('btn-pad-x') as HTMLInputElement;
    const padYIn = document.getElementById('btn-pad-y') as HTMLInputElement;
    const radiusIn = document.getElementById('btn-radius') as HTMLInputElement;

    const padYVal = document.getElementById('btn-pad-y-val')!;
    const padXVal = document.getElementById('btn-pad-x-val')!;
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

        padYVal.textContent = `${py}px`;
        padXVal.textContent = `${px}px`;
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
