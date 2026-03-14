export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="sk-steps">Number of Steps</label>
          <input type="number" id="sk-steps" class="input-field" value="10000">
        </div>
        <div class="input-group">
          <label for="sk-height">Your Height (cm)</label>
          <input type="number" id="sk-height" class="input-field" value="175">
        </div>
      </div>

      <div class="input-group" style="margin-top: var(--space-8);">
        <label>Distance Covered</label>
        <div class="result-box" style="text-align: center; padding: var(--space-8); background: #f0fdf4;">
           <div id="sk-km" style="font-size: 4rem; font-weight: 700; color: #166534;">-- km</div>
           <div id="sk-miles" style="margin-top: var(--space-2); font-weight: 600; color: #14532d;">-- miles</div>
        </div>
        <div style="font-size: var(--fs-sm); opacity: 0.7; margin-top: var(--space-4); text-align: center;">
          Note: Stride length is estimated as 41.5% of height.
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
