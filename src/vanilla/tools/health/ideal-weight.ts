export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Personal Metrics</h4>
        <div class="input-group" style="margin-bottom: var(--space-4);">
          <label>Biological Gender</label>
          <div class="toggle-group" id="iw-gender">
            <button class="btn btn--sm active" data-gender="male">Male</button>
            <button class="btn btn--sm" data-gender="female">Female</button>
          </div>
        </div>
        <div class="input-group" style="margin-top: var(--space-4);">
          <label for="iw-height">Height (cm)</label>
          <input type="number" id="iw-height" class="input-field" value="175" style="padding: var(--space-3); font-weight: 700;">
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Miller Formula:</strong> This calculation is based on the popular Miller formula used by health professionals worldwide.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Healthy Projections</h3>
      </div>
      
      <div class="stat-card" style="margin-bottom: var(--space-6); background: var(--color-primary-light); border-color: rgba(37, 99, 235, 0.2); text-align: center; padding: var(--space-10);">
        <div class="stat-card__label" style="color: var(--color-primary);">Ideal Body Weight</div>
        <div class="stat-card__value" id="iw-result" style="font-size: 5rem; color: var(--color-primary); line-height: 1;">--</div>
      </div>

      <div class="p-card" style="background: var(--color-surface-hover);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
              <div style="width: 12px; height: 12px; background: #10b981; border-radius: 50%;"></div>
              <div style="font-size: var(--fs-sm); font-weight: 600; color: var(--color-text-secondary);" id="iw-details">BMI Target: 18.5 - 25</div>
          </div>
      </div>

      <div style="margin-top: var(--space-6); text-align: center;">
          <p style="font-size: var(--fs-xs); color: var(--color-text-muted);">
            <em>Note: Clinical ideal weight is an estimation and does not account for muscle mass or bone density.</em>
          </p>
      </div>
    </div>
  `;

    const heightIn = document.getElementById('iw-height') as HTMLInputElement;
    const genderBtns = container.querySelectorAll('#iw-gender button');
    const resultEl = document.getElementById('iw-result')!;

    let gender = 'male';

    genderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            genderBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            gender = (btn as HTMLElement).dataset.gender!;
            calculate();
        });
    });

    const calculate = () => {
        const height = parseFloat(heightIn.value) || 0;
        if (height < 100) return;

        const inchesOver5ft = (height / 2.54) - 60;
        let ideal = gender === 'male' ? 56.2 + (1.41 * inchesOver5ft) : 53.1 + (1.36 * inchesOver5ft);
        resultEl.textContent = `${ideal.toFixed(1)} kg`;
    };

    heightIn.addEventListener('input', calculate);
    calculate();
}
