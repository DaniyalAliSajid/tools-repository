export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="img-input">Select an Image</label>
        <input type="file" id="img-input" class="input-field" accept="image/*" />
      </div>

      <div class="tool-grid-2" style="margin-top: var(--space-4);">
        <div class="input-group">
            <label for="width-input">New Width (px)</label>
            <input type="number" id="width-input" class="input-field" min="1" disabled />
        </div>
        <div class="input-group">
            <label for="height-input">New Height (px)</label>
            <input type="number" id="height-input" class="input-field" min="1" disabled />
        </div>
      </div>
      
      <div class="input-group" style="margin-top: var(--space-2);">
          <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-weight: normal;">
              <input type="checkbox" id="aspect-lock" checked disabled />
              Lock Aspect Ratio
          </label>
      </div>

      <div class="input-group" style="margin-top: var(--space-4);">
          <button class="btn btn--primary" id="btn-resize" style="width: 100%;" disabled>Resize Image</button>
      </div>

      <div class="input-group" id="preview-group" style="display: none; text-align: center; margin-top: var(--space-6);">
        <label>Resized Image Preview</label>
        <div style="margin-top: var(--space-2); margin-bottom: var(--space-4);">
          <img id="img-preview" style="max-width: 100%; max-height: 400px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm);" />
        </div>
        <a id="btn-download" class="btn btn--secondary" style="text-decoration: none; display: inline-block;">Download Resized Image</a>
      </div>
    </div>
  `;

    const input = document.getElementById('img-input') as HTMLInputElement;
    const widthInput = document.getElementById('width-input') as HTMLInputElement;
    const heightInput = document.getElementById('height-input') as HTMLInputElement;
    const aspectLock = document.getElementById('aspect-lock') as HTMLInputElement;
    const resizeBtn = document.getElementById('btn-resize') as HTMLButtonElement;

    const previewGroup = document.getElementById('preview-group')!;
    const previewImg = document.getElementById('img-preview') as HTMLImageElement;
    const downloadBtn = document.getElementById('btn-download') as HTMLAnchorElement;

    let selectedFile: File | null = null;
    let selectedImage: HTMLImageElement | null = null;
    let originalRatio = 1;

    function disableInputs() {
        widthInput.disabled = true;
        heightInput.disabled = true;
        aspectLock.disabled = true;
        resizeBtn.disabled = true;
        selectedFile = null;
        selectedImage = null;
    }

    function enableInputs() {
        widthInput.disabled = false;
        heightInput.disabled = false;
        aspectLock.disabled = false;
        resizeBtn.disabled = false;
    }

    // Handle File Upload
    input.addEventListener('change', (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) {
            disableInputs();
            return;
        }

        selectedFile = file;

        const reader = new FileReader();
        reader.onload = (event) => {
            const tempImg = new Image();
            tempImg.onload = () => {
                selectedImage = tempImg;

                // Initialize Dimension Values
                originalRatio = tempImg.width / tempImg.height;
                widthInput.value = tempImg.width.toString();
                heightInput.value = tempImg.height.toString();

                enableInputs();
            };
            tempImg.src = event.target?.result as string;
        };
        reader.readAsDataURL(file);

        previewGroup.style.display = 'none';
        disableInputs();
    });

    // Handle Dimension Changing
    widthInput.addEventListener('input', () => {
        if (!selectedImage) return;
        if (aspectLock.checked && widthInput.value) {
            heightInput.value = Math.round(parseInt(widthInput.value) / originalRatio).toString();
        }
    });

    heightInput.addEventListener('input', () => {
        if (!selectedImage) return;
        if (aspectLock.checked && heightInput.value) {
            widthInput.value = Math.round(parseInt(heightInput.value) * originalRatio).toString();
        }
    });

    // Handle Resize
    resizeBtn.addEventListener('click', () => {
        if (!selectedImage || !selectedFile) return;

        const w = parseInt(widthInput.value) || selectedImage.width;
        const h = parseInt(heightInput.value) || selectedImage.height;

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d')!;

        // Handle possible transparency for PNG and Webp
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(selectedImage, 0, 0, w, h);

        const format = selectedFile.type || 'image/png';
        const dataUrl = canvas.toDataURL(format);

        previewImg.src = dataUrl;
        previewGroup.style.display = 'block';

        const fileName = selectedFile.name || 'image.png';
        const lastDot = fileName.lastIndexOf('.');
        const baseName = lastDot > 0 ? fileName.substring(0, lastDot) : fileName;
        const ext = lastDot > 0 ? fileName.substring(lastDot + 1) : 'png';
        downloadBtn.download = `${baseName}-${w}x${h}.${ext}`;
    });
}
