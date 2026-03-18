import QRCode from 'qrcode';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <style>
      .qr-tabs {
        display: flex;
        gap: var(--space-1);
        padding: var(--space-1);
        background: var(--color-surface-hover);
        border-radius: var(--radius-lg);
        margin-bottom: var(--space-6);
        overflow-x: auto;
        scrollbar-width: none;
      }
      .qr-tabs::-webkit-scrollbar { display: none; }
      .qr-tab {
        display: flex;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-2) var(--space-4);
        border-radius: var(--radius-md);
        color: var(--color-text-secondary);
        cursor: pointer;
        transition: all var(--transition-normal);
        white-space: nowrap;
        border: 1px solid transparent;
        font-size: var(--fs-xs);
        font-weight: 600;
      }
      .qr-tab:hover { background: var(--color-surface); }
      .qr-tab.active { 
        background: var(--color-surface); 
        color: var(--color-primary); 
        border-color: var(--color-primary-border);
        box-shadow: var(--shadow-sm);
      }
      .qr-tab__icon { font-size: 1rem; }
      .qr-form { display: none; }
      .qr-form.active { display: flex; flex-direction: column; gap: var(--space-4); }
      
      .preview-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--space-10);
        background: var(--color-surface-hover);
        border-radius: var(--radius-xl);
        border: 2px dashed var(--color-border);
        margin-top: var(--space-2);
        min-height: 400px;
        transition: border-color 0.3s ease;
      }
      .preview-container:has(canvas:not([style*="display: none"])) {
        border-style: solid;
        border-color: var(--color-primary-border);
      }
      
      #qr-canvas {
        background: white;
        padding: var(--space-4);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        max-width: 100%;
        height: auto;
      }
      
      .qr-actions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: var(--space-3);
        margin-top: var(--space-6);
      }
    </style>
    
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Source Type</h4>
        <div class="qr-tabs" id="qr-tabs">
          <div class="qr-tab active" data-type="website"><span class="qr-tab__icon">🌐</span> <span class="qr-tab__label">Website</span></div>
          <div class="qr-tab" data-type="vcard"><span class="qr-tab__icon">📇</span> <span class="qr-tab__label">vCard</span></div>
          <div class="qr-tab" data-type="text"><span class="qr-tab__icon">📝</span> <span class="qr-tab__label">Text</span></div>
          <div class="qr-tab" data-type="wifi"><span class="qr-tab__icon">📶</span> <span class="qr-tab__label">WiFi</span></div>
        </div>

        <div id="qr-forms">
          <!-- Website -->
          <div class="qr-form active" id="form-website">
            <div class="input-group">
              <label for="input-website">Website URL</label>
              <input type="url" id="input-website" class="input-field" placeholder="https://example.com" value="https://toolsrepository.com" style="padding: var(--space-3);">
            </div>
          </div>

          <!-- vCard -->
          <div class="qr-form" id="form-vcard">
            <div class="tool-grid-2">
              <div class="input-group">
                <label for="input-vcard-name">Full Name</label>
                <input type="text" id="input-vcard-name" class="input-field" placeholder="John Doe" style="padding: var(--space-3);">
              </div>
              <div class="input-group">
                <label for="input-vcard-phone">Phone Number</label>
                <input type="tel" id="input-vcard-phone" class="input-field" placeholder="+1234567890" style="padding: var(--space-3);">
              </div>
            </div>
          </div>

          <!-- Text -->
          <div class="qr-form" id="form-text">
            <div class="input-group">
              <label for="input-text">Text content</label>
              <textarea id="input-text" class="input-field" rows="4" placeholder="Enter any text here..." style="padding: var(--space-3);"></textarea>
            </div>
          </div>

          <!-- WiFi -->
          <div class="qr-form" id="form-wifi">
            <div class="tool-grid-2">
              <div class="input-group">
                <label for="input-wifi-ssid">SSID</label>
                <input type="text" id="input-wifi-ssid" class="input-field" placeholder="Network Name" style="padding: var(--space-3);">
              </div>
              <div class="input-group">
                <label for="input-wifi-pass">Password</label>
                <input type="password" id="input-wifi-pass" class="input-field" placeholder="WiFi Password" style="padding: var(--space-3);">
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="p-card" style="margin-top: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Styling Options</h4>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);">
          <div class="input-group">
            <label for="qr-size">Size (px)</label>
            <input type="number" class="input-field" id="qr-size" value="300" min="100" max="1000" step="50" style="padding: var(--space-3);" />
          </div>
          <div class="input-group">
            <label for="qr-color">Fill Color</label>
            <input type="color" id="qr-color" value="#1e293b" style="width: 100%; height: 44px; border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 2px; background: var(--color-surface); cursor: pointer;" />
          </div>
        </div>
        <button class="btn btn--primary btn--block btn--lg" id="btn-generate" style="margin-top: var(--space-6);">✨ Generate QR Code</button>
      </div>
    </div>

    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-2);">
        <h3 style="font-size: var(--fs-base);">Interactive Preview</h3>
      </div>
      <div class="preview-container">
        <canvas id="qr-canvas" style="display: none;"></canvas>
        <div id="qr-placeholder" style="color: var(--color-text-muted); text-align: center; font-size: var(--fs-sm); max-width: 200px;">
          <div style="font-size: 3rem; margin-bottom: var(--space-4); opacity: 0.2;">📱</div>
          Your generated QR code will appear here.
        </div>
      </div>

      <div class="qr-actions">
        <button class="btn btn--secondary btn--block" id="btn-download">💾 Download PNG</button>
        <button class="btn btn--secondary btn--block" id="btn-copy">🔗 Copy Result</button>
      </div>
    </div>
  `;

  const tabs = container.querySelectorAll('.qr-tab');
  const forms = container.querySelectorAll('.qr-form');
  const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;
  const placeholder = document.getElementById('qr-placeholder')!;
  const generateBtn = document.getElementById('btn-generate')!;

  let activeType = 'website';

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      forms.forEach(f => f.classList.remove('active'));
      
      tab.classList.add('active');
      const type = (tab as HTMLElement).dataset.type!;
      activeType = type;
      document.getElementById(`form-${type}`)!.classList.add('active');
      // Clear canvas when switching tabs? Or just wait for generate?
      // Let's keep the old one until new generation
    });
  });

  // Trigger generation on button click
  generateBtn.addEventListener('click', () => generateQR());

  // Also auto-generate on load and maybe on change for better UX, but let's prioritize the button
  container.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('change', () => generateQR());
  });

  document.getElementById('btn-download')!.addEventListener('click', () => {
    if (placeholder.style.display !== 'none') {
        alert('Please generate a QR code first');
        return;
    }
    const link = document.createElement('a');
    link.download = `qrcode-${activeType}.png`;
    link.href = canvas.toDataURL();
    link.click();
  });

  document.getElementById('btn-copy')!.addEventListener('click', () => {
    const text = getQRText();
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('btn-copy')!;
      const original = btn.innerHTML;
      btn.innerHTML = '✅ Copied!';
      setTimeout(() => btn.innerHTML = original, 2000);
    });
  });

  function escapeWiFiValue(value: string): string {
    return value.replace(/([\\;:,"])/g, '\\$1');
  }

  function getQRText(): string {
    switch (activeType) {
      case 'website':
        return (document.getElementById('input-website') as HTMLInputElement).value.trim() || 'https://toolrepository.com';
      case 'vcard':
        const name = (document.getElementById('input-vcard-name') as HTMLInputElement).value.trim();
        const phone = (document.getElementById('input-vcard-phone') as HTMLInputElement).value.trim();
        const email = (document.getElementById('input-vcard-email') as HTMLInputElement).value.trim();
        const org = (document.getElementById('input-vcard-org') as HTMLInputElement).value.trim();
        if (!name && !phone && !email) return '';
        return `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nFN:${name}\nORG:${org}\nTEL;TYPE=CELL:${phone}\nEMAIL:${email}\nEND:VCARD`;
      case 'text':
        return (document.getElementById('input-text') as HTMLTextAreaElement).value.trim();
      case 'wifi':
        const ssid = (document.getElementById('input-wifi-ssid') as HTMLInputElement).value.trim();
        const pass = (document.getElementById('input-wifi-pass') as HTMLInputElement).value.trim();
        const enc = (document.getElementById('input-wifi-encryption') as HTMLSelectElement).value;
        const hidden = (document.getElementById('input-wifi-hidden') as HTMLInputElement).checked;
        if (!ssid) return '';

        let wifiStr = `WIFI:S:${escapeWiFiValue(ssid)};T:${enc};`;
        if (enc !== 'nopass') {
          wifiStr += `P:${escapeWiFiValue(pass)};`;
        }
        if (hidden) {
          wifiStr += `H:true;`;
        }
        return wifiStr + ';';
      case 'pdf':
        return (document.getElementById('input-pdf') as HTMLInputElement).value.trim();
      case 'app':
        return (document.getElementById('input-app') as HTMLInputElement).value.trim();
      default:
        return '';
    }
  }

  async function generateQR() {
    const text = getQRText();
    if (!text) {
        alert('Please enter some data to generate a QR code');
        return;
    }

    const size = parseInt((document.getElementById('qr-size') as HTMLInputElement).value) || 300;
    const color = (document.getElementById('qr-color') as HTMLInputElement).value || '#000000';

    try {
      placeholder.style.display = 'none';
      canvas.style.display = 'block';
      await QRCode.toCanvas(canvas, text, {
        width: size,
        margin: 2,
        color: {
          dark: color,
          light: '#ffffff'
        }
      });
    } catch (err) {
      console.error(err);
      placeholder.style.display = 'block';
      canvas.style.display = 'none';
      placeholder.innerHTML = '<span style="color:var(--color-error)">Failed to generate QR code</span>';
    }
  }

  // Initial generation for the default website
  generateQR();
}
