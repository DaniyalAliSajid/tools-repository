export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="ar-w1">Width 1</label>
          <input type="number" class="input-field" id="ar-w1" value="1920">
        </div>
        <div class="input-group">
          <label for="ar-h1">Height 1</label>
          <input type="number" class="input-field" id="ar-h1" value="1080">
        </div>
        <div class="input-group">
          <label for="ar-w2">Width 2 (Locked)</label>
          <input type="number" class="input-field" id="ar-w2" value="1280">
        </div>
        <div class="input-group">
          <label for="ar-h2">Height 2 (Locked)</label>
          <input type="number" class="input-field" id="ar-h2" value="720">
        </div>
      </div>

      <div class="input-group">
        <label>Aspect Ratio</label>
        <div class="result-box" id="ar-result" style="text-align: center; padding: var(--space-8);">
           <div id="ar-ratio" style="font-size: var(--fs-xl); font-weight: 700; color: var(--color-primary);">16:9</div>
           <div id="ar-details" style="margin-top: var(--space-2); opacity: 0.7;">Common resolutions: 1080p, 720p</div>
        </div>
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
