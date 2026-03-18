export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="input-group">
        <label for="md-input">Markdown Editor</label>
        <textarea class="input-field" id="md-input" rows="22" placeholder="# Hello World\n\nStart typing **markdown**..." style="resize: vertical; font-family: 'JetBrains Mono'; font-size: 0.875rem; line-height: 1.6;"></textarea>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2);">
          <div style="font-size: var(--fs-xs); color: var(--color-text-muted);"># H1</div>
          <div style="font-size: var(--fs-xs); color: var(--color-text-muted);">**Bold**</div>
          <div style="font-size: var(--fs-xs); color: var(--color-text-muted);">## H2</div>
          <div style="font-size: var(--fs-xs); color: var(--color-text-muted);">*Italic*</div>
          <div style="font-size: var(--fs-xs); color: var(--color-text-muted);">> Quote</div>
          <div style="font-size: var(--fs-xs); color: var(--color-text-muted);">[Link](...)</div>
        </div>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Live Documents Preview</h3>
      </div>
      <div id="md-preview" style="padding: var(--space-8); background: #fff; border: 1px solid var(--color-border); border-radius: var(--radius-xl); min-height: 600px; height: calc(100% - 48px); overflow-y: auto; color: #1a1a1a; line-height: 1.7;"></div>
    </div>
  `;

    const input = document.getElementById('md-input') as HTMLTextAreaElement;
    const preview = document.getElementById('md-preview') as HTMLDivElement;

    const parseMarkdown = (text: string): string => {
        let html = text
            .replace(/^### (.*$)/gim, '<h3 style="margin: 1.5rem 0 1rem; font-weight: 700;">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 style="margin: 2rem 0 1rem; font-weight: 700; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 style="margin: 0 0 1.5rem; font-weight: 800; font-size: 2.25rem;">$1</h1>')
            .replace(/^\> (.*$)/gim, '<blockquote style="border-left: 4px solid var(--color-primary); background: var(--color-surface-hover); padding: 1rem; margin: 1rem 0; font-style: italic; color: var(--color-text-muted);">$1</blockquote>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' style='max-width: 100%; border-radius: 8px;' />")
            .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2' style='color: var(--color-primary); text-decoration: underline;'>$1</a>")
            .replace(/\n$/gim, '<br />');

        return html.trim();
    };

    input.addEventListener('input', () => {
        preview.innerHTML = parseMarkdown(input.value);
    });
}
