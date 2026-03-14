export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="psc-input">Enter Password</label>
        <div style="position:relative;">
          <input type="password" class="input-field" id="psc-input" placeholder="Type a password to test..." style="padding-right:48px;" />
          <button class="btn btn--icon" id="btn-toggle" style="position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;color:var(--color-text-muted);font-size:1.2rem;">👁️</button>
        </div>
      </div>
      
      <div style="margin-top:var(--space-6);">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-2);">
          <span style="font-size:var(--fs-lg);font-weight:var(--fw-bold);" id="psc-status">Too Short</span>
          <span id="psc-score" style="font-size:var(--fs-md);background:var(--color-surface-alt);padding:var(--space-1) var(--space-3);border-radius:var(--radius-full);">0 / 5</span>
        </div>
        <div style="height:8px;border-radius:var(--radius-full);background:var(--color-border);overflow:hidden;margin-bottom:var(--space-4);">
          <div id="psc-bar" style="height:100%;width:0%;border-radius:var(--radius-full);transition:all var(--transition-normal);background:var(--color-danger);"></div>
        </div>
      </div>

      <div class="tool-grid-2" style="margin-top:var(--space-4);">
        <div class="result-box">
          <h4 style="margin-bottom:var(--space-3);color:var(--color-text-secondary);font-size:var(--fs-sm);text-transform:uppercase;letter-spacing:0.05em;">Security Checklist</h4>
          <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:var(--space-3);">
            <li class="psc-check" id="check-length" style="display:flex;align-items:center;gap:var(--space-2);color:var(--color-text-muted);">
              <span class="icon">❌</span> At least 8 characters
            </li>
            <li class="psc-check" id="check-upper" style="display:flex;align-items:center;gap:var(--space-2);color:var(--color-text-muted);">
              <span class="icon">❌</span> Contains uppercase letter
            </li>
            <li class="psc-check" id="check-lower" style="display:flex;align-items:center;gap:var(--space-2);color:var(--color-text-muted);">
              <span class="icon">❌</span> Contains lowercase letter
            </li>
            <li class="psc-check" id="check-number" style="display:flex;align-items:center;gap:var(--space-2);color:var(--color-text-muted);">
              <span class="icon">❌</span> Contains number (0-9)
            </li>
            <li class="psc-check" id="check-symbol" style="display:flex;align-items:center;gap:var(--space-2);color:var(--color-text-muted);">
              <span class="icon">❌</span> Contains special character
            </li>
          </ul>
        </div>
        
        <div class="result-box" style="display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;background:var(--color-surface-alt);">
          <div style="font-size:var(--fs-sm);color:var(--color-text-secondary);margin-bottom:var(--space-2);text-transform:uppercase;letter-spacing:0.05em;">Estimated Time to Crack</div>
          <div id="psc-time" style="font-size:var(--fs-3xl);font-weight:var(--fw-bold);color:var(--color-primary);line-height:1.2;">Instantly</div>
          <div style="font-size:var(--fs-xs);color:var(--color-text-muted);margin-top:var(--space-4);max-width:80%;">Based on standard offline dictionary/brute-force attacks against modern hashing algorithms.</div>
        </div>
      </div>
    </div>
  `;

    const input = document.getElementById('psc-input') as HTMLInputElement;
    const toggle = document.getElementById('btn-toggle')!;

    toggle.addEventListener('click', () => {
        if (input.type === 'password') {
            input.type = 'text';
            toggle.textContent = '🙈';
        } else {
            input.type = 'password';
            toggle.textContent = '👁️';
        }
    });

    input.addEventListener('input', checkStrength);

    // Initialize empty state
    checkStrength();
}

function checkStrength(): void {
    const pwd = (document.getElementById('psc-input') as HTMLInputElement).value;

    const hasLength = pwd.length >= 8;
    const hasUpper = /[A-Z]/.test(pwd);
    const hasLower = /[a-z]/.test(pwd);
    const hasNumber = /[0-9]/.test(pwd);
    const hasSymbol = /[^A-Za-z0-9]/.test(pwd);

    updateCheckItem('check-length', hasLength);
    updateCheckItem('check-upper', hasUpper);
    updateCheckItem('check-lower', hasLower);
    updateCheckItem('check-number', hasNumber);
    updateCheckItem('check-symbol', hasSymbol);

    let score = 0;
    if (pwd.length > 0) {
        if (hasLength) score++;
        if (pwd.length >= 12) score++; // bonus for extra length
        if (hasUpper && hasLower) score++;
        if (hasNumber) score++;
        if (hasSymbol) score++;
        // Cap at 5
        score = Math.min(5, score);
    }

    // Edge cases for weak patterns (if simple words exist, drop score)
    if (pwd.length > 0 && /^(123|password|qwerty|admin)/i.test(pwd)) {
        score = 1;
    }

    const statuses = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong'];
    const colors = [
        'var(--color-danger)',
        'var(--color-danger)',
        '#f59e0b', // warning orange
        '#84cc16', // lime
        'var(--color-success)',
        '#059669'  // deep emerald
    ];

    document.getElementById('psc-score')!.textContent = `${score} / 5`;
    document.getElementById('psc-status')!.textContent = pwd.length === 0 ? 'Enter a password' : statuses[score];
    document.getElementById('psc-status')!.style.color = pwd.length === 0 ? 'var(--color-text)' : colors[score];

    const bar = document.getElementById('psc-bar')!;
    bar.style.width = pwd.length === 0 ? '0%' : `${(score / 5) * 100}%`;
    bar.style.backgroundColor = colors[score];

    // Calculate cracking time (very rough heuristic for UI purposes)
    const timeEl = document.getElementById('psc-time')!;
    if (pwd.length === 0) {
        timeEl.textContent = '—';
        timeEl.style.color = 'var(--color-text-muted)';
    } else {
        let poolSize = 0;
        if (hasLower) poolSize += 26;
        if (hasUpper) poolSize += 26;
        if (hasNumber) poolSize += 10;
        if (hasSymbol) poolSize += 32;
        if (poolSize === 0) poolSize = 26; // default

        // Combinations: poolSize^length
        const combinations = Math.pow(poolSize, pwd.length);
        // Assume 100 Billion guesses per second (high-end GPU cluster)
        const guessesPerSecond = 100e9;
        const seconds = combinations / guessesPerSecond;

        timeEl.textContent = formatCrackingTime(seconds);
        timeEl.style.color = pwd.length < 8 ? 'var(--color-danger)' : (score >= 4 ? 'var(--color-success)' : 'var(--color-primary)');
    }
}

function updateCheckItem(id: string, isValid: boolean): void {
    const el = document.getElementById(id)!;
    const icon = el.querySelector('.icon') as HTMLSpanElement;
    if (isValid) {
        icon.textContent = '✅';
        el.style.color = 'var(--color-success)';
    } else {
        icon.textContent = '❌';
        el.style.color = 'var(--color-text-muted)';
    }
}

function formatCrackingTime(seconds: number): string {
    if (seconds < 1) return 'Instantly';
    if (seconds < 60) return `${Math.round(seconds)} seconds`;
    if (seconds < 3600) return `${Math.round(seconds / 60)} minutes`;
    if (seconds < 86400) return `${Math.round(seconds / 3600)} hours`;
    if (seconds < 2592000) return `${Math.round(seconds / 86400)} days`;
    if (seconds < 31536000) return `${Math.round(seconds / 2592000)} months`;

    const years = seconds / 31536000;
    if (years < 1000) return `${Math.round(years)} years`;
    if (years < 1000000) return `${Math.round(years / 1000)}k years`;
    if (years < 1000000000) return `${Math.round(years / 1000000)}m years`;
    return '> 1 Billion years';
}
