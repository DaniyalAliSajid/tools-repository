export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Password Entry</h4>
        <div class="input-group">
          <label for="psc-input">Security Check</label>
          <div style="position:relative;">
            <input type="password" class="input-field" id="psc-input" placeholder="Enter password to analyze..." style="padding: var(--space-4); padding-right: 52px; font-family: 'JetBrains Mono'; font-size: 1.125rem;" />
            <button id="btn-toggle" style="position:absolute; right: var(--space-2); top: 50%; translate: 0 -50%; border: none; background: var(--color-surface); padding: var(--space-2); border-radius: var(--radius-md); cursor: pointer; font-size: 1.25rem;">👁️</button>
          </div>
        </div>
        
        <div style="margin-top: var(--space-6);">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
            <span id="psc-status" style="font-weight: 700; font-size: var(--fs-sm);">No input</span>
            <span id="psc-score" style="font-size: var(--fs-xs); color: var(--color-text-muted); font-weight: 600;">SCORE: 0/5</span>
          </div>
          <div style="height: 12px; background: var(--color-surface-hover); border-radius: var(--radius-full); overflow: hidden; border: 1px solid var(--color-border); box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);">
            <div id="psc-bar" style="height: 100%; width: 0%; transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);"></div>
          </div>
        </div>
      </div>

      <div class="p-card" style="margin-top: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Security Checklist</h4>
        <ul style="list-style: none; padding: 0; display: flex; flex-direction: column; gap: var(--space-3);">
          <li class="psc-check" id="check-length" style="display:flex; align-items:center; gap:var(--space-2); font-size: var(--fs-sm); transition: color 0.3s;">
            <span class="icon" style="font-size: 1rem;">❌</span> At least 8 characters
          </li>
          <li class="psc-check" id="check-upper" style="display:flex; align-items:center; gap:var(--space-2); font-size: var(--fs-sm); transition: color 0.3s;">
            <span class="icon" style="font-size: 1rem;">❌</span> Contains uppercase
          </li>
          <li class="psc-check" id="check-lower" style="display:flex; align-items:center; gap:var(--space-2); font-size: var(--fs-sm); transition: color 0.3s;">
            <span class="icon" style="font-size: 1rem;">❌</span> Contains lowercase
          </li>
          <li class="psc-check" id="check-number" style="display:flex; align-items:center; gap:var(--space-2); font-size: var(--fs-sm); transition: color 0.3s;">
            <span class="icon" style="font-size: 1rem;">❌</span> Contains numbers
          </li>
          <li class="psc-check" id="check-symbol" style="display:flex; align-items:center; gap:var(--space-2); font-size: var(--fs-sm); transition: color 0.3s;">
            <span class="icon" style="font-size: 1rem;">❌</span> Contains symbols
          </li>
        </ul>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Vulnerability Insight</h3>
      </div>
      <div class="stat-card" style="text-align: center; padding: var(--space-12); background: var(--color-surface-hover); border: 2px solid var(--color-border);">
        <div style="font-size: var(--fs-xs); text-transform: uppercase; color: var(--color-text-muted); letter-spacing: 0.1em; font-weight: 700; margin-bottom: var(--space-4);">Est. time to crack</div>
        <div id="psc-time" style="font-size: 3.5rem; font-weight: 800; color: var(--color-primary); letter-spacing: -0.02em; line-height: 1;">—</div>
        <p style="margin-top: var(--space-6); font-size: var(--fs-xs); color: var(--color-text-muted); max-width: 240px; margin-inline: auto;">
          Based on standard offline brute-force attacks against modern hashing algorithms.
        </p>
      </div>
      <div style="margin-top: var(--space-8); display: flex; justify-content: center; opacity: 0.05;">
        <span style="font-size: 8rem;">🛡️</span>
      </div>
    </div>
>
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
    document.getElementById('psc-status')!.textContent = pwd.length === 0 ? 'No input' : statuses[score];
    document.getElementById('psc-status')!.style.color = pwd.length === 0 ? 'var(--color-text-muted)' : colors[score];

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
