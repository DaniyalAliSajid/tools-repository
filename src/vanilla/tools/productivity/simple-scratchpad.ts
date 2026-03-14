export function render(container: HTMLElement): void {
    const STORAGE_KEY = 'freetools_scratchpad';
    const savedContent = localStorage.getItem(STORAGE_KEY) || '';

    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="scratch-pad">Your Personal Scratchpad (Autosaved)</label>
        <textarea id="scratch-pad" class="input-field" rows="20" placeholder="Type notes, ideas, or snippets here..." style="font-family: inherit; line-height: 1.6;">${savedContent}</textarea>
      </div>
      <div style="text-align: right; margin-top: var(--space-4); opacity: 0.6; font-size: var(--fs-sm);">
        Changes are saved automatically to your browser.
      </div>
    </div>
  `;

    const pad = document.getElementById('scratch-pad') as HTMLTextAreaElement;

    pad.addEventListener('input', () => {
        localStorage.setItem(STORAGE_KEY, pad.value);
    });
}
