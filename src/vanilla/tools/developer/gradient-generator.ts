export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Structure</h4>
        <div class="input-group">
          <label for="gg-type">Gradient Type</label>
          <select class="input-field" id="gg-type">
            <option value="linear-gradient">Linear Gradient</option>
            <option value="radial-gradient">Radial Gradient</option>
          </select>
        </div>
        <div class="slider-group">
          <div class="slider-group__header">
            <span class="slider-group__label">Angle</span>
            <span class="slider-group__value" id="gg-angle-val">135°</span>
          </div>
          <input type="range" id="gg-angle" min="0" max="360" value="135" />
        </div>
      </div>

      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Color Stops</h4>
        <div class="tool-grid-2">
          <div class="input-group">
            <label for="gg-color1">Color 1</label>
            <input type="color" class="input-field" id="gg-color1" value="#6366f1" style="padding:var(--space-1);height:44px;" />
          </div>
          <div class="input-group">
            <label for="gg-color2">Color 2</label>
            <input type="color" class="input-field" id="gg-color2" value="#ec4899" style="padding:var(--space-1);height:44px;" />
          </div>
        </div>
        <div class="input-group" style="margin-top: var(--space-4); border-top: 1px solid var(--color-border); padding-top: var(--space-4);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
            <label for="gg-color3">Extra Color</label>
            <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
              <input type="checkbox" id="gg-use3" /> <span>Enable</span>
            </label>
          </div>
          <input type="color" class="input-field" id="gg-color3" value="#f59e0b" style="padding:var(--space-1);height:44px;" />
        </div>
      </div>
    </div>
    <div class="tool-layout__output">
      <h3 style="margin-bottom: var(--space-4); font-size: var(--fs-base);">Interactive Preview</h3>
      <div id="gg-preview" style="height:300px; border-radius:var(--radius-2xl); border:1px solid var(--color-border); box-shadow:var(--shadow-lg); transition:background var(--transition-normal); margin-bottom: var(--space-6);"></div>
      
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase;">Generated CSS</h3>
        <button class="btn btn--secondary btn--sm" id="btn-copy">📋 Copy Styles</button>
      </div>
      <div class="result-box" style="padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: var(--fs-sm); line-height: 1.5;">
        <code id="gg-css">background: linear-gradient(135deg, #6366f1, #ec4899);</code>
      </div>
    </div>
  `;

    const inputs = ['gg-type', 'gg-angle', 'gg-color1', 'gg-color2', 'gg-color3', 'gg-use3'];
    inputs.forEach((id) => {
        document.getElementById(id)!.addEventListener('input', updateGradient);
        document.getElementById(id)!.addEventListener('change', updateGradient);
    });

    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText(document.getElementById('gg-css')!.textContent || '');
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅';
        setTimeout(() => (btn.textContent = '📋'), 1500);
    });

    updateGradient();
}

function updateGradient(): void {
    const type = (document.getElementById('gg-type') as HTMLSelectElement).value;
    const angle = (document.getElementById('gg-angle') as HTMLInputElement).value;
    const color1 = (document.getElementById('gg-color1') as HTMLInputElement).value;
    const color2 = (document.getElementById('gg-color2') as HTMLInputElement).value;
    const color3 = (document.getElementById('gg-color3') as HTMLInputElement).value;
    const use3 = (document.getElementById('gg-use3') as HTMLInputElement).checked;

    document.getElementById('gg-angle-val')!.textContent = `${angle}°`;

    const colors = use3 ? `${color1}, ${color3}, ${color2}` : `${color1}, ${color2}`;
    const direction = type === 'linear-gradient' ? `${angle}deg, ` : '';
    const gradient = `${type}(${direction}${colors})`;

    document.getElementById('gg-preview')!.style.background = gradient;
    document.getElementById('gg-css')!.textContent = `background: ${gradient};`;
}
