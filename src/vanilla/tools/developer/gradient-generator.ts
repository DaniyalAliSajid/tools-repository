export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="gg-type">Gradient Type</label>
          <select class="input-field" id="gg-type">
            <option value="linear-gradient">Linear</option>
            <option value="radial-gradient">Radial</option>
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
      <div class="input-group">
        <label for="gg-color3">Color 3 (optional)</label>
        <input type="color" class="input-field" id="gg-color3" value="#f59e0b" style="padding:var(--space-1);height:44px;" />
        <label class="checkbox-label" style="margin-top:var(--space-1);">
          <input type="checkbox" id="gg-use3" /> Use 3rd color
        </label>
      </div>
      <div id="gg-preview" style="height:200px;border-radius:var(--radius-xl);border:1px solid var(--color-border);box-shadow:var(--shadow-md);transition:background var(--transition-normal);"></div>
      <div class="result-box" style="position:relative;">
        <code id="gg-css" style="flex:1;font-size:var(--fs-sm);">background: linear-gradient(135deg, #6366f1, #ec4899);</code>
        <button class="btn btn--sm btn--primary result-box__copy" id="btn-copy">📋</button>
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
