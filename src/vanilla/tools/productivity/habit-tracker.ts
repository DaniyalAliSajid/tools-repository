export function render(container: HTMLElement): void {
    const STORAGE_KEY = 'freetools_habits';
    let habits: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '["Drink Water", "Exercise", "Read 10 Pages"]');

    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group" style="display: flex; gap: var(--space-2);">
        <input type="text" id="habit-name" class="input-field" placeholder="Add a new habit...">
        <button class="btn btn--primary" id="habit-add">Add</button>
      </div>

      <div id="habit-list" class="section-gap">
        <!-- Habits will appear here -->
      </div>
      
      <div style="text-align: center; margin-top: var(--space-6);">
        <button class="btn btn--secondary btn--sm" id="habit-reset">Reset Today's Progress</button>
      </div>
    </div>
  `;

    const input = document.getElementById('habit-name') as HTMLInputElement;
    const addBtn = document.getElementById('habit-add')!;
    const list = document.getElementById('habit-list')!;
    const resetBtn = document.getElementById('habit-reset')!;

    const renderHabits = () => {
        list.innerHTML = habits.map((habit, i) => `
      <div class="result-box" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2); background: white;">
        <div style="display: flex; align-items: center; gap: var(--space-4);">
          <input type="checkbox" style="width: 20px; height: 20px;">
          <span style="font-weight: 500;">${habit}</span>
        </div>
        <button class="btn btn--sm" style="color: #ef4444; background: none; border: none; cursor: pointer;" onclick="window.removeHabit(${i})">Remove</button>
      </div>
    `).join('');
    };

    (window as any).removeHabit = (index: number) => {
        habits.splice(index, 1);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
        renderHabits();
    };

    addBtn.addEventListener('click', () => {
        if (input.value.trim()) {
            habits.push(input.value.trim());
            localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
            input.value = '';
            renderHabits();
        }
    });

    resetBtn.addEventListener('click', () => {
        list.querySelectorAll('input[type="checkbox"]').forEach((cb: any) => cb.checked = false);
    });

    renderHabits();
}
