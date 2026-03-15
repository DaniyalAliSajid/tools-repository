import QRCode from 'qrcode';

export function render(container: HTMLElement): void {
  container.innerHTML = `
    <style>
      .qr-tabs {
        display: flex;
        overflow-x: auto;
        gap: var(--space-2);
        padding-bottom: var(--space-4);
        border-bottom: 1px solid var(--color-border);
        margin-bottom: var(--space-6);
        scrollbar-width: none;
      }
      .qr-tabs::-webkit-scrollbar { display: none; }
      .qr-tab {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--space-2);
        padding: var(--space-3) var(--space-4);
        border-radius: var(--radius-lg);
        background: var(--color-surface-alt);
        color: var(--color-text-secondary);
        cursor: pointer;
        transition: all var(--transition-fast);
        min-width: 120px;
        border: 1px solid transparent;
        flex-shrink: 0;
      }
      .qr-tab:hover { background: var(--color-surface-hover); color: var(--color-primary); }
      .qr-tab.active { background: var(--color-primary-light); color: var(--color-primary); border-color: var(--color-primary); }
      .qr-tab__icon { font-size: 1.5rem; }
      .qr-tab__label { font-size: var(--fs-xs); font-weight: var(--fw-bold); text-transform: uppercase; white-space: nowrap; }
      .qr-form { display: none; }
      .qr-form.active { display: flex; flex-direction: column; gap: var(--space-4); }
    </style>
    <div class="qr-tabs" id="qr-tabs">
      <div class="qr-tab active" data-type="website">
        <span class="qr-tab__icon">🌐</span>
        <span class="qr-tab__label">Website</span>
      </div>
      <div class="qr-tab" data-type="vcard">
        <span class="qr-tab__icon">📇</span>
        <span class="qr-tab__label">Digital Business Card</span>
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
        <div class="input-group">
          <label for="input-wifi-ssid">Network Name (SSID)</label>
          <input type="text" id="input-wifi-ssid" class="input-field" placeholder="My WiFi Network">
        </div>
        <div class="tool-grid-2">
          <div class="input-group">
            <label for="input-wifi-pass">Password</label>
            <input type="password" id="input-wifi-pass" class="input-field" placeholder="password123">
          </div>
          <div class="input-group">
            <label for="input-wifi-encryption">Encryption</label>
            <select id="input-wifi-encryption" class="input-field">
              <option value="WPA">WPA/WPA2</option>
              <option value="WEP">WEP</option>
              <option value="nopass">None</option>
            </select>
          </div>
        </div>
      </div>

       <!-- PDF -->
      <div class="qr-form" id="form-pdf">
        <div class="input-group">
          <label for="input-pdf">PDF URL</label>
          <input type="url" id="input-pdf" class="input-field" placeholder="https://example.com/document.pdf">
          <p class="tool-page__description" style="font-size: var(--fs-xs); margin-top: var(--space-2);">Note: Host your PDF online and paste the link here.</p>
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
      
      <div style="text-align:center;padding:var(--space-6); background: var(--color-surface-alt); border-radius: var(--radius-xl); border: 1px solid var(--color-border);">
        <canvas id="qr-canvas" style="border:1px solid var(--color-border);border-radius:var(--radius-lg);max-width:100%; box-shadow: var(--shadow-md);"></canvas>
      </div>

      <div class="tool-grid-2">
        <button class="btn btn--primary" id="btn-download">⬇️ Download PNG</button>
        <button class="btn btn--secondary" id="btn-copy">📋 Copy Link to Clipboard</button>
      </div>
    </div>
  `;

  const tabs = container.querySelectorAll('.qr-tab');
  const forms = container.querySelectorAll('.qr-form');
  const canvas = document.getElementById('qr-canvas') as HTMLCanvasElement;

  let activeType = 'website';

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      forms.forEach(f => f.classList.remove('active'));
      
      tab.classList.add('active');
      const type = (tab as HTMLElement).dataset.type!;
      activeType = type;
      document.getElementById(`form-${type}`)!.classList.add('active');
      generateQR();
    });
  });

  // Listen for all inputs to auto-generate
  container.querySelectorAll('input, select, textarea').forEach(el => {
    el.addEventListener('input', () => generateQR());
  });

  document.getElementById('btn-download')!.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = `qrcode-${activeType}.png`;
    link.href = canvas.toDataURL();
    link.click();
  });

  document.getElementById('btn-copy')!.addEventListener('click', () => {
    const text = getQRText();
    navigator.clipboard.writeText(text).then(() => {
      const btn = document.getElementById('btn-copy')!;
      const original = btn.innerHTML;
      btn.innerHTML = '✅ Copied!';
      setTimeout(() => btn.innerHTML = original, 2000);
    });
  });

  function getQRText(): string {
    switch (activeType) {
      case 'website':
        return (document.getElementById('input-website') as HTMLInputElement).value || 'https://toolrepository.com';
      case 'vcard':
        const name = (document.getElementById('input-vcard-name') as HTMLInputElement).value;
        const phone = (document.getElementById('input-vcard-phone') as HTMLInputElement).value;
        const email = (document.getElementById('input-vcard-email') as HTMLInputElement).value;
        const org = (document.getElementById('input-vcard-org') as HTMLInputElement).value;
        return `BEGIN:VCARD\nVERSION:3.0\nN:${name}\nFN:${name}\nORG:${org}\nTEL;TYPE=CELL:${phone}\nEMAIL:${email}\nEND:VCARD`;
      case 'text':
        return (document.getElementById('input-text') as HTMLTextAreaElement).value || 'Hello';
      case 'wifi':
        const ssid = (document.getElementById('input-wifi-ssid') as HTMLInputElement).value;
        const pass = (document.getElementById('input-wifi-pass') as HTMLInputElement).value;
        const enc = (document.getElementById('input-wifi-encryption') as HTMLSelectElement).value;
        return `WIFI:S:${ssid};T:${enc};P:${pass};;`;
      case 'pdf':
        return (document.getElementById('input-pdf') as HTMLInputElement).value || '';
      case 'app':
        return (document.getElementById('input-app') as HTMLInputElement).value || '';
      default:
        return '';
    }
  }

  async function generateQR() {
    const text = getQRText();
    if (!text) return;

    const size = parseInt((document.getElementById('qr-size') as HTMLInputElement).value) || 300;
    const color = (document.getElementById('qr-color') as HTMLInputElement).value || '#000000';

    try {
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
    }
  }

  generateQR();
}
