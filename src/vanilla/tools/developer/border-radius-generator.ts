export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Corner Radius</h4>
        <div class="slider-group">
          <div class="slider-group__header">
            <span class="slider-group__label">Top Left</span>
            <span class="slider-group__value" id="br-tl-val">12px</span>
          </div>
          <input type="range" id="br-tl" min="0" max="150" value="12" />
        </div>
        <div class="slider-group" style="margin-top:var(--space-4)">
          <div class="slider-group__header">
            <span class="slider-group__label">Top Right</span>
            <span class="slider-group__value" id="br-tr-val">12px</span>
          </div>
          <input type="range" id="br-tr" min="0" max="150" value="12" />
        </div>
        <div class="slider-group" style="margin-top:var(--space-4)">
          <div class="slider-group__header">
            <span class="slider-group__label">Bottom Right</span>
            <span class="slider-group__value" id="br-br-val">12px</span>
          </div>
          <input type="range" id="br-br" min="0" max="150" value="12" />
        </div>
        <div class="slider-group" style="margin-top:var(--space-4)">
          <div class="slider-group__header">
            <span class="slider-group__label">Bottom Left</span>
            <span class="slider-group__value" id="br-bl-val">12px</span>
          </div>
          <input type="range" id="br-bl" min="0" max="150" value="12" />
        </div>
        <div class="checkbox-group" style="margin-top:var(--space-3)">
          <label class="checkbox-label" style="display: flex; align-items: center; gap: var(--space-2); cursor: pointer;">
            <input type="checkbox" id="br-link" checked /> <span>Sync All Corners</span>
          </label>
        </div>
      </div>

      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Box Settings</h4>
        <div class="tool-grid-2">
          <div class="input-group">
            <label for="br-bg">Hex Color</label>
            <input type="color" class="input-field" id="br-bg" value="#6366f1" style="padding:var(--space-1);height:44px;" />
          </div>
          <div class="input-group">
            <label for="br-size">Box Size</label>
            <input type="number" class="input-field" id="br-size" value="200" min="50" max="400" />
          </div>
        </div>
      </div>
    </div>
    <div class="tool-layout__output">
      <h3 style="margin-bottom: var(--space-4); font-size: var(--fs-base);">Interactive Preview</h3>
      <div class="preview-area" style="margin-bottom: var(--space-6);">
        <div id="br-preview" style="width:200px;height:200px;background:#6366f1;transition:all var(--transition-fast);"></div>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase;">Generated CSS</h3>
        <button class="btn btn--secondary btn--sm" id="btn-copy">📋 Copy Code</button>
      </div>
      <div class="result-box" style="padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: var(--fs-sm); line-height: 1.5;">
        <code id="br-css">border-radius: 12px;</code>
      </div>
    </div>
  `;

    const corners = ['br-tl', 'br-tr', 'br-br', 'br-bl'];
    corners.forEach((id) => {
        document.getElementById(id)!.addEventListener('input', (e) => {
            const linked = (document.getElementById('br-link') as HTMLInputElement).checked;
            if (linked) {
                const val = (e.target as HTMLInputElement).value;
                corners.forEach((c) => {
                    (document.getElementById(c) as HTMLInputElement).value = val;
                });
            }
            updatePreview();
        });
    });

    document.getElementById('br-bg')!.addEventListener('input', updatePreview);
    document.getElementById('br-size')!.addEventListener('input', updatePreview);

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText(document.getElementById('br-css')!.textContent || '');
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅';
        setTimeout(() => (btn.textContent = '📋'), 1500);
    });

    updatePreview();
}

function updatePreview(): void {
    const tl = (document.getElementById('br-tl') as HTMLInputElement).value;
    const tr = (document.getElementById('br-tr') as HTMLInputElement).value;
    const br = (document.getElementById('br-br') as HTMLInputElement).value;
    const bl = (document.getElementById('br-bl') as HTMLInputElement).value;
    const bg = (document.getElementById('br-bg') as HTMLInputElement).value;
    const size = (document.getElementById('br-size') as HTMLInputElement).value;

    document.getElementById('br-tl-val')!.textContent = `${tl}px`;
    document.getElementById('br-tr-val')!.textContent = `${tr}px`;
    document.getElementById('br-br-val')!.textContent = `${br}px`;
    document.getElementById('br-bl-val')!.textContent = `${bl}px`;

    const radius = `${tl}px ${tr}px ${br}px ${bl}px`;
    const preview = document.getElementById('br-preview')!;
    preview.style.borderRadius = radius;
    preview.style.background = bg;
    preview.style.width = `${size}px`;
    preview.style.height = `${size}px`;

    const allSame = tl === tr && tr === br && br === bl;
    const cssValue = allSame ? `${tl}px` : radius;
    document.getElementById('br-css')!.textContent = `border-radius: ${cssValue};`;
}
