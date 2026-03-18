export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="margin-bottom: var(--space-4);">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Basic Configuration</h4>
        <div class="input-group">
          <label for="meta-title">Page Title</label>
          <input type="text" id="meta-title" class="input-field" placeholder="My Awesome Website">
        </div>
        <div class="input-group">
          <label for="meta-desc">Meta Description</label>
          <textarea id="meta-desc" class="input-field" rows="3" placeholder="A brief summary of your site (max 160 characters recommended)..."></textarea>
        </div>
      </div>
      
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Advanced Detail</h4>
        <div class="input-group">
          <label for="meta-keys">Keywords (SEO)</label>
          <input type="text" id="meta-keys" class="input-field" placeholder="web, developer, tools, seo">
        </div>
        <div class="input-group">
          <label for="meta-author">Site Author</label>
          <input type="text" id="meta-author" class="input-field" placeholder="John Doe">
        </div>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Generated HTML Tags</h3>
        <button class="btn btn--secondary btn--sm" id="meta-copy">📋 Copy Code</button>
      </div>
      <div class="result-box" id="meta-code" style="padding: var(--space-4); font-family: 'JetBrains Mono'; font-size: var(--fs-sm); line-height: 1.5; height: calc(100% - 48px); min-height: 480px; overflow-y: auto; border: none; outline: none; white-space: pre-wrap;"></div>
    </div>
  `;

    const titleIn = document.getElementById('meta-title') as HTMLInputElement;
    const descIn = document.getElementById('meta-desc') as HTMLTextAreaElement;
    const keysIn = document.getElementById('meta-keys') as HTMLInputElement;
    const authIn = document.getElementById('meta-author') as HTMLInputElement;

    const codeRes = document.getElementById('meta-code')!;
    const copyBtn = document.getElementById('meta-copy')!;

    const update = () => {
        const title = titleIn.value;
        const desc = descIn.value;
        const keys = keysIn.value;
        const auth = authIn.value;

        let html = '';
        if (title) html += `<!-- Primary Meta Tags -->\n<title>${title}</title>\n<meta name="title" content="${title}">\n`;
        if (desc) html += `<meta name="description" content="${desc}">\n\n`;
        if (keys) html += `<!-- Keywords -->\n<meta name="keywords" content="${keys}">\n\n`;
        if (auth) html += `<!-- Author -->\n<meta name="author" content="${auth}">\n\n`;

        html += `<!-- Open Graph / Facebook -->\n<meta property="og:type" content="website">\n<meta property="og:title" content="${title}">\n<meta property="og:description" content="${desc}">\n\n`;
        html += `<!-- Twitter -->\n<meta property="twitter:card" content="summary_large_image">\n<meta property="twitter:title" content="${title}">\n<meta property="twitter:description" content="${desc}">`;

        codeRes.textContent = html;
    };

    [titleIn, descIn, keysIn, authIn].forEach(inp => inp.addEventListener('input', update));

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeRes.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });

    update();
}
