export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="slider-group">
        <div class="slider-group__header">
          <span class="slider-group__label">Password Length</span>
          <span class="slider-group__value" id="pg-len-val">16</span>
        </div>
        <input type="range" id="pg-length" min="4" max="128" value="16" />
      </div>
      <div class="checkbox-group">
        <label class="checkbox-label"><input type="checkbox" id="pg-upper" checked /> Uppercase (A-Z)</label>
        <label class="checkbox-label"><input type="checkbox" id="pg-lower" checked /> Lowercase (a-z)</label>
        <label class="checkbox-label"><input type="checkbox" id="pg-numbers" checked /> Numbers (0-9)</label>
        <label class="checkbox-label"><input type="checkbox" id="pg-symbols" checked /> Symbols (!@#$)</label>
      </div>
      <button class="btn btn--primary btn--block" id="btn-generate">🔑 Generate Password</button>
      <div class="result-box" style="font-size:var(--fs-lg);text-align:center;word-break:break-all;">
        <span id="pg-output" style="flex:1;user-select:all;">Click generate to create a password</span>
        <button class="btn btn--sm btn--primary result-box__copy" id="btn-copy">📋 Copy</button>
      </div>
      <div style="margin-top:var(--space-2);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-1);">
          <span style="font-size:var(--fs-sm);color:var(--color-text-secondary)">Strength</span>
          <span id="pg-strength-text" style="font-size:var(--fs-sm);font-weight:var(--fw-semibold);">—</span>
        </div>
        <div style="height:6px;border-radius:var(--radius-full);background:var(--color-border);overflow:hidden;">
          <div id="pg-strength-bar" style="height:100%;width:0%;border-radius:var(--radius-full);transition:all var(--transition-normal);"></div>
        </div>
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
