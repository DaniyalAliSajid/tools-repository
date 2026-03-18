export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Palette Config</h4>
        <div class="tool-grid-2">
          <div class="input-group">
            <label for="cp-count">Colors Count</label>
            <input type="number" class="input-field" id="cp-count" value="5" min="2" max="10" style="padding: var(--space-3);" />
          </div>
          <div class="input-group">
            <label for="cp-harmony">Harmony Mode</label>
            <select class="input-field" id="cp-harmony" style="padding: var(--space-3);">
              <option value="random">Random</option>
              <option value="analogous">Analogous</option>
              <option value="complementary">Complementary</option>
              <option value="triadic">Triadic</option>
              <option value="monochromatic">Monochromatic</option>
            </select>
          </div>
        </div>
        <button class="btn btn--primary btn--block btn--lg" id="btn-generate" style="margin-top: var(--space-6);">🎨 Generate New Palette</button>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> Click on any color swatch to copy its HEX code. Hover to expand.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Interactive Palette</h3>
        <div style="font-size: var(--fs-xs); color: var(--color-text-muted); font-weight: 600;">CLICK TO COPY</div>
      </div>
      <div id="cp-palette" style="display:flex; border-radius: var(--radius-2xl); overflow:hidden; height:400px; box-shadow: var(--shadow-xl); border: 4px solid var(--color-surface-hover);"></div>
      <div id="cp-codes" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); gap:var(--space-2); margin-top:var(--space-6);"></div>
    </div>
  `;

    document.getElementById('btn-generate')!.addEventListener('click', generate);
    generate();
}

function generate(): void {
    const count = parseInt((document.getElementById('cp-count') as HTMLInputElement).value) || 5;
    const harmony = (document.getElementById('cp-harmony') as HTMLSelectElement).value;
    const colors = generatePalette(count, harmony);

    const paletteEl = document.getElementById('cp-palette')!;
    const codesEl = document.getElementById('cp-codes')!;

    paletteEl.innerHTML = colors.map((c) =>
        `<div style="flex:1;background:${c};cursor:pointer;transition:flex var(--transition-normal);" data-color="${c}" title="Click to copy ${c}" class="cp-swatch"></div>`
    ).join('');

    codesEl.innerHTML = colors.map((c) => `
        <div style="display:flex; align-items:center; gap:var(--space-3); padding:var(--space-3); background:var(--color-surface-hover); border-radius:var(--radius-lg); cursor:pointer; border: 1px solid var(--color-border); transition: all 0.2s;" class="cp-code" data-color="${c}">
          <div style="width:24px; height:24px; border-radius:var(--radius-full); background:${c}; border: 2px solid white; box-shadow: 0 0 0 1px var(--color-border);"></div>
          <span style="font-family:'JetBrains Mono'; font-size:var(--fs-xs); font-weight: 600; color: var(--color-text);">${c.toUpperCase()}</span>
        </div>`
    ).join('');

    // Hover expand
    paletteEl.querySelectorAll('.cp-swatch').forEach((swatch) => {
        swatch.addEventListener('mouseenter', () => (swatch as HTMLElement).style.flex = '2');
        swatch.addEventListener('mouseleave', () => (swatch as HTMLElement).style.flex = '1');
        swatch.addEventListener('click', () => {
            navigator.clipboard.writeText((swatch as HTMLElement).dataset.color || '');
            showToast(`Copied ${(swatch as HTMLElement).dataset.color}`);
        });
    });

    codesEl.querySelectorAll('.cp-code').forEach((code) => {
        code.addEventListener('click', () => {
            navigator.clipboard.writeText((code as HTMLElement).dataset.color || '');
            showToast(`Copied ${(code as HTMLElement).dataset.color}`);
        });
    });
}

function generatePalette(count: number, harmony: string): string[] {
    const baseHue = Math.floor(Math.random() * 360);
    const colors: string[] = [];

    for (let i = 0; i < count; i++) {
        let h: number, s: number, l: number;
        switch (harmony) {
            case 'analogous':
                h = (baseHue + i * 30) % 360;
                s = 65 + Math.random() * 20;
                l = 45 + Math.random() * 20;
                break;
            case 'complementary':
                h = (baseHue + (i % 2 === 0 ? 0 : 180) + i * 10) % 360;
                s = 60 + Math.random() * 25;
                l = 40 + Math.random() * 25;
                break;
            case 'triadic':
                h = (baseHue + i * 120) % 360;
                s = 65 + Math.random() * 20;
                l = 45 + Math.random() * 20;
                break;
            case 'monochromatic':
                h = baseHue;
                s = 60 + Math.random() * 25;
                l = 25 + (i * 50) / count;
                break;
            default: // random
                h = Math.floor(Math.random() * 360);
                s = 50 + Math.random() * 40;
                l = 35 + Math.random() * 35;
        }
        colors.push(hslToHex(h, s, l));
    }
    return colors;
}

function hslToHex(h: number, s: number, l: number): string {
    s /= 100; l /= 100;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function showToast(msg: string): void {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast toast--success';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2000);
}
