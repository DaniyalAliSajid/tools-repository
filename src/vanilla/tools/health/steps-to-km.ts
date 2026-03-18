export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Activity Logs</h4>
        <div class="input-group">
          <label for="sk-steps">Number of Steps Taken</label>
          <input type="number" id="sk-steps" class="input-field" value="10000" style="padding: var(--space-3); font-weight: 700;">
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="sk-height">User Height (cm)</label>
          <input type="number" id="sk-height" class="input-field" value="175" style="padding: var(--space-3);">
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Calculation Logic:</strong> Stride length is estimated as 41.5% of your height, which is the average for healthy adults.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Distance Estimation</h3>
      </div>
      
      <div class="stat-card" style="margin-bottom: var(--space-6); background: var(--color-success-light); border-color: rgba(16, 185, 129, 0.2); text-align: center; padding: var(--space-10);">
        <div class="stat-card__label" style="color: var(--color-success);">Total Distance (Kilometers)</div>
        <div class="stat-card__value" id="sk-km" style="font-size: 5rem; color: var(--color-success); line-height: 1;">--</div>
      </div>

      <div class="p-card" style="background: var(--color-surface-hover);">
          <div style="display: flex; justify-content: space-between; align-items: center;">
              <div style="font-size: var(--fs-sm); font-weight: 600; color: var(--color-text-secondary);">Imperial Equivalent</div>
              <div id="sk-miles" style="font-weight: 700; font-size: var(--fs-lg);">--</div>
          </div>
      </div>
    </div>
  `;

    const stepsIn = document.getElementById('sk-steps') as HTMLInputElement;
    const heightIn = document.getElementById('sk-height') as HTMLInputElement;
    const kmEl = document.getElementById('sk-km')!;
    const milesEl = document.getElementById('sk-miles')!;

    const calculate = () => {
        const steps = parseFloat(stepsIn.value) || 0;
        const height = parseFloat(heightIn.value) || 0;

        // Stride length estimate: Height * 0.415
        const strideCm = height * 0.415;
        const totalCm = steps * strideCm;
        const totalKm = totalCm / 100000;
        const totalMiles = totalKm * 0.621371;

        kmEl.textContent = `${totalKm.toFixed(2)} km`;
        milesEl.textContent = `${totalMiles.toFixed(2)} miles`;
    };

    [stepsIn, heightIn].forEach(inp => inp.addEventListener('input', calculate));
    calculate();
}
