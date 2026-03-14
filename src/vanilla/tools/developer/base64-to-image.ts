export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="base64-input">Paste Base64 String</label>
        <textarea class="input-field" id="base64-input" rows="8" placeholder="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."></textarea>
      </div>

      <div class="tool-grid-2" style="margin-top: var(--space-4);">
        <button class="btn btn--primary" id="btn-render">Render Image</button>
        <button class="btn btn--secondary" id="btn-clear">Clear</button>
      </div>

      <div class="input-group" id="preview-group" style="display: none; text-align: center; margin-top: var(--space-6);">
        <label>Image Preview</label>
        <div style="margin-top: var(--space-2); margin-bottom: var(--space-4);">
          <img id="img-preview" style="max-width: 100%; max-height: 400px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);" />
        </div>
        <a id="btn-download" class="btn btn--primary" download="downloaded-image.png" style="text-decoration: none; display: inline-block;">Download Image</a>
      </div>
      
      <div id="error-msg" style="display: none; color: #e11d48; margin-top: var(--space-4); text-align: center; font-weight: 500;">
        Invalid Base64 string. Please make sure it starts with 'data:image/...'.
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
    errorMsg.style.display = 'none';
  });
}
