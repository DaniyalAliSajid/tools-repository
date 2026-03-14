export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="section-gap">
          <div class="slider-group">
            <div class="slider-group__header">
              <label class="slider-group__label">Transparency</label>
              <span class="slider-group__value" id="glass-trans-val">0.2</span>
            </div>
            <input type="range" id="glass-trans" min="0" max="1" step="0.01" value="0.2">
          </div>

          <div class="slider-group">
            <div class="slider-group__header">
              <label class="slider-group__label">Blur</label>
              <span class="slider-group__value" id="glass-blur-val">10px</span>
            </div>
            <input type="range" id="glass-blur" min="0" max="40" step="1" value="10">
          </div>

          <div class="slider-group">
            <div class="slider-group__header">
              <label class="slider-group__label">Outline (Border)</label>
              <span class="slider-group__value" id="glass-border-val">0.1</span>
            </div>
            <input type="range" id="glass-border" min="0" max="1" step="0.01" value="0.1">
          </div>

          <div class="slider-group">
            <div class="slider-group__header">
              <label class="slider-group__label">Saturation</label>
              <span class="slider-group__value" id="glass-sat-val">100%</span>
            </div>
            <input type="range" id="glass-sat" min="0" max="200" step="1" value="100">
          </div>
        </div>

        <div class="section-gap">
          <div class="preview-box">
             <div id="glass-preview" style="width: 150px; height: 150px; border-radius: 20px; box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);"></div>
          </div>
          <div class="input-group">
            <label>CSS Code</label>
            <div class="result-box" id="glass-css" style="font-size: var(--fs-xs); height: 120px;"></div>
            <button class="btn btn--secondary btn--sm result-box__copy" id="glass-copy">Copy CSS</button>
          </div>
        </div>
      </div>
    </div>
  `;

    const transIn = document.getElementById('glass-trans') as HTMLInputElement;
    const blurIn = document.getElementById('glass-blur') as HTMLInputElement;
    const borderIn = document.getElementById('glass-border') as HTMLInputElement;
    const satIn = document.getElementById('glass-sat') as HTMLInputElement;

    const transVal = document.getElementById('glass-trans-val')!;
    const blurVal = document.getElementById('glass-blur-val')!;
    const borderVal = document.getElementById('glass-border-val')!;
    const satVal = document.getElementById('glass-sat-val')!;

    const preview = document.getElementById('glass-preview')!;
    const cssResult = document.getElementById('glass-css')!;
    const copyBtn = document.getElementById('glass-copy')!;

    const update = () => {
        const t = transIn.value;
        const b = blurIn.value;
        const o = borderIn.value;
        const s = satIn.value;

        transVal.textContent = t;
        blurVal.textContent = b + 'px';
        borderVal.textContent = o;
        satVal.textContent = s + '%';

        const css = `background: rgba(255, 255, 255, ${t});
backdrop-filter: blur(${b}px) saturate(${s}%);
-webkit-backdrop-filter: blur(${b}px) saturate(${s}%);
border: 1px solid rgba(255, 255, 255, ${o});
border-radius: 20px;`;

        preview.style.background = `rgba(255, 255, 255, ${t})`;
        preview.style.backdropFilter = `blur(${b}px) saturate(${s}%)`;
        (preview.style as any).webkitBackdropFilter = `blur(${b}px) saturate(${s}%)`;
        preview.style.border = `1px solid rgba(255, 255, 255, ${o})`;

        cssResult.textContent = css;
    };

    [transIn, blurIn, borderIn, satIn].forEach(inp => inp.addEventListener('input', update));

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(cssResult.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });

    update();
}
