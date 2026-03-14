export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="cp-count">Number of Colors</label>
          <input type="number" class="input-field" id="cp-count" value="5" min="2" max="12" />
        </div>
        <div class="input-group">
          <label for="cp-harmony">Harmony</label>
          <select class="input-field" id="cp-harmony">
            <option value="random">Random</option>
            <option value="analogous">Analogous</option>
            <option value="complementary">Complementary</option>
            <option value="triadic">Triadic</option>
            <option value="monochromatic">Monochromatic</option>
          </select>
        </div>
      </div>
      <button class="btn btn--primary btn--block" id="btn-generate">🎨 Generate Palette</button>
      <div id="cp-palette" style="display:flex;border-radius:var(--radius-xl);overflow:hidden;height:200px;box-shadow:var(--shadow-md);"></div>
      <div id="cp-codes" style="display:flex;flex-wrap:wrap;gap:var(--space-2);justify-content:center;margin-top:var(--space-4);"></div>
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

    codesEl.innerHTML = colors.map((c) =>
        `<div style="display:flex;align-items:center;gap:var(--space-2);padding:var(--space-2) var(--space-3);background:var(--color-surface-alt);border-radius:var(--radius-md);cursor:pointer;" class="cp-code" data-color="${c}">
      <div style="width:20px;height:20px;border-radius:var(--radius-sm);background:${c};border:1px solid var(--color-border);"></div>
      <span style="font-family:'Courier New',monospace;font-size:var(--fs-sm);">${c}</span>
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
