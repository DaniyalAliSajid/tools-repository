export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="pd-input">Enter a word or phrase</label>
        <input type="text" class="input-field" id="pd-input" placeholder="e.g. racecar, A man a plan a canal Panama" />
      </div>
      <button class="btn btn--primary btn--block" id="btn-check">Check Palindrome</button>
      <div id="pd-result" style="text-align:center;padding:var(--space-6);font-size:var(--fs-xl);font-weight:var(--fw-semibold);display:none;border-radius:var(--radius-lg);"></div>
    </div>
  `;

    document.getElementById('btn-check')!.addEventListener('click', () => {
        const input = (document.getElementById('pd-input') as HTMLInputElement).value;
        const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, '');
        const reversed = [...cleaned].reverse().join('');
        const isPalindrome = cleaned.length > 0 && cleaned === reversed;
        const result = document.getElementById('pd-result')!;
        result.style.display = 'block';

        if (isPalindrome) {
            result.textContent = '✅ Yes! It\'s a palindrome!';
            result.style.background = 'var(--color-cat-developer-bg)';
            result.style.color = 'var(--color-success)';
        } else {
            result.textContent = '❌ Not a palindrome';
            result.style.background = 'var(--color-cat-security-bg)';
            result.style.color = 'var(--color-error)';
        }
    });

    // Also check on Enter
    document.getElementById('pd-input')!.addEventListener('keydown', (e) => {
        if ((e as KeyboardEvent).key === 'Enter') {
            document.getElementById('btn-check')!.click();
        }
    });
}
