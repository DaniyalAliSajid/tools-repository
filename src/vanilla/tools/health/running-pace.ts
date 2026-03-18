export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Performance Data</h4>
        <div class="input-group">
          <label for="rp-dist">Target Distance (km)</label>
          <input type="number" id="rp-dist" class="input-field" value="5" step="0.1" style="padding: var(--space-3); font-weight: 700;">
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label>Target Time (HH:MM:SS)</label>
          <div style="display: flex; gap: var(--space-2);">
            <input type="number" id="rp-h" class="input-field" value="0" placeholder="HH" min="0" style="padding: var(--space-3); text-align: center;">
            <input type="number" id="rp-m" class="input-field" value="25" placeholder="MM" min="0" max="59" style="padding: var(--space-3); text-align: center;">
            <input type="number" id="rp-s" class="input-field" value="0" placeholder="SS" min="0" max="59" style="padding: var(--space-3); text-align: center;">
          </div>
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Pro Tip:</strong> Knowing your pace helps you stay on track during long-distance races and prevents burnout.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Pace Analysis</h3>
      </div>
      
      <div class="stat-card" style="margin-bottom: var(--space-6); background: var(--color-success-light); border-color: rgba(16, 185, 129, 0.2); text-align: center; padding: var(--space-10);">
        <div class="stat-card__label" style="color: var(--color-success);">Average Pace Required</div>
        <div class="stat-card__value" id="rp-pace" style="font-size: 5rem; color: var(--color-success); line-height: 1;">--</div>
        <div style="margin-top: var(--space-2); font-size: var(--fs-xs); color: var(--color-success); opacity: 0.8; font-weight: 600;">MINUTES PER KILOMETER</div>
      </div>

      <div class="p-card" style="background: var(--color-surface-hover);">
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
              <div>
                  <div style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase;">DISTANCE</div>
                  <div style="font-weight: 700;" id="rp-summary-dist">5 km</div>
              </div>
              <div>
                  <div style="font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase;">TOTAL TIME</div>
                  <div style="font-weight: 700;" id="rp-summary-time">00:25:00</div>
              </div>
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

        paceEl.textContent = `${pm}:${ps.toString().padStart(2, '0')}`;
        
        document.getElementById('rp-summary-dist')!.textContent = `${dist} km`;
        document.getElementById('rp-summary-time')!.textContent = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    [distIn, hIn, mIn, sIn].forEach(inp => inp.addEventListener('input', calculate));
    calculate();
}
