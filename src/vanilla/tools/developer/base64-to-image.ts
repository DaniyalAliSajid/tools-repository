export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Input Source</h4>
        <div class="input-group">
          <label for="base64-input">Base64 String</label>
          <textarea class="input-field" id="base64-input" rows="12" placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..." style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.75rem;"></textarea>
        </div>
        <div class="tool-grid-2" style="margin-top: var(--space-4);">
          <button class="btn btn--primary" id="btn-render">⚡ Render Image</button>
          <button class="btn btn--secondary" id="btn-clear">Clear</button>
        </div>
      </div>
      <div id="error-msg" style="display: none; padding: var(--space-4); background: #fee2e2; color: #991b1b; border-radius: var(--radius-lg); font-size: var(--fs-sm); border: 1px solid #fecaca;">
        <strong>Invalid Format:</strong> Please make sure it starts with 'data:image/...'.
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Decoded Preview</h3>
        <a id="btn-download" class="btn btn--secondary btn--sm" style="display: none;">💾 Download</a>
      </div>
      
      <div id="preview-group" style="display: none;">
        <div class="preview-area" style="min-height: 400px; padding: var(--space-4);">
          <img id="img-preview" style="max-width: 95%; max-height: 380px; border-radius: var(--radius-lg); box-shadow: var(--shadow-2xl);" />
        </div>
      </div>

      <div id="preview-placeholder" style="height: 100%; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--color-text-muted); padding: var(--space-12); text-align: center; border: 1px dashed var(--color-border); border-radius: var(--radius-2xl);">
        <span style="font-size: 3rem; margin-bottom: var(--space-4); opacity: 0.5;">🖼️</span>
        <p>The decoded image will appear here after you paste a valid Base64 string and click Render.</p>
      </div>
    </div>
  `;

  const input = document.getElementById('base64-input') as HTMLTextAreaElement;
  const renderBtn = document.getElementById('btn-render') as HTMLButtonElement;
  const clearBtn = document.getElementById('btn-clear') as HTMLButtonElement;
  const previewGroup = document.getElementById('preview-group')!;
  const previewImg = document.getElementById('img-preview') as HTMLImageElement;
  const downloadBtn = document.getElementById('btn-download') as HTMLAnchorElement;
  const errorMsg = document.getElementById('error-msg')!;

  renderBtn.addEventListener('click', () => {
    errorMsg.style.display = 'none';
    previewGroup.style.display = 'none';

    const val = input.value.trim();
    if (!val) return;

    // Basic validation: Check if it looks like a data URI
    let src = val;
    if (!val.startsWith('data:image/')) {
      // Try to prepend if the user just pasted the raw base64 string
      // Defaulting to PNG
      src = 'data:image/png;base64,' + val;
    }

    previewImg.onerror = () => {
      errorMsg.style.display = 'block';
      previewGroup.style.display = 'none';
    };

    previewImg.onload = () => {
      errorMsg.style.display = 'none';
      previewGroup.style.display = 'block';
      downloadBtn.style.display = 'inline-flex';
      document.getElementById('preview-placeholder')!.style.display = 'none';

      downloadBtn.href = src;

      // Extract extension if possible
      const match = src.match(/data:image\/([a-zA-Z0-9]+);/);
      const ext = match ? match[1] : 'png';
      downloadBtn.download = `image-decoded.${ext}`;
    };

    previewImg.src = src;
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    previewGroup.style.display = 'none';
    downloadBtn.style.display = 'none';
    document.getElementById('preview-placeholder')!.style.display = 'flex';
    errorMsg.style.display = 'none';
  });
}
