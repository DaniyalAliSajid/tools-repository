export function render(container: HTMLElement): void {
    const timezones = [
        { name: 'Local', zone: undefined },
        { name: 'UTC', zone: 'UTC' },
        { name: 'New York', zone: 'America/New_York' },
        { name: 'London', zone: 'Europe/London' },
        { name: 'Tokyo', zone: 'Asia/Tokyo' },
        { name: 'Dubai', zone: 'Asia/Dubai' }
    ];

    container.innerHTML = `
    <div class="section-gap">
      <div id="clock-list" class="tool-grid-2">
        <!-- Clocks will appear here -->
      </div>
    </div>
  `;

    const list = document.getElementById('clock-list')!;

    const updateClocks = () => {
        const now = new Date();
        list.innerHTML = timezones.map(tz => {
            const timeStr = now.toLocaleTimeString('en-US', {
                timeZone: tz.zone,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            });
            const dateStr = now.toLocaleDateString('en-US', {
                timeZone: tz.zone,
                weekday: 'short',
                month: 'short',
                day: 'numeric'
            });

            return `
          <div class="result-box" style="background: white; text-align: center; padding: var(--space-6);">
            <div style="font-weight: 700; color: var(--color-primary); margin-bottom: var(--space-2);">${tz.name}</div>
            <div style="font-size: 2.5rem; font-weight: 700; font-family: monospace; margin-bottom: var(--space-1);">${timeStr}</div>
            <div style="font-size: var(--fs-sm); opacity: 0.7;">${dateStr}</div>
          </div>
        `;
        }).join('');
    };

    const interval = setInterval(updateClocks, 1000);
    updateClocks();

    // Clean up interval when rendering something else potentially? 
    // In our spa, we might need a way to stop it, but for now we'll leave it.
}
