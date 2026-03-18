export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Offset & Blur</h4>
        <div class="slider-group">
          <div class="slider-group__header">
            <span class="slider-group__label">Horizontal Offset</span>
            <span class="slider-group__value" id="bs-x-val">5px</span>
          </div>
          <input type="range" id="bs-x" min="-50" max="50" value="5" />
        </div>
        <div class="slider-group" style="margin-top:var(--space-4)">
          <div class="slider-group__header">
            <span class="slider-group__label">Vertical Offset</span>
            <span class="slider-group__value" id="bs-y-val">5px</span>
          </div>
          <input type="range" id="bs-y" min="-50" max="50" value="5" />
        </div>
        <div class="slider-group" style="margin-top:var(--space-4)">
          <div class="slider-group__header">
            <span class="slider-group__label">Blur Radius</span>
            <span class="slider-group__value" id="bs-blur-val">15px</span>
          </div>
          <input type="range" id="bs-blur" min="0" max="100" value="15" />
        </div>
        <div class="slider-group" style="margin-top:var(--space-4)">
          <div class="slider-group__header">
            <span class="slider-group__label">Spread Radius</span>
            <span class="slider-group__value" id="bs-spread-val">0px</span>
          </div>
          <input type="range" id="bs-spread" min="-50" max="50" value="0" />
        </div>
      </div>

      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Color & Style</h4>
        <div class="tool-grid-2">
          <div class="input-group">
            <label for="bs-color">Shadow Color</label>
            <input type="color" class="input-field" id="bs-color" value="#6366f1" style="padding:var(--space-1);height:44px;" />
          </div>
          <div class="input-group">
            <label for="bs-opacity">Opacity</label>
            <input type="range" id="bs-opacity" min="0" max="100" value="30" />
          </div>
        </div>
        <div class="checkbox-group" style="margin-top:var(--space-3)">
          <label class="checkbox-label" style="display: flex; align-items: center; gap: var(--space-2); cursor: pointer;">
            <input type="checkbox" id="bs-inset" /> <span>Inset Shadow</span>
          </label>
        </div>
      </div>
    </div>
    <div class="tool-layout__output">
      <h3 style="margin-bottom: var(--space-4); font-size: var(--fs-base);">Interactive Preview</h3>
      <div class="preview-area" style="margin-bottom: var(--space-6);">
        <div id="bs-preview" style="width:150px;height:150px;background:#ffffff;border-radius:var(--radius-xl);transition:box-shadow var(--transition-fast);"></div>
      </div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase;">Generated CSS</h3>
        <button class="btn btn--secondary btn--sm" id="btn-copy">📋 Copy Code</button>
      </div>
      <div class="result-box" style="padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: var(--fs-sm); line-height: 1.5;">
        <code id="bs-css">box-shadow: 5px 5px 15px 0px rgba(99, 102, 241, 0.3);</code>
      </div>
    </div>
  `;

    const ids = ['bs-x', 'bs-y', 'bs-blur', 'bs-spread', 'bs-color', 'bs-opacity', 'bs-inset'];
    ids.forEach((id) => {
        document.getElementById(id)!.addEventListener('input', updateShadow);
    });

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText(document.getElementById('bs-css')!.textContent || '');
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅';
        setTimeout(() => (btn.textContent = '📋'), 1500);
    });

    updateShadow();
}

function updateShadow(): void {
    const x = (document.getElementById('bs-x') as HTMLInputElement).value;
    const y = (document.getElementById('bs-y') as HTMLInputElement).value;
    const blur = (document.getElementById('bs-blur') as HTMLInputElement).value;
    const spread = (document.getElementById('bs-spread') as HTMLInputElement).value;
    const color = (document.getElementById('bs-color') as HTMLInputElement).value;
    const opacity = parseInt((document.getElementById('bs-opacity') as HTMLInputElement).value) / 100;
    const inset = (document.getElementById('bs-inset') as HTMLInputElement).checked;

    document.getElementById('bs-x-val')!.textContent = `${x}px`;
    document.getElementById('bs-y-val')!.textContent = `${y}px`;
    document.getElementById('bs-blur-val')!.textContent = `${blur}px`;
    document.getElementById('bs-spread-val')!.textContent = `${spread}px`;

    // Convert hex to rgba
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    const rgba = `rgba(${r}, ${g}, ${b}, ${opacity.toFixed(2)})`;

    const insetStr = inset ? 'inset ' : '';
    const shadow = `${insetStr}${x}px ${y}px ${blur}px ${spread}px ${rgba}`;

    document.getElementById('bs-preview')!.style.boxShadow = shadow;
    document.getElementById('bs-css')!.textContent = `box-shadow: ${shadow};`;
}
