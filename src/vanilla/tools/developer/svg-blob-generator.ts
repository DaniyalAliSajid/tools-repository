export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="section-gap">
          <div class="slider-group">
            <div class="slider-group__header">
              <label class="slider-group__label">Complexity (Edges)</label>
              <span class="slider-group__value" id="blob-edges-val">6</span>
            </div>
            <input type="range" id="blob-edges" min="3" max="12" step="1" value="6">
          </div>

          <div class="slider-group">
            <div class="slider-group__header">
              <label class="slider-group__label">Growth (Randomness)</label>
              <span class="slider-group__value" id="blob-growth-val">50</span>
            </div>
            <input type="range" id="blob-growth" min="10" max="90" step="1" value="50">
          </div>

          <div class="input-group">
            <label for="blob-color">Color</label>
            <input type="color" class="input-field" id="blob-color" value="#6366f1" style="height: 50px;">
          </div>

          <button class="btn btn--primary btn--block" id="blob-regen">Generate New Shape</button>
        </div>

        <div class="section-gap">
          <div class="preview-box" id="blob-preview-container">
             <svg id="blob-svg" width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path id="blob-path" d="" fill="#6366f1" />
             </svg>
          </div>
          <div class="input-group">
            <label>SVG Code</label>
            <div class="result-box" id="blob-code" style="font-size: var(--fs-xs); height: 100px; white-space: pre-wrap;"></div>
            <button class="btn btn--secondary btn--sm result-box__copy" id="blob-copy">Copy SVG</button>
          </div>
        </div>
      </div>
    </div>
  `;

    const edgesIn = document.getElementById('blob-edges') as HTMLInputElement;
    const growthIn = document.getElementById('blob-growth') as HTMLInputElement;
    const colorIn = document.getElementById('blob-color') as HTMLInputElement;
    const regenBtn = document.getElementById('blob-regen')!;

    const edgesVal = document.getElementById('blob-edges-val')!;
    const growthVal = document.getElementById('blob-growth-val')!;

    const path = document.getElementById('blob-path') as unknown as SVGPathElement;
    const codeRes = document.getElementById('blob-code')!;
    const copyBtn = document.getElementById('blob-copy')!;

    function createBlob(edges: number, growth: number) {
        const points = [];
        const angleStep = (Math.PI * 2) / edges;
        const centerX = 100;
        const centerY = 100;
        const baseRadius = 60;

        for (let i = 0; i < edges; i++) {
            const theta = i * angleStep;
            const randomness = Math.random() * growth;
            const r = baseRadius + randomness;
            const x = centerX + r * Math.cos(theta);
            const y = centerY + r * Math.sin(theta);
            points.push({ x, y });
        }

        // Generate smooth cubic bezier path
        let d = `M ${points[0].x} ${points[0].y}`;
        for (let i = 0; i < points.length; i++) {
            const p1 = points[i];
            const p2 = points[(i + 1) % points.length];
            const midX = (p1.x + p2.x) / 2;
            const midY = (p1.y + p2.y) / 2;

            // Simple smoothing: use midpoints as control points
            d += ` Q ${p1.x} ${p1.y}, ${midX} ${midY}`;
        }
        d += " Z";
        return d;
    }

    const update = () => {
        const edges = parseInt(edgesIn.value);
        const growth = parseInt(growthIn.value);
        const color = colorIn.value;

        edgesVal.textContent = edges.toString();
        growthVal.textContent = growth.toString();

        const d = createBlob(edges, growth);
        path.setAttribute('d', d);
        path.setAttribute('fill', color);

        const fullSvg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <path d="${d}" fill="${color}" />
</svg>`;
        codeRes.textContent = fullSvg;
    };

    [edgesIn, growthIn, colorIn].forEach(inp => inp.addEventListener('input', update));
    regenBtn.addEventListener('click', update);

    copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeRes.textContent || '');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => copyBtn.textContent = originalText, 2000);
    });

    update();
}
