export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="calc-display" id="calc-display">0</div>
      <div class="calc-grid">
        <button class="calc-btn" data-val="AC">AC</button>
        <button class="calc-btn" data-val="backspace">⌫</button>
        <button class="calc-btn calc-btn--operator" data-val="%">%</button>
        <button class="calc-btn calc-btn--operator" data-val="/">÷</button>
        <button class="calc-btn" data-val="7">7</button>
        <button class="calc-btn" data-val="8">8</button>
        <button class="calc-btn" data-val="9">9</button>
        <button class="calc-btn calc-btn--operator" data-val="*">×</button>
        <button class="calc-btn" data-val="4">4</button>
        <button class="calc-btn" data-val="5">5</button>
        <button class="calc-btn" data-val="6">6</button>
        <button class="calc-btn calc-btn--operator" data-val="-">−</button>
        <button class="calc-btn" data-val="1">1</button>
        <button class="calc-btn" data-val="2">2</button>
        <button class="calc-btn" data-val="3">3</button>
        <button class="calc-btn calc-btn--operator" data-val="+">+</button>
        <button class="calc-btn" data-val="0" style="grid-column:span 2">0</button>
        <button class="calc-btn" data-val=".">.</button>
        <button class="calc-btn calc-btn--equals" data-val="=" style="grid-column:span 1">=</button>
      </div>
    </div>
  `;

    let current = '0';
    let operator = '';
    let previous = '';
    let resetNext = false;
    const display = document.getElementById('calc-display')!;

    container.querySelectorAll('.calc-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const val = (btn as HTMLElement).dataset.val!;
            handleInput(val);
        });
    });

    function handleInput(val: string): void {
        if (val === 'AC') {
            current = '0'; operator = ''; previous = ''; resetNext = false;
        } else if (val === 'backspace') {
            current = current.length > 1 ? current.slice(0, -1) : '0';
        } else if (['+', '-', '*', '/', '%'].includes(val)) {
            if (previous && operator && !resetNext) {
                current = String(calculate(parseFloat(previous), parseFloat(current), operator));
            }
            previous = current;
            operator = val;
            resetNext = true;
        } else if (val === '=') {
            if (previous && operator) {
                current = String(calculate(parseFloat(previous), parseFloat(current), operator));
                previous = '';
                operator = '';
                resetNext = true;
            }
        } else {
            // Number or dot
            if (val === '.' && current.includes('.')) return;
            if (resetNext) { current = val === '.' ? '0.' : val; resetNext = false; }
            else { current = current === '0' && val !== '.' ? val : current + val; }
        }
        display.textContent = current;
    }

    function calculate(a: number, b: number, op: string): number {
        switch (op) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/': return b !== 0 ? a / b : NaN;
            case '%': return a % b;
            default: return b;
        }
    }
}
