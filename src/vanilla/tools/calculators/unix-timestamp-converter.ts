export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="tool-grid-2">
        <div class="input-group">
          <label for="uts-timestamp">Unix Timestamp (seconds)</label>
          <input type="number" class="input-field" id="uts-timestamp" value="${Math.floor(Date.now() / 1000)}">
          <button class="btn btn--secondary btn--sm" id="uts-now" style="margin-top: var(--space-2);">Set to Now</button>
        </div>
        <div class="input-group">
          <label for="uts-date">Human Date</label>
          <input type="datetime-local" class="input-field" id="uts-date">
        </div>
      </div>

      <div class="input-group">
        <label>ISO 8601 & UTC</label>
        <div class="result-box" id="uts-result" style="background: white; padding: var(--space-6);">
           <div style="margin-bottom: var(--space-2);"><strong>Local:</strong> <span id="uts-local">--</span></div>
           <div style="margin-bottom: var(--space-2);"><strong>UTC:</strong> <span id="uts-utc">--</span></div>
           <div><strong>Relative:</strong> <span id="uts-rel">--</span></div>
        </div>
      </div>
    </div>
  `;

    const tsIn = document.getElementById('uts-timestamp') as HTMLInputElement;
    const dateIn = document.getElementById('uts-date') as HTMLInputElement;
    const nowBtn = document.getElementById('uts-now')!;
    const localRes = document.getElementById('uts-local')!;
    const utcRes = document.getElementById('uts-utc')!;
    const relRes = document.getElementById('uts-rel')!;

    const updateFromTs = () => {
        const ts = parseInt(tsIn.value) * 1000;
        if (isNaN(ts)) return;
        const d = new Date(ts);
        updateOutputs(d);

        // Sync date input
        const offset = d.getTimezoneOffset() * 60000;
        const localISOTime = (new Date(d.getTime() - offset)).toISOString().slice(0, 16);
        dateIn.value = localISOTime;
    };

    const updateFromDate = () => {
        const d = new Date(dateIn.value);
        if (isNaN(d.getTime())) return;
        tsIn.value = Math.floor(d.getTime() / 1000).toString();
        updateOutputs(d);
    };

    const updateOutputs = (d: Date) => {
        localRes.textContent = d.toLocaleString();
        utcRes.textContent = d.toUTCString();

        const diff = Date.now() - d.getTime();
        const sec = Math.floor(diff / 1000);
        const min = Math.floor(sec / 60);
        const hrs = Math.floor(min / 60);
        const dias = Math.floor(hrs / 24);

        if (Math.abs(dias) > 0) relRes.textContent = `${Math.abs(dias)} days ${diff > 0 ? 'ago' : 'from now'}`;
        else if (Math.abs(hrs) > 0) relRes.textContent = `${Math.abs(hrs)} hours ${diff > 0 ? 'ago' : 'from now'}`;
        else if (Math.abs(min) > 0) relRes.textContent = `${Math.abs(min)} minutes ${diff > 0 ? 'ago' : 'from now'}`;
        else relRes.textContent = 'Just now';
    };

    tsIn.addEventListener('input', updateFromTs);
    dateIn.addEventListener('input', updateFromDate);
    nowBtn.addEventListener('click', () => {
        tsIn.value = Math.floor(Date.now() / 1000).toString();
        updateFromTs();
    });

    updateFromTs();
}
