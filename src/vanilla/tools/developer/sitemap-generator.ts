export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Domain Settings</h4>
        <div class="input-group">
          <label for="sm-base">Base URL</label>
          <input type="text" id="sm-base" class="input-field" value="https://example.com">
        </div>
      </div>
      
      <div class="input-group">
        <label for="sm-urls">URLs List (One per line)</label>
        <textarea id="sm-urls" class="input-field" rows="18" placeholder="/\n/about\n/contact\n/tools/text-diff-checker" style="resize: vertical;"></textarea>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Generated Sitemap.xml</h3>
        <button class="btn btn--secondary btn--sm" id="sm-copy">📋 Copy XML</button>
      </div>
      <div class="result-box" id="sm-code" style="padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: var(--fs-sm); line-height: 1.5; height: calc(100% - 48px); min-height: 480px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap;"></div>
    </div>
  `;

    const baseIn = document.getElementById('sm-base') as HTMLInputElement;
    const urlsIn = document.getElementById('sm-urls') as HTMLTextAreaElement;
    const codeRes = document.getElementById('sm-code')!;
    const copyBtn = document.getElementById('sm-copy')!;

    const update = () => {
        const base = baseIn.value.endsWith('/') ? baseIn.value.slice(0, -1) : baseIn.value;
        const urls = urlsIn.value.split('\n').map(l => l.trim()).filter(l => l);
        const date = new Date().toISOString().split('T')[0];

        let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

        urls.forEach(url => {
            const path = url.startsWith('/') ? url : `/${url}`;
            xml += `  <url>\n    <loc>${base}${path}</loc>\n    <lastmod>${date}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;
        });

        xml += `</urlset>`;
        codeRes.textContent = xml;
    };

    [baseIn, urlsIn].forEach(inp => inp.addEventListener('input', update));

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeRes.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });

    update();
}
