export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Input Validation</h4>
        <div class="input-group">
          <label for="pd-input">Word or Phrase</label>
          <input type="text" class="input-field" id="pd-input" placeholder="e.g. racecar, A man a plan a canal Panama" style="padding: var(--space-4); font-size: 1.125rem; font-weight: 500;" />
        </div>
        <button class="btn btn--primary btn--block btn--lg" id="btn-check" style="margin-top: var(--space-4);">🔍 Check Accuracy</button>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Verdict</h3>
      </div>
      
      <div id="pd-result" style="display: none; height: 100%; min-height: 250px; flex-direction: column; align-items: center; justify-content: center; border-radius: var(--radius-2xl); transition: all 0.3s ease;">
        <span id="pd-emoji" style="font-size: 4rem; margin-bottom: var(--space-4);"></span>
        <span id="pd-text" style="font-size: 1.5rem; font-weight: 700;"></span>
      </div>

      <div id="pd-placeholder" style="height: 100%; min-height: 250px; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--color-text-muted); text-align: center; border: 1px dashed var(--color-border); border-radius: var(--radius-2xl);">
        <span style="font-size: 3rem; margin-bottom: var(--space-4); opacity: 0.5;">🔄</span>
        <p>Enter a text and check if it reads the same backwards.</p>
      </div>
    </div>
  `;

    document.getElementById('btn-check')!.addEventListener('click', () => {
        const input = (document.getElementById('pd-input') as HTMLInputElement).value;
        const cleaned = input.toLowerCase().replace(/[^a-z0-9]/g, '');
        const reversed = [...cleaned].reverse().join('');
        const isPalindrome = cleaned.length > 0 && cleaned === reversed;
        const result = document.getElementById('pd-result')!;
        const placeholder = document.getElementById('pd-placeholder')!;
        const emojiEl = document.getElementById('pd-emoji')!;
        const textEl = document.getElementById('pd-text')!;
        
        result.style.display = 'flex';
        placeholder.style.display = 'none';

        if (isPalindrome) {
            textEl.textContent = "Yes! It's a palindrome!";
            emojiEl.textContent = '✅';
            result.style.background = '#f0fdf4';
            result.style.color = '#166534';
            result.style.border = '2px solid #bbf7d0';
        } else {
            textEl.textContent = "Not a palindrome";
            emojiEl.textContent = '❌';
            result.style.background = '#fef2f2';
            result.style.color = '#991b1b';
            result.style.border = '2px solid #fecaca';
        }
    });

    // Also check on Enter
    document.getElementById('pd-input')!.addEventListener('keydown', (e) => {
        if ((e as KeyboardEvent).key === 'Enter') {
            document.getElementById('btn-check')!.click();
        }
    });
}
