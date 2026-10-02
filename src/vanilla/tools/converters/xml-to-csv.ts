export function render(container: HTMLElement): void {
  container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Input Data</h4>
        <div class="input-group">
          <label for="xml-input">XML Content</label>
          <textarea id="xml-input" class="input-field" rows="12" style="font-family: monospace;" placeholder="<root>\n  <item>\n    <name>John</name>\n    <age>30</age>\n  </item>\n</root>"></textarea>
        </div>
        <button class="btn btn--primary btn--block btn--lg" id="btn-convert" style="margin-top: var(--space-4);">🔄 Convert to CSV</button>
      </div>
    </div>
    <div class="tool-layout__output">
      <h3 style="margin-bottom: var(--space-4); font-size: var(--fs-base);">CSV Output</h3>
      <div class="input-group">
        <textarea id="csv-output" class="input-field" rows="12" readonly style="font-family: monospace; background: var(--color-surface-alt);" placeholder="Converted CSV will appear here..."></textarea>
      </div>
    </div>
  `;

  const btnConvert = document.getElementById('btn-convert')!;
  const inputEl = document.getElementById('xml-input') as HTMLTextAreaElement;
  const outputEl = document.getElementById('csv-output') as HTMLTextAreaElement;

  btnConvert.addEventListener('click', () => {
    try {
       const xmlStr = inputEl.value.trim();
       if (!xmlStr) {
           outputEl.value = '';
           return;
       }
       
       const parser = new DOMParser();
       const xmlDoc = parser.parseFromString(xmlStr, "text/xml");
       if (xmlDoc.querySelector('parsererror')) {
         outputEl.value = 'Error: Invalid XML structure.';
         return;
       }
       
       const elements = xmlDoc.documentElement.children;
       if (elements.length === 0) {
         outputEl.value = 'Error: No child elements found in the XML root.';
         return;
       }

       const keys = new Set<string>();
       const rows: Record<string, string>[] = [];

       for (let i = 0; i < elements.length; i++) {
         const el = elements[i];
         const rowData: Record<string, string> = {};
         for (let j = 0; j < el.children.length; j++) {
           const child = el.children[j];
           keys.add(child.tagName);
           rowData[child.tagName] = child.textContent || '';
         }
         rows.push(rowData);
       }

       const keyArray = Array.from(keys);
       let csv = keyArray.join(',') + '\n';
       
       for (const row of rows) {
         const rowValues = keyArray.map(key => {
            let val = row[key] || '';
            if (val.includes(',') || val.includes('"') || val.includes('\n')) {
                val = '"' + val.replace(/"/g, '""') + '"';
            }
            return val;
         });
         csv += rowValues.join(',') + '\n';
       }

       outputEl.value = csv;
    } catch (e) {
      outputEl.value = 'Error processing XML data.';
    }
  });
}
