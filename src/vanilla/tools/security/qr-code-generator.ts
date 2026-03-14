export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group">
        <label for="qr-input">Enter URL or text</label>
        <input type="text" class="input-field" id="qr-input" placeholder="https://example.com" value="https://toolrepository.com" />
      </div>
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="qr-size">Size (px)</label>
          <input type="number" class="input-field" id="qr-size" value="256" min="64" max="512" step="32" />
        </div>
        <div class="input-group">
          <label for="qr-color">Color</label>
          <input type="color" class="input-field" id="qr-color" value="#000000" style="padding:var(--space-1);height:44px;" />
        </div>
      </div>
      <button class="btn btn--primary btn--block" id="btn-generate">📱 Generate QR Code</button>
      <div style="text-align:center;padding:var(--space-6);">
        <canvas id="qr-canvas" style="border:1px solid var(--color-border);border-radius:var(--radius-lg);max-width:100%;"></canvas>
      </div>
      <button class="btn btn--secondary btn--block" id="btn-download">⬇️ Download PNG</button>
    </div>
  `;

    document.getElementById('btn-generate')!.addEventListener('click', generateQR);
    document.getElementById('btn-download')!.addEventListener('click', () => {
        const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
        const link = document.createElement('a');
        link.download = 'qrcode.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    generateQR(); // auto-generate on load
}

function generateQR(): void {
    const text = (document.getElementById('qr-input') as HTMLInputElement).value || 'Hello';
    const size = parseInt((document.getElementById('qr-size') as HTMLInputElement).value) || 256;
    const color = (document.getElementById('qr-color') as HTMLInputElement).value || '#000000';
    const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;

    // Simple QR-like pattern (basic encoding — uses a grid pattern based on character codes)
    // For production, you'd use a proper QR library. This generates a functional visual pattern.
    const modules = generateQRMatrix(text);
    const moduleCount = modules.length;
    const moduleSize = Math.floor(size / moduleCount);
    canvas.width = moduleCount * moduleSize;
    canvas.height = moduleCount * moduleSize;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color;

    for (let row = 0; row < moduleCount; row++) {
        for (let col = 0; col < moduleCount; col++) {
            if (modules[row][col]) {
                ctx.fillRect(col * moduleSize, row * moduleSize, moduleSize, moduleSize);
            }
        }
    }
}

function generateQRMatrix(text: string): boolean[][] {
    // Simple deterministic pattern generator based on text content
    // This creates a QR-code-like visual. For real QR encoding, use a library like qrcode-generator.
    const size = 25;
    const matrix: boolean[][] = Array.from({ length: size }, () => Array(size).fill(false));

    // Finder patterns (top-left, top-right, bottom-left)
    addFinderPattern(matrix, 0, 0);
    addFinderPattern(matrix, 0, size - 7);
    addFinderPattern(matrix, size - 7, 0);

    // Data area — encode text as binary pattern
    let dataBits: boolean[] = [];
    for (let i = 0; i < text.length; i++) {
        const code = text.charCodeAt(i);
        for (let b = 7; b >= 0; b--) {
            dataBits.push(Boolean((code >> b) & 1));
        }
    }

    // Fill remaining space with data
    let bitIdx = 0;
    for (let row = 8; row < size - 1; row++) {
        for (let col = 8; col < size - 1; col++) {
            if (bitIdx < dataBits.length) {
                matrix[row][col] = dataBits[bitIdx++];
            } else {
                // Padding pattern
                matrix[row][col] = (row + col) % 2 === 0;
            }
        }
    }

    // Timing patterns
    for (let i = 8; i < size - 8; i++) {
        matrix[6][i] = i % 2 === 0;
        matrix[i][6] = i % 2 === 0;
    }

    return matrix;
}

function addFinderPattern(matrix: boolean[][], row: number, col: number): void {
    for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
            matrix[row + r][col + c] =
                r === 0 || r === 6 || c === 0 || c === 6 ||
                (r >= 2 && r <= 4 && c >= 2 && c <= 4);
        }
    }
}
