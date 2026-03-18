export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Select Source</h4>
        <div class="input-group">
          <label for="img-input" style="display: flex; flex-direction: column; align-items: center; justify-content: center; border: 2px dashed var(--color-border); padding: var(--space-8); border-radius: var(--radius-xl); cursor: pointer; transition: all 0.2s;">
            <span style="font-size: 2rem; margin-bottom: var(--space-2);">🖼️</span>
            <span style="font-weight: 600; color: var(--color-primary);">Click to upload image</span>
            <span style="font-size: var(--fs-xs); color: var(--color-text-muted); margin-top: 4px;">Supports PNG, JPG, WEBP, GIF</span>
            <input type="file" id="img-input" class="input-field" accept="image/*" style="display: none;" />
          </label>
        </div>
      </div>
      
      <div id="preview-group" style="display: none;">
        <h3 style="margin-bottom: var(--space-3); font-size: var(--fs-base);">Input Preview</h3>
        <div class="preview-area" style="min-height: 250px;">
          <img id="img-preview" style="max-width: 90%; max-height: 220px; border-radius: var(--radius-lg); box-shadow: var(--shadow-lg);" />
        </div>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Base64 Result</h3>
        <button class="btn btn--secondary btn--sm" id="base64-copy">📋 Copy All</button>
      </div>
      <div id="base64-group" style="display: none; height: calc(100% - 48px);">
        <textarea class="result-box" id="base64-result" rows="15" readonly style="width: 100%; height: 100%; min-height: 400px; padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: 0.75rem; line-height: 1.4; border: none; outline: none; resize: none;"></textarea>
      </div>
      <div id="base64-placeholder" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--color-text-muted); padding: var(--space-12); text-align: center; border: 1px dashed var(--color-border); border-radius: var(--radius-2xl);">
        <span style="font-size: 3rem; margin-bottom: var(--space-4); opacity: 0.5;">📋</span>
        <p>The Base64 encoded string will appear here after you select an image.</p>
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
            document.getElementById('base64-placeholder')!.style.display = 'none';
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
