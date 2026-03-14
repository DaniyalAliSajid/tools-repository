export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="md-input">Markdown Input</label>
          <textarea class="input-field" id="md-input" rows="15" placeholder="# Hello World\n\nStart typing **markdown**..."></textarea>
        </div>
        <div class="input-group">
          <label>Live Preview</label>
          <div class="result-box" id="md-preview" style="height: 335px; overflow-y: auto; font-family: inherit; white-space: normal; background: white;"></div>
        </div>
      </div>
    </div>
  `;

    const input = document.getElementById('md-input') as HTMLTextAreaElement;
    const preview = document.getElementById('md-preview') as HTMLDivElement;

    const parseMarkdown = (text: string): string => {
        let html = text
            .replace(/^### (.*$)/gim, '<h3>$1</h3>')
            .replace(/^## (.*$)/gim, '<h2>$1</h2>')
            .replace(/^# (.*$)/gim, '<h1>$1</h1>')
            .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/!\[(.*?)\]\((.*?)\)/gim, "<img alt='$1' src='$2' />")
            .replace(/\[(.*?)\]\((.*?)\)/gim, "<a href='$2'>$1</a>")
            .replace(/\n$/gim, '<br />');

        return html.trim();
    };

    input.addEventListener('input', () => {
        preview.innerHTML = parseMarkdown(input.value);
    });
}
