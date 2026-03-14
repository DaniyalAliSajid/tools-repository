export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="section-gap">
          <div class="slider-group">
            <label>Blur: <span id="filt-blur-val">0px</span></label>
            <input type="range" id="filt-blur" min="0" max="20" value="0">
          </div>
          <div class="slider-group">
            <label>Brightness: <span id="filt-bright-val">100%</span></label>
            <input type="range" id="filt-bright" min="0" max="200" value="100">
          </div>
          <div class="slider-group">
            <label>Contrast: <span id="filt-cont-val">100%</span></label>
            <input type="range" id="filt-cont" min="0" max="200" value="100">
          </div>
          <div class="slider-group">
            <label>Grayscale: <span id="filt-gray-val">0%</span></label>
            <input type="range" id="filt-gray" min="0" max="100" value="0">
          </div>
          <div class="slider-group">
            <label>Hue Rotate: <span id="filt-hue-val">0deg</span></label>
            <input type="range" id="filt-hue" min="0" max="360" value="0">
          </div>
          <div class="slider-group">
            <label>Invert: <span id="filt-inv-val">0%</span></label>
            <input type="range" id="filt-inv" min="0" max="100" value="0">
          </div>
          <div class="slider-group">
            <label>Saturate: <span id="filt-sat-val">100%</span></label>
            <input type="range" id="filt-sat" min="0" max="200" value="100">
          </div>
          <div class="slider-group">
            <label>Sepia: <span id="filt-sepia-val">0%</span></label>
            <input type="range" id="filt-sepia" min="0" max="100" value="0">
          </div>
        </div>

        <div class="section-gap">
          <div class="preview-box">
             <img id="filt-preview" src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&h=300&fit=crop" style="max-width: 100%; border-radius: 12px;">
          </div>
          <div class="input-group" style="margin-top: var(--space-4);">
            <label>Generated CSS</label>
            <div class="result-box" id="filt-code" style="font-family: monospace; white-space: pre-wrap; background: white;"></div>
            <button class="btn btn--secondary btn--sm result-box__copy" id="filt-copy">Copy CSS</button>
          </div>
        </div>
      </div>
    </div>
  `;

    const blurIn = document.getElementById('filt-blur') as HTMLInputElement;
    const brightIn = document.getElementById('filt-bright') as HTMLInputElement;
    const contIn = document.getElementById('filt-cont') as HTMLInputElement;
    const grayIn = document.getElementById('filt-gray') as HTMLInputElement;
    const hueIn = document.getElementById('filt-hue') as HTMLInputElement;
    const invIn = document.getElementById('filt-inv') as HTMLInputElement;
    const satIn = document.getElementById('filt-sat') as HTMLInputElement;
    const sepiaIn = document.getElementById('filt-sepia') as HTMLInputElement;

    const bVal = document.getElementById('filt-blur-val')!;
    const brVal = document.getElementById('filt-bright-val')!;
    const coVal = document.getElementById('filt-cont-val')!;
    const grVal = document.getElementById('filt-gray-val')!;
    const huVal = document.getElementById('filt-hue-val')!;
    const inVal = document.getElementById('filt-inv-val')!;
    const saVal = document.getElementById('filt-sat-val')!;
    const seVal = document.getElementById('filt-sepia-val')!;

    const preview = document.getElementById('filt-preview') as HTMLImageElement;
    const codeRes = document.getElementById('filt-code')!;
    const copyBtn = document.getElementById('filt-copy')!;

    const update = () => {
        const b = blurIn.value;
        const br = brightIn.value;
        const co = contIn.value;
        const gr = grayIn.value;
        const hu = hueIn.value;
        const inv = invIn.value;
        const sa = satIn.value;
        const se = sepiaIn.value;

        bVal.textContent = b + 'px';
        brVal.textContent = br + '%';
        coVal.textContent = co + '%';
        grVal.textContent = gr + '%';
        huVal.textContent = hu + 'deg';
        inVal.textContent = inv + '%';
        saVal.textContent = sa + '%';
        seVal.textContent = se + '%';

        const filterStr = `blur(${b}px) brightness(${br}%) contrast(${co}%) grayscale(${gr}%) hue-rotate(${hu}deg) invert(${inv}%) saturate(${sa}%) sepia(${se}%)`;
        preview.style.filter = filterStr;
        codeRes.textContent = `filter: ${filterStr};`;
    };

    [blurIn, brightIn, contIn, grayIn, hueIn, invIn, satIn, sepiaIn].forEach(inp => inp.addEventListener('input', update));

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeRes.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });

    update();
}
