export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card">
        <h4 style="margin-bottom: var(--space-4); font-size: var(--fs-xs); color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.05em;">Conversion Inputs</h4>
        <div class="input-group">
          <label for="uts-timestamp">Unix Timestamp (Seconds)</label>
          <div style="display: flex; gap: var(--space-2);">
            <input type="number" class="input-field" id="uts-timestamp" value="${Math.floor(Date.now() / 1000)}" style="flex: 1; padding: var(--space-3); font-family: 'JetBrains Mono';">
            <button class="btn btn--secondary btn--sm" id="uts-now">NOW</button>
          </div>
        </div>
        <div class="input-group" style="margin-top: var(--space-6);">
          <label for="uts-date">Human Date & Time</label>
          <input type="datetime-local" class="input-field" id="uts-date" style="padding: var(--space-3);">
        </div>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Utility:</strong> Quickly convert between Unix epoch timestamps and readable date formats. Perfect for developers debugging logs or databases.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Formatted Date Output</h3>
      </div>
      <div class="result-box" id="uts-result" style="padding: var(--space-8); background: var(--color-surface-hover); min-height: 300px; display: flex; flex-direction: column; justify-content: center; gap: var(--space-6);">
         <div class="stat-card" style="text-align: left; padding: var(--space-4);">
           <div class="stat-card__label" style="margin-bottom: var(--space-1); border-bottom: 1px solid var(--color-border); padding-bottom: 4px; display: inline-block;">Local Time</div>
           <div id="uts-local" style="font-family: 'JetBrains Mono'; font-size: 1.25rem; font-weight: 700; color: var(--color-primary);">--</div>
         </div>
         <div class="stat-card" style="text-align: left; padding: var(--space-4);">
           <div class="stat-card__label" style="margin-bottom: var(--space-1); border-bottom: 1px solid var(--color-border); padding-bottom: 4px; display: inline-block;">UTC Time</div>
           <div id="uts-utc" style="font-family: 'JetBrains Mono'; font-size: 1rem; font-weight: 600; color: var(--color-text);">--</div>
         </div>
         <div class="stat-card" style="text-align: left; padding: var(--space-4);">
           <div class="stat-card__label" style="margin-bottom: var(--space-1); border-bottom: 1px solid var(--color-border); padding-bottom: 4px; display: inline-block;">Relative Difference</div>
           <div id="uts-rel" style="font-weight: 600; color: var(--color-text-secondary);">--</div>
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
