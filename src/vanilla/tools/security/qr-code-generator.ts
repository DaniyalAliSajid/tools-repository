import QRCode from 'qrcode';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <style>
      .qr-tabs {
        display: flex;
        overflow-x: auto;
        gap: var(--space-2);
        padding-bottom: var(--space-4);
        border-bottom: 2px solid var(--color-border);
        margin-bottom: var(--space-8);
        scrollbar-width: none;
        -ms-overflow-style: none;
      }
      .qr-tabs::-webkit-scrollbar { display: none; }
      .qr-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-4) var(--space-6);
        border-radius: var(--radius-xl);
        background: var(--color-surface-alt);
        color: var(--color-text-secondary);
        cursor: pointer;
        transition: all var(--transition-normal);
        min-width: 140px;
        border: 2px solid transparent;
        flex-shrink: 0;
      }
      .qr-tab:hover { 
        background: var(--color-surface-hover); 
        color: var(--color-primary);
        transform: translateY(-2px);
      }
      .qr-tab.active { 
        background: var(--color-primary-light); 
        color: var(--color-primary); 
        border-color: var(--color-primary);
        box-shadow: var(--shadow-md);
      }
      .qr-tab__icon { font-size: 2rem; }
      .qr-tab__label { font-size: var(--fs-xs); font-weight: var(--fw-bold); text-transform: uppercase; white-space: nowrap; }
      .qr-form { display: none; }
      .qr-form.active { display: flex; flex-direction: column; gap: var(--space-6); animation: fadeIn 0.3s ease-out; }
      
      .preview-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: var(--space-8);
        background: var(--color-surface-alt);
        border-radius: var(--radius-2xl);
        border: 2px dashed var(--color-border);
        margin: var(--space-8) 0;
        min-height: 400px;
        position: relative;
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
        gap: var(--space-4);
        width: 100%;
        max-width: 500px;
      }
      
      .input-group label {
        margin-bottom: var(--space-1);
        display: block;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
    </style>
    
    <div class="qr-tabs" id="qr-tabs">
      <div class="qr-tab active" data-type="website">
        <span class="qr-tab__icon">🌐</span>
        <span class="qr-tab__label">Website</span>
      </div>
      <div class="qr-tab" data-type="vcard">
        <span class="qr-tab__icon">📇</span>
        <span class="qr-tab__label">vCard</span>
      </div>
      <div class="qr-tab" data-type="text">
        <span class="qr-tab__icon">📝</span>
        <span class="qr-tab__label">Text</span>
      </div>
      <div class="qr-tab" data-type="wifi">
        <span class="qr-tab__icon">📶</span>
        <span class="qr-tab__label">WiFi</span>
      </div>
      <div class="qr-tab" data-type="pdf">
        <span class="qr-tab__icon">📄</span>
        <span class="qr-tab__label">PDF</span>
      </div>
      <div class="qr-tab" data-type="app">
        <span class="qr-tab__icon">📱</span>
        <span class="qr-tab__label">App Store</span>
      </div>
    </div>

    <div id="qr-forms">
      <!-- Website -->
      <div class="qr-form active" id="form-website">
        <div class="input-group">
          <label for="input-website">Website URL</label>
          <input type="url" id="input-website" class="input-field" placeholder="https://example.com" value="https://toolrepository.com">
        </div>
      </div>

      <!-- vCard -->
      <div class="qr-form" id="form-vcard">
        <div class="tool-grid-2">
          <div class="input-group">
            <label for="input-vcard-name">Full Name</label>
            <input type="text" id="input-vcard-name" class="input-field" placeholder="John Doe">
          </div>
          <div class="input-group">
            <label for="input-vcard-phone">Phone Number</label>
            <input type="tel" id="input-vcard-phone" class="input-field" placeholder="+1234567890">
          </div>
        </div>
        <div class="tool-grid-2">
          <div class="input-group">
            <label for="input-vcard-email">Email Address</label>
            <input type="email" id="input-vcard-email" class="input-field" placeholder="john@example.com">
          </div>
           <div class="input-group">
            <label for="input-vcard-org">Organization</label>
            <input type="text" id="input-vcard-org" class="input-field" placeholder="Company Name">
          </div>
        </div>
      </div>

      <!-- Text -->
      <div class="qr-form" id="form-text">
        <div class="input-group">
          <label for="input-text">Text content</label>
          <textarea id="input-text" class="input-field" placeholder="Enter any text here..."></textarea>
        </div>
      </div>

      <!-- WiFi -->
      <div class="qr-form" id="form-wifi">
        <div class="tool-grid-2">
          <div class="input-group">
            <label for="input-wifi-ssid">Network Name (SSID)</label>
            <input type="text" id="input-wifi-ssid" class="input-field" placeholder="My WiFi Network">
          </div>
          <div class="input-group">
            <label for="input-wifi-encryption">Encryption</label>
            <select id="input-wifi-encryption" class="input-field">
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None (Open)</option>
            </select>
          </div>
        </div>
        <div class="tool-grid-2">
          <div class="input-group">
            <label for="input-wifi-pass">Password</label>
            <input type="password" id="input-wifi-pass" class="input-field" placeholder="password123">
          </div>
          <div class="input-group" style="flex-direction: row; align-items: center; gap: var(--space-2); margin-top: auto; height: 50px;">
            <input type="checkbox" id="input-wifi-hidden" style="width: 20px; height: 20px;">
            <label for="input-wifi-hidden" style="margin-bottom: 0; cursor: pointer;">Hidden Network</label>
          </div>
        </div>
      </div>

       <!-- PDF -->
      <div class="qr-form" id="form-pdf">
        <div class="input-group">
          <label for="input-pdf">PDF URL</label>
          <input type="url" id="input-pdf" class="input-field" placeholder="https://example.com/document.pdf">
          <p style="font-size: var(--fs-xs); color: var(--color-text-muted); margin-top: var(--space-2);">Note: Host your PDF online and paste the link here.</p>
        </div>
      </div>

      <!-- App Store -->
      <div class="qr-form" id="form-app">
        <div class="input-group">
          <label for="input-app">App Store / Play Store URL</label>
          <input type="url" id="input-app" class="input-field" placeholder="https://apps.apple.com/app/id123456">
        </div>
      </div>
    </div>

    <div class="section-gap" style="margin-top: var(--space-8);">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="qr-size">Size (px)</label>
          <input type="number" class="input-field" id="qr-size" value="300" min="100" max="1000" step="50" />
        </div>
        <div class="input-group">
          <label for="qr-color">Color</label>
          <input type="color" class="input-field" id="qr-color" value="#000000" style="padding:var(--space-1);height:44px;" />
        </div>
      </div>
      
      <button class="btn btn--primary btn--block" id="btn-generate" style="margin-top: var(--space-4); font-size: var(--fs-lg); padding: var(--space-4);">✨ Generate QR Code</button>

      <div class="preview-container">
        <canvas id="qr-canvas"></canvas>
        <div id="qr-placeholder" style="color: var(--color-text-muted); text-align: center;">Your QR code will appear here</div>
      </div>

      <div class="qr-actions" style="margin: 0 auto;">
        <button class="btn btn--secondary" id="btn-download">⬇️ Download</button>
        <button class="btn btn--secondary" id="btn-copy">📋 Copy Text</button>
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
