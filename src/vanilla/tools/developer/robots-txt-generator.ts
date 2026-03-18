export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Bot Configuration</h4>
        <div class="input-group">
          <label for="rob-agent">User-agent</label>
          <input type="text" id="rob-agent" class="input-field" value="*">
          <p style="font-size: var(--fs-xs); color: var(--color-text-muted); margin-top: 4px;">Use '*' for all bots</p>
        </div>
      </div>
      
      <div class="tool-grid-2" style="margin-bottom: var(--space-4);">
        <div class="input-group">
          <label for="rob-allow">Allow Paths</label>
          <textarea id="rob-allow" class="input-field" rows="5" placeholder="/\n/public/"></textarea>
        </div>
        <div class="input-group">
          <label for="rob-disallow">Disallow Paths</label>
          <textarea id="rob-disallow" class="input-field" rows="5" placeholder="/admin/\n/tmp/"></textarea>
        </div>
      </div>

      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Extra Info</h4>
        <div class="input-group">
          <label for="rob-sitemap">Sitemap URL (Recommended)</label>
          <input type="text" id="rob-sitemap" class="input-field" placeholder="https://example.com/sitemap.xml">
        </div>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Robots.txt Content</h3>
        <button class="btn btn--secondary btn--sm" id="rob-copy">📋 Copy Text</button>
      </div>
      <div class="result-box" id="rob-code" style="padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: var(--fs-sm); line-height: 1.5; height: calc(100% - 48px); min-height: 480px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap;"></div>
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
