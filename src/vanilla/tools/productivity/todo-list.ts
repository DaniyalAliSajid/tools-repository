export function render(container: HTMLElement): void {
    const STORAGE_KEY = 'freetools_todos';
    let todos: { text: string; completed: boolean }[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');

    container.innerHTML = `
    <div class="section-gap">
      <div class="input-group" style="display: flex; gap: var(--space-2);">
        <input type="text" id="todo-input" class="input-field" placeholder="What needs to be done?">
        <button class="btn btn--primary" id="todo-add">Add Task</button>
      </div>

      <div id="todo-list" style="margin-top: var(--space-6);">
        <!-- Todos will appear here -->
      </div>
    </div>
  `;

    const input = document.getElementById('todo-input') as HTMLInputElement;
    const list = document.getElementById('todo-list')!;
    const addBtn = document.getElementById('todo-add')!;

    const renderTodos = () => {
        list.innerHTML = todos.map((todo, i) => `
      <div class="result-box" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2); background: white; ${todo.completed ? 'opacity: 0.6;' : ''}">
        <div style="display: flex; align-items: center; gap: var(--space-4);">
          <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="window.toggleTodo(${i})" style="width: 20px; height: 20px;">
          <span style="font-weight: 500; ${todo.completed ? 'text-decoration: line-through;' : ''}">${todo.text}</span>
        </div>
        <button class="btn btn--sm" style="color: #ef4444; background: none; border: none; cursor: pointer;" onclick="window.removeTodo(${i})">Remove</button>
      </div>
    `).join('');
        if (todos.length === 0) {
            list.innerHTML = '<div style="text-align: center; color: var(--color-text-muted); padding: var(--space-8);">No tasks yet. Enjoy your day!</div>';
        }
    };

    (window as any).toggleTodo = (index: number) => {
        todos[index].completed = !todos[index].completed;
        save();
        renderTodos();
    };

    (window as any).removeTodo = (index: number) => {
        todos.splice(index, 1);
        save();
        renderTodos();
    };

    const save = () => localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));

    addBtn.addEventListener('click', () => {
        if (input.value.trim()) {
            todos.push({ text: input.value.trim(), completed: false });
            save();
            input.value = '';
            renderTodos();
        }
    });

    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addBtn.click();
    });

    renderTodos();
}
