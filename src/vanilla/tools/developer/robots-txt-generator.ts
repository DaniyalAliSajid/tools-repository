export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="section-gap">
          <div class="input-group">
            <label for="rob-agent">User-agent</label>
            <input type="text" id="rob-agent" class="input-field" value="*">
          </div>
          <div class="input-group">
            <label for="rob-allow">Allow Paths (one per line)</label>
            <textarea id="rob-allow" class="input-field" rows="3" placeholder="/\n/public/"></textarea>
          </div>
          <div class="input-group">
            <label for="rob-disallow">Disallow Paths (one per line)</label>
            <textarea id="rob-disallow" class="input-field" rows="3" placeholder="/admin/\n/tmp/"></textarea>
          </div>
          <div class="input-group">
            <label for="rob-sitemap">Sitemap URL (optional)</label>
            <input type="text" id="rob-sitemap" class="input-field" placeholder="https://example.com/sitemap.xml">
          </div>
        </div>

        <div class="section-gap">
          <div class="input-group">
            <label>Generated robots.txt</label>
            <div class="result-box" id="rob-code" style="font-family: monospace; white-space: pre-wrap; background: white; height: 300px; overflow: auto;"></div>
            <button class="btn btn--secondary btn--sm result-box__copy" id="rob-copy">Copy Content</button>
          </div>
        </div>
      </div>
    </div>
  `;

    const agentIn = document.getElementById('rob-agent') as HTMLInputElement;
    const allowIn = document.getElementById('rob-allow') as HTMLTextAreaElement;
    const disallowIn = document.getElementById('rob-disallow') as HTMLTextAreaElement;
    const sitemapIn = document.getElementById('rob-sitemap') as HTMLInputElement;

    const codeRes = document.getElementById('rob-code')!;
    const copyBtn = document.getElementById('rob-copy')!;

    const update = () => {
        let text = `User-agent: ${agentIn.value || '*'}\n`;

        const allows = allowIn.value.split('\n').map(l => l.trim()).filter(l => l);
        allows.forEach(l => text += `Allow: ${l}\n`);

        const disallows = disallowIn.value.split('\n').map(l => l.trim()).filter(l => l);
        disallows.forEach(l => text += `Disallow: ${l}\n`);

        if (sitemapIn.value) {
            text += `\nSitemap: ${sitemapIn.value}`;
        }

        codeRes.textContent = text;
    };

    [agentIn, allowIn, disallowIn, sitemapIn].forEach(inp => inp.addEventListener('input', update));

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeRes.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });

    update();
}
