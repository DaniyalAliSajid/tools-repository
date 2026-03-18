export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Source Dimensions</h4>
        <div class="tool-grid-2">
          <div class="input-group">
            <label for="ar-w1">Width 1</label>
            <input type="number" class="input-field" id="ar-w1" value="1920" style="padding: var(--space-3);">
          </div>
          <div class="input-group">
            <label for="ar-h1">Height 1</label>
            <input type="number" class="input-field" id="ar-h1" value="1080" style="padding: var(--space-3);">
          </div>
        </div>
      </div>

      <div class="p-card" style="margin-top: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">New Proportions</h4>
        <div class="tool-grid-2">
          <div class="input-group">
            <label for="ar-w2">New Width</label>
            <input type="number" class="input-field" id="ar-w2" value="1280" style="padding: var(--space-3); border: 1px solid var(--color-primary-border); background: var(--color-primary-lightish);">
          </div>
          <div class="input-group">
            <label for="ar-h2">New Height</label>
            <input type="number" class="input-field" id="ar-h2" value="720" style="padding: var(--space-3); border: 1px solid var(--color-primary-border); background: var(--color-primary-lightish);">
          </div>
        </div>
        <p style="margin-top: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted);">Changing one value will automatically update the other to maintain the ratio.</p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Calculated Aspect Ratio</h3>
      </div>
      <div class="result-box" id="ar-result" style="padding: var(--space-12); display: flex; flex-direction: column; align-items: center; justify-content: center; background: var(--color-surface-hover); min-height: 250px;">
         <div style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: var(--space-4);">DIMENSION RATIO</div>
         <div id="ar-ratio" style="font-size: 5rem; font-weight: 900; color: var(--color-primary); line-height: 1;">16:9</div>
         <div id="ar-details" style="margin-top: var(--space-8); font-size: var(--fs-sm); font-weight: 600; color: var(--color-text-secondary);">Widescreen Standard</div>
         
         <div style="margin-top: var(--space-10); width: 80px; height: 45px; border: 2px solid var(--color-primary); background: var(--color-primary-light); opacity: 0.2; border-radius: var(--radius-sm);"></div>
      </div>
    </div>
  `;

    const w1In = document.getElementById('ar-w1') as HTMLInputElement;
    const h1In = document.getElementById('ar-h1') as HTMLInputElement;
    const w2In = document.getElementById('ar-w2') as HTMLInputElement;
    const h2In = document.getElementById('ar-h2') as HTMLInputElement;
    const ratioRes = document.getElementById('ar-ratio')!;

    const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;

    const updateRatio = () => {
        const w = parseInt(w1In.value) || 0;
        const h = parseInt(h1In.value) || 0;
        if (w > 0 && h > 0) {
            const common = gcd(w, h);
            ratioRes.textContent = `${w / common}:${h / common}`;
        }
    };

    const calculateW2 = () => {
        const w1 = parseInt(w1In.value) || 0;
        const h1 = parseInt(h1In.value) || 0;
        const h2 = parseInt(h2In.value) || 0;
        if (w1 > 0 && h1 > 0 && h2 > 0) {
            w2In.value = Math.round((w1 / h1) * h2).toString();
        }
        updateRatio();
    };

    const calculateH2 = () => {
        const w1 = parseInt(w1In.value) || 0;
        const h1 = parseInt(h1In.value) || 0;
        const w2 = parseInt(w2In.value) || 0;
        if (w1 > 0 && h1 > 0 && w2 > 0) {
            h2In.value = Math.round((h1 / w1) * w2).toString();
        }
        updateRatio();
    };

    w1In.addEventListener('input', updateRatio);
    h1In.addEventListener('input', updateRatio);
    w2In.addEventListener('input', calculateH2);
    h2In.addEventListener('input', calculateW2);

    updateRatio();
}
