export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="rp-dist">Distance (km)</label>
          <input type="number" id="rp-dist" class="input-field" value="5" step="0.1">
        </div>
        <div class="input-group">
          <label>Time (HH:MM:SS)</label>
          <div style="display: flex; gap: var(--space-2);">
            <input type="number" id="rp-h" class="input-field" value="0" placeholder="HH" min="0">
            <input type="number" id="rp-m" class="input-field" value="25" placeholder="MM" min="0" max="59">
            <input type="number" id="rp-s" class="input-field" value="0" placeholder="SS" min="0" max="59">
          </div>
        </div>
      </div>

      <div class="input-group" style="margin-top: var(--space-8);">
        <label>Your Pace</label>
        <div class="result-box" style="text-align: center; padding: var(--space-8); background: #f0fdf4;">
           <div id="rp-pace" style="font-size: 4rem; font-weight: 700; color: #166534;">--</div>
           <div style="margin-top: var(--space-2); font-weight: 600; color: #14532d;">Minutes per Kilometer</div>
        </div>
      </div>
    </div>
  `;

    const distIn = document.getElementById('rp-dist') as HTMLInputElement;
    const hIn = document.getElementById('rp-h') as HTMLInputElement;
    const mIn = document.getElementById('rp-m') as HTMLInputElement;
    const sIn = document.getElementById('rp-s') as HTMLInputElement;
    const paceEl = document.getElementById('rp-pace')!;

    const calculate = () => {
        const dist = parseFloat(distIn.value) || 0;
        const h = parseInt(hIn.value) || 0;
        const m = parseInt(mIn.value) || 0;
        const s = parseInt(sIn.value) || 0;

        if (dist <= 0) return;

        const totalSeconds = (h * 3600) + (m * 60) + s;
        const paceSeconds = totalSeconds / dist;

        const pm = Math.floor(paceSeconds / 60);
        const ps = Math.round(paceSeconds % 60);

        paceEl.textContent = `${pm}:${ps.toString().padStart(2, '0')} /km`;
    };

    [distIn, hIn, mIn, sIn].forEach(inp => inp.addEventListener('input', calculate));
    calculate();
}
