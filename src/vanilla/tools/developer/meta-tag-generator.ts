export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="section-gap">
          <div class="input-group">
            <label for="meta-title">Site Title</label>
            <input type="text" id="meta-title" class="input-field" placeholder="My Awesome Website">
          </div>
          <div class="input-group">
            <label for="meta-desc">Description</label>
            <textarea id="meta-desc" class="input-field" rows="3" placeholder="A brief summary of your site..."></textarea>
          </div>
          <div class="input-group">
            <label for="meta-keys">Keywords (comma separated)</label>
            <input type="text" id="meta-keys" class="input-field" placeholder="web, developer, tools">
          </div>
          <div class="input-group">
            <label for="meta-author">Author</label>
            <input type="text" id="meta-author" class="input-field" placeholder="John Doe">
          </div>
        </div>

        <div class="section-gap">
          <div class="input-group">
            <label>Generated Meta Tags</label>
            <div class="result-box" id="meta-code" style="font-family: monospace; white-space: pre-wrap; background: white; height: 300px; overflow: auto;"></div>
            <button class="btn btn--secondary btn--sm result-box__copy" id="meta-copy">Copy Tags</button>
          </div>
        </div>
      </div>
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
