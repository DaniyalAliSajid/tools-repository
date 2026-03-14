export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="section-gap">
          <div class="input-group">
            <label for="sm-base">Base URL</label>
            <input type="text" id="sm-base" class="input-field" value="https://example.com">
          </div>
          <div class="input-group">
            <label for="sm-urls">URLs (one per line)</label>
            <textarea id="sm-urls" class="input-field" rows="10" placeholder="/\n/about\n/contact\n/tools/text-diff-checker"></textarea>
          </div>
        </div>

        <div class="section-gap">
          <div class="input-group">
            <label>Sitemap XML</label>
            <div class="result-box" id="sm-code" style="font-family: monospace; white-space: pre-wrap; background: white; height: 320px; overflow: auto;"></div>
            <button class="btn btn--secondary btn--sm result-box__copy" id="sm-copy">Copy XML</button>
          </div>
        </div>
      </div>
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
