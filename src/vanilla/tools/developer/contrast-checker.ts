export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="section-gap">
          <div class="input-group">
            <label for="cc-bg">Background Color</label>
            <input type="color" id="cc-bg" class="input-field" value="#ffffff" style="height: 40px;">
          </div>
          <div class="input-group">
            <label for="cc-fg">Foregound Color</label>
            <input type="color" id="cc-fg" class="input-field" value="#3b82f6" style="height: 40px;">
          </div>
        </div>

        <div class="section-gap">
          <div class="preview-box" id="cc-preview" style="padding: var(--space-8); text-align: center; border-radius: 12px; border: 1px solid var(--color-border);">
             <div style="font-size: var(--fs-xl); font-weight: 700;">Sample Text</div>
             <div style="font-size: var(--fs-sm); margin-top: var(--space-2);">This is how it looks in small text.</div>
          </div>
          
          <div class="input-group" style="margin-top: var(--space-4);">
            <div id="cc-ratio" style="font-size: 2.5rem; font-weight: 700; text-align: center;">4.5:1</div>
            <div style="display: flex; justify-content: space-around; margin-top: var(--space-4);">
               <div id="cc-aa" class="btn btn--sm" style="pointer-events: none;">WCAG AA</div>
               <div id="cc-aaa" class="btn btn--sm" style="pointer-events: none;">WCAG AAA</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

    const bgIn = document.getElementById('cc-bg') as HTMLInputElement;
    const fgIn = document.getElementById('cc-fg') as HTMLInputElement;
    const preview = document.getElementById('cc-preview')!;
    const ratioRes = document.getElementById('cc-ratio')!;
    const aaRes = document.getElementById('cc-aa')!;
    const aaaRes = document.getElementById('cc-aaa')!;

    const getLuminance = (hex: string) => {
        const rgb = hex.match(/[A-Za-z0-9]{2}/g)!.map(x => parseInt(x, 16) / 255);
        const [r, g, b] = rgb.map(v => v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
        return 0.2126 * r + 0.7152 * g + 0.0722 * b;
    };

    const update = () => {
        const bg = bgIn.value;
        const fg = fgIn.value;

        preview.style.backgroundColor = bg;
        preview.style.color = fg;

        const l1 = getLuminance(bg);
        const l2 = getLuminance(fg);
        const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

        ratioRes.textContent = ratio.toFixed(2) + ':1';

        const pass = (el: HTMLElement, threshold: number) => {
            if (ratio >= threshold) {
                el.style.backgroundColor = '#dcfce7';
                el.style.color = '#166534';
                el.textContent = el.id === 'cc-aa' ? 'WCAG AA PASS' : 'WCAG AAA PASS';
            } else {
                el.style.backgroundColor = '#fee2e2';
                el.style.color = '#991b1b';
                el.textContent = el.id === 'cc-aa' ? 'WCAG AA FAIL' : 'WCAG AAA FAIL';
            }
        };

        pass(aaRes, 4.5);
        pass(aaaRes, 7.0);
    };

    [bgIn, fgIn].forEach(inp => inp.addEventListener('input', update));
    update();
}
