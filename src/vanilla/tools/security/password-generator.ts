export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Length Control</h4>
        <div class="slider-group">
          <div class="slider-group__header" style="margin-bottom: var(--space-2);">
            <span class="slider-group__label" style="font-weight: 600;">Characters count</span>
            <span class="slider-group__value" id="pg-len-val" style="color: var(--color-primary); font-weight: 800;">16</span>
          </div>
          <input type="range" id="pg-length" min="4" max="128" value="16" style="width: 100%; cursor: pointer; accent-color: var(--color-primary);" />
        </div>
      </div>

      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Security Options</h4>
        <div class="checkbox-group" style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-3);">
          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="pg-upper" checked /> <span>Uppercase</span>
          </label>
          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="pg-lower" checked /> <span>Lowercase</span>
          </label>
          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="pg-numbers" checked /> <span>Numbers</span>
          </label>
          <label class="checkbox-label" style="display: flex; align-items: center; gap: 8px; cursor: pointer;">
            <input type="checkbox" id="pg-symbols" checked /> <span>Symbols</span>
          </label>
        </div>
      </div>
      
      <button class="btn btn--primary btn--block btn--lg" id="btn-generate">⚡ Generate New Password</button>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Generated Password</h3>
        <button class="btn btn--secondary btn--sm" id="btn-copy">📋 Copy</button>
      </div>
      
      <div class="result-box" style="padding: var(--space-8); display: flex; align-items: center; justify-content: center; min-height: 150px; margin-bottom: var(--space-6);">
        <span id="pg-output" style="font-family: 'JetBrains Mono'; font-size: 1.5rem; font-weight: 700; color: var(--color-primary); word-break: break-all; text-align: center;">Click generate to create a password</span>
      </div>
      
      <div class="p-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-3);">
          <span style="font-size:var(--fs-xs); font-weight: 600; color:var(--color-text-muted); text-transform: uppercase;">Security Strength</span>
          <span id="pg-strength-text" style="font-size:var(--fs-sm); font-weight:var(--fw-bold);">—</span>
        </div>
        <div style="height:10px; border-radius:var(--radius-full); background:var(--color-surface-hover); overflow:hidden; border: 1px solid var(--color-border);">
          <div id="pg-strength-bar" style="height:100%; width:0%; border-radius:var(--radius-full); transition:all var(--transition-normal);"></div>
        </div>
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); margin-top: var(--space-4); line-height: 1.6;">
          <strong>Tip:</strong> Longer passwords with mixed characters are significantly harder to crack using brute-force attacks.
        </p>
      </div>
    </div>
  `;

    const slider = document.getElementById('pg-length') as HTMLInputElement;
    slider.addEventListener('input', () => {
        document.getElementById('pg-len-val')!.textContent = slider.value;
    });

    document.getElementById('btn-generate')!.addEventListener('click', generate);
    document.getElementById('btn-copy')!.addEventListener('click', () => {
        navigator.clipboard.writeText(document.getElementById('pg-output')!.textContent || '');
        const btn = document.getElementById('btn-copy')!;
        btn.textContent = '✅';
        setTimeout(() => (btn.textContent = '📋 Copy'), 1500);
    });

    generate(); // auto-generate on load
}

function generate(): void {
    const length = parseInt((document.getElementById('pg-length') as HTMLInputElement).value);
    let charset = '';
    if ((document.getElementById('pg-upper') as HTMLInputElement).checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if ((document.getElementById('pg-lower') as HTMLInputElement).checked) charset += 'abcdefghijklmnopqrstuvwxyz';
    if ((document.getElementById('pg-numbers') as HTMLInputElement).checked) charset += '0123456789';
    if ((document.getElementById('pg-symbols') as HTMLInputElement).checked) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) { charset = 'abcdefghijklmnopqrstuvwxyz'; }

    const arr = new Uint32Array(length);
    crypto.getRandomValues(arr);
    const password = Array.from(arr, (v) => charset[v % charset.length]).join('');

    document.getElementById('pg-output')!.textContent = password;

    // Strength
    let strength = 0;
    if (length >= 8) strength++;
    if (length >= 12) strength++;
    if (length >= 16) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = ['#ef4444', '#f97316', '#f59e0b', '#84cc16', '#22c55e', '#059669'];
    const idx = Math.min(strength, labels.length - 1);

    const bar = document.getElementById('pg-strength-bar')!;
    const text = document.getElementById('pg-strength-text')!;
    bar.style.width = `${((idx + 1) / labels.length) * 100}%`;
    bar.style.background = colors[idx];
    text.textContent = labels[idx];
    text.style.color = colors[idx];
}
