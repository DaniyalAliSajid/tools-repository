export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="section-gap">
          <div class="input-group">
            <label for="flex-direction">Flex Direction</label>
            <select id="flex-direction" class="input-field">
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>
          <div class="input-group">
            <label for="flex-justify">Justify Content</label>
            <select id="flex-justify" class="input-field">
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>
          <div class="input-group">
            <label for="flex-align">Align Items</label>
            <select id="flex-align" class="input-field">
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="baseline">baseline</option>
            </select>
          </div>
          <div class="input-group">
            <label for="flex-gap">Gap (px)</label>
            <input type="number" id="flex-gap" class="input-field" value="10">
          </div>
        </div>

        <div class="section-gap">
          <div class="preview-box" id="flex-preview" style="display: flex; gap: 10px; min-height: 200px; border: 2px dashed var(--color-border); padding: var(--space-4); background: var(--color-surface);">
             <div style="width: 50px; height: 50px; background: var(--color-primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white;">1</div>
             <div style="width: 50px; height: 50px; background: var(--color-primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white;">2</div>
             <div style="width: 50px; height: 50px; background: var(--color-primary); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white;">3</div>
          </div>
          <div class="input-group">
            <label>Generated CSS</label>
            <div class="result-box" id="flex-code" style="font-family: monospace; white-space: pre-wrap; background: white;"></div>
            <button class="btn btn--secondary btn--sm result-box__copy" id="flex-copy">Copy CSS</button>
          </div>
        </div>
      </div>
    </div>
  `;

    const dirIn = document.getElementById('flex-direction') as HTMLSelectElement;
    const justifyIn = document.getElementById('flex-justify') as HTMLSelectElement;
    const alignIn = document.getElementById('flex-align') as HTMLSelectElement;
    const gapIn = document.getElementById('flex-gap') as HTMLInputElement;
    const preview = document.getElementById('flex-preview')!;
    const codeRes = document.getElementById('flex-code')!;
    const copyBtn = document.getElementById('flex-copy')!;

    const update = () => {
        const dir = dirIn.value;
        const justify = justifyIn.value;
        const align = alignIn.value;
        const gap = gapIn.value || '0';

        preview.style.flexDirection = dir;
        preview.style.justifyContent = justify;
        preview.style.alignItems = align;
        preview.style.gap = `${gap}px`;

        const css = `.container {
  display: flex;
  flex-direction: ${dir};
  justify-content: ${justify};
  align-items: ${align};
  gap: ${gap}px;
}`;
        codeRes.textContent = css;
    };

    [dirIn, justifyIn, alignIn, gapIn].forEach(inp => inp.addEventListener('input', update));

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeRes.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });

    update();
}
