export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="padding: var(--space-4); background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: var(--radius-xl);">
        <div id="calc-display-container" style="
            background: white; 
            color: #1e293b; 
            padding: var(--space-4); 
            border: 1px solid #cbd5e1;
            border-radius: var(--radius-md); 
            text-align: right; 
            margin-bottom: var(--space-4);
            min-height: 100px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.05);
        ">
          <div id="calc-expression" style="font-size: 1rem; color: #64748b; height: 1.5rem; margin-bottom: 4px; font-family: 'JetBrains Mono', monospace;"></div>
          <div id="calc-current" style="font-size: 2.5rem; font-weight: 700; font-family: 'JetBrains Mono', monospace; line-height: 1.2; word-break: break-all;">0</div>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: var(--space-2);">
          <!-- Memory Row -->
          <button class="calc-btn" data-val="mc" style="background: #e2e8f0; color: #475569; font-size: 1.1rem;">mc</button>
          <button class="calc-btn" data-val="mr" style="background: #e2e8f0; color: #475569; font-size: 1.1rem;">mr</button>
          <button class="calc-btn" data-val="m-" style="background: #e2e8f0; color: #475569; font-size: 1.1rem;">m-</button>
          <button class="calc-btn" data-val="m+" style="background: #e2e8f0; color: #475569; font-size: 1.1rem;">m+</button>
          
          <!-- Top Row -->
          <button class="calc-btn" data-val="AC" style="background: #e2e8f0; color: #475569; font-size: 1.2rem; font-weight: 500;">AC</button>
          <button class="calc-btn" data-val="sqrt" style="background: #e2e8f0; color: #475569; font-size: 1.2rem;">√x</button>
          <button class="calc-btn" data-val="%" style="background: #e2e8f0; color: #475569; font-size: 1.2rem;">%</button>
          <button class="calc-btn" data-val="/" style="background: #fbbf24; color: #1e293b; font-size: 1.5rem; font-weight: 700;">÷</button>
          
          <!-- Digits & Operators -->
          <button class="calc-btn btn-digit" data-val="7">7</button>
          <button class="calc-btn btn-digit" data-val="8">8</button>
          <button class="calc-btn btn-digit" data-val="9">9</button>
          <button class="calc-btn" data-val="*" style="background: #fbbf24; color: #1e293b; font-size: 1.5rem; font-weight: 700;">×</button>
          
          <button class="calc-btn btn-digit" data-val="4">4</button>
          <button class="calc-btn btn-digit" data-val="5">5</button>
          <button class="calc-btn btn-digit" data-val="6">6</button>
          <button class="calc-btn" data-val="-" style="background: #fbbf24; color: #1e293b; font-size: 1.5rem; font-weight: 700;">−</button>
          
          <button class="calc-btn btn-digit" data-val="1">1</button>
          <button class="calc-btn btn-digit" data-val="2">2</button>
          <button class="calc-btn btn-digit" data-val="3">3</button>
          <button class="calc-btn" data-val="+" style="background: #fbbf24; color: #1e293b; font-size: 1.5rem; font-weight: 700;">+</button>
          
          <button class="calc-btn btn-digit" data-val="0">0</button>
          <button class="calc-btn btn-digit" data-val=".">.</button>
          <button class="calc-btn" data-val="sign" style="background: #e2e8f0; color: #475569; font-size: 1.2rem;">+/-</button>
          <button class="calc-btn" data-val="=" style="background: #fbbf24; color: #1e293b; font-size: 1.5rem; font-weight: 700;">=</button>

          <!-- Advanced Row -->
          <button class="calc-btn" data-val="pi" style="background: #e2e8f0; color: #475569; font-size: 1.1rem;">π</button>
          <button class="calc-btn" data-val="pow" style="background: #e2e8f0; color: #475569; font-size: 1.1rem;">x<sup>y</sup></button>
          <button class="calc-btn" data-val="r2" style="background: #e2e8f0; color: #475569; font-size: 1rem;">R2</button>
          <button class="calc-btn" data-val="r0" style="background: #e2e8f0; color: #475569; font-size: 1rem;">R0</button>
        </div>

        <style>
          .calc-btn {
              aspect-ratio: 1.2 / 1;
              border: 1px solid #cbd5e1;
              border-radius: var(--radius-md);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.4rem;
              font-family: inherit;
              cursor: pointer;
              transition: all 0.1s ease;
              box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          }
          .calc-btn:hover { background-opacity: 0.9; transform: translateY(-1px); }
          .calc-btn:active { transform: translateY(1px); }
          .btn-digit { background: white; color: #1e293b; font-weight: 600; }
        </style>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Tip:</strong> Press [Enter] on your keyboard for totals, or [Escape] to clear.
        </p>
      </div>
    </div>
    <div class="tool-layout__output">
      <h3 style="margin-bottom: var(--space-4); font-size: var(--fs-base);">Calculation History</h3>
      <div id="calc-history" style="height: 340px; overflow-y: auto; background: var(--color-surface); border-radius: var(--radius-lg); padding: var(--space-4); font-family: var(--font-mono); font-size: var(--fs-sm); display: flex; flex-direction: column; gap: var(--space-2);">
        <div style="color: var(--color-text-muted); text-align: center; margin-top: var(--space-20);">No history yet</div>
      </div>
      <button class="btn btn--secondary btn--sm btn--block" id="btn-clear-history" style="margin-top: var(--space-4);">Clear History</button>
    </div>
  `;

    let current = '0';
    let operator = '';
    let previous = '';
    let expression = '';
    let resetNext = false;
    let memory = 0;

    const displayCur = document.getElementById('calc-current')!;
    const displayExp = document.getElementById('calc-expression')!;

    container.querySelectorAll('.calc-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const val = (btn as HTMLElement).dataset.val!;
            handleInput(val);
        });
    });

    function handleInput(val: string): void {
        const num = parseFloat(current);
        const opSymbols: Record<string, string> = { '+': '+', '-': '−', '*': '×', '/': '÷', 'pow': '^' };

        if (val === 'AC') {
            current = '0'; operator = ''; previous = ''; expression = ''; resetNext = false;
        } else if (val === 'backspace') {
            current = current.length > 1 ? current.slice(0, -1) : '0';
        } else if (val === 'mc') {
            memory = 0;
        } else if (val === 'mr') {
            current = String(memory); resetNext = true;
        } else if (val === 'm-') {
            memory -= num; resetNext = true;
        } else if (val === 'm+') {
            memory += num; resetNext = true;
        } else if (val === 'sqrt') {
            const res = Math.sqrt(num);
            addToHistory(`√(${num}) = ${res}`);
            current = String(res); resetNext = true;
            expression = `√(${num})`;
        } else if (val === 'sign') {
            current = String(num * -1);
        } else if (val === 'pi') {
            current = String(Math.PI); resetNext = true;
        } else if (val === 'r2') {
            current = num.toFixed(2);
        } else if (val === 'r0') {
            current = num.toFixed(0);
        } else if (['+', '-', '*', '/', 'pow'].includes(val)) {
            if (previous && operator && !resetNext) {
                const res = calculate(parseFloat(previous), num, operator);
                current = String(res);
                addToHistory(`${previous} ${opSymbols[operator] || operator} ${num} = ${res}`);
            }
            previous = current;
            operator = val;
            expression = `${previous} ${opSymbols[val] || val}`;
            resetNext = true;
        } else if (val === '=') {
            if (previous && operator) {
                const res = calculate(parseFloat(previous), num, operator);
                expression = `${previous} ${opSymbols[operator] || operator} ${num} =`;
                addToHistory(`${previous} ${opSymbols[operator] || operator} ${num} = ${res}`);
                current = String(res);
                previous = '';
                operator = '';
                resetNext = true;
            }
        } else if (val === '%') {
             current = String(num / 100);
             resetNext = true;
        } else {
            if (val === '.' && current.includes('.')) return;
            if (resetNext) {
                current = val === '.' ? '0.' : val;
                resetNext = false;
            } else {
                current = current === '0' && val !== '.' ? val : current + val;
            }
        }

        displayCur.textContent = current;
        displayExp.textContent = expression;
    }

    const historyEl = document.getElementById('calc-history')!;
    function addToHistory(entry: string): void {
        const item = document.createElement('div');
        item.style.padding = 'var(--space-2)';
        item.style.borderBottom = '1px solid var(--color-border)';
        item.style.display = 'flex';
        item.style.justifyContent = 'space-between';
        
        if (historyEl.querySelector('div[style*="text-align: center"]')) {
            historyEl.innerHTML = '';
        }

        item.innerHTML = `<span>Result:</span> <strong>${entry}</strong>`;
        historyEl.prepend(item);
    }

    document.getElementById('btn-clear-history')!.addEventListener('click', () => {
        historyEl.innerHTML = '<div style="color: var(--color-text-muted); text-align: center; margin-top: var(--space-20);">No history yet</div>';
    });

    // Keyboard support
    window.addEventListener('keydown', (e) => {
        if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
            handleInput(e.key);
        } else if (['+', '-', '*', '/'].includes(e.key)) {
            handleInput(e.key);
        } else if (e.key === 'Enter' || e.key === '=') {
            e.preventDefault();
            handleInput('=');
        } else if (e.key === 'Backspace') {
            handleInput('backspace');
        } else if (e.key === 'Escape') {
            handleInput('AC');
        }
    });

    function calculate(a: number, b: number, op: string): number {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b !== 0 ? a / b : NaN;
            case 'pow': return Math.pow(a, b);
            default: return b;
        }
    }
}
