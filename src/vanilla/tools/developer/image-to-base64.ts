export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="img-input">Select an Image</label>
        <input type="file" id="img-input" class="input-field" accept="image/*" />
      </div>

      <div class="input-group" id="preview-group" style="display: none; text-align: center; margin-top: var(--space-4);">
        <img id="img-preview" style="max-width: 100%; max-height: 250px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);" />
      </div>

      <div class="input-group" id="base64-group" style="display: none; margin-top: var(--space-4); position: relative;">
        <label>Base64 Encoded Output</label>
        <textarea class="input-field" id="base64-result" rows="10" readonly style="font-family: monospace; font-size: 0.875rem; width: 100%; resize: vertical; padding-right: 5rem;"></textarea>
        <button class="btn btn--secondary btn--sm" id="base64-copy" style="position: absolute; top: 2rem; right: 0.5rem; z-index: 10;">Copy All</button>
      </div>
    </div>
  `;

    const input = document.getElementById('img-input') as HTMLInputElement;
    const previewGroup = document.getElementById('preview-group')!;
    const previewImg = document.getElementById('img-preview') as HTMLImageElement;
    const base64Group = document.getElementById('base64-group')!;
    const result = document.getElementById('base64-result') as HTMLTextAreaElement;
    const copyBtn = document.getElementById('base64-copy') as HTMLButtonElement;

    input.addEventListener('change', (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) {
            previewGroup.style.display = 'none';
            base64Group.style.display = 'none';
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            const base64String = event.target?.result as string;
            previewImg.src = base64String;
            result.value = base64String;

            previewGroup.style.display = 'block';
            base64Group.style.display = 'block';
        };
        reader.readAsDataURL(file);
    });

    copyBtn.addEventListener('click', () => {
        if (!result.value) return;

        try {
            navigator.clipboard.writeText(result.value).then(() => {
                showCopied();
            }).catch(() => {
                fallbackCopy();
            });
        } catch (err) {
            fallbackCopy();
        }

        function fallbackCopy() {
            result.select();
            document.execCommand('copy');
            showCopied();
        }

        function showCopied() {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => copyBtn.textContent = originalText, 2000);
        }
    });
}
