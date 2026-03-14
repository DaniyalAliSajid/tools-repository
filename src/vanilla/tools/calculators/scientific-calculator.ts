export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="section-gap">
      <div class="calc-display" id="sci-display">0</div>
      <div class="calc-grid" style="grid-template-columns:repeat(5,1fr)">
        <button class="calc-btn calc-btn--operator" data-val="sin">sin</button>
        <button class="calc-btn calc-btn--operator" data-val="cos">cos</button>
        <button class="calc-btn calc-btn--operator" data-val="tan">tan</button>
        <button class="calc-btn calc-btn--operator" data-val="log">log</button>
        <button class="calc-btn calc-btn--operator" data-val="ln">ln</button>
        <button class="calc-btn calc-btn--operator" data-val="sqrt">√</button>
        <button class="calc-btn calc-btn--operator" data-val="pow">x²</button>
        <button class="calc-btn calc-btn--operator" data-val="pi">π</button>
        <button class="calc-btn calc-btn--operator" data-val="e">e</button>
        <button class="calc-btn" data-val="AC">AC</button>
        <button class="calc-btn" data-val="7">7</button>
        <button class="calc-btn" data-val="8">8</button>
        <button class="calc-btn" data-val="9">9</button>
        <button class="calc-btn calc-btn--operator" data-val="/">÷</button>
        <button class="calc-btn" data-val="backspace">⌫</button>
        <button class="calc-btn" data-val="4">4</button>
        <button class="calc-btn" data-val="5">5</button>
        <button class="calc-btn" data-val="6">6</button>
        <button class="calc-btn calc-btn--operator" data-val="*">×</button>
        <button class="calc-btn calc-btn--operator" data-val="(">(</button>
        <button class="calc-btn" data-val="1">1</button>
        <button class="calc-btn" data-val="2">2</button>
        <button class="calc-btn" data-val="3">3</button>
        <button class="calc-btn calc-btn--operator" data-val="-">−</button>
        <button class="calc-btn calc-btn--operator" data-val=")">)</button>
        <button class="calc-btn" data-val="0" style="grid-column:span 2">0</button>
        <button class="calc-btn" data-val=".">.</button>
        <button class="calc-btn calc-btn--operator" data-val="+">+</button>
        <button class="calc-btn calc-btn--equals" data-val="=" style="grid-column:span 1">=</button>
      </div>
    </div>
  `;

    let expression = '';
    const display = document.getElementById('sci-display')!;

    container.querySelectorAll('.calc-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const val = (btn as HTMLElement).dataset.val!;
            handleInput(val);
        });
    });

    function handleInput(val: string): void {
        switch (val) {
            case 'AC':
                expression = '';
                display.textContent = '0';
                return;
            case 'backspace':
                expression = expression.slice(0, -1);
                display.textContent = expression || '0';
                return;
            case '=':
                try {
                    const result = evaluateExpression(expression);
                    display.textContent = String(result);
                    expression = String(result);
                } catch {
                    display.textContent = 'Error';
                    expression = '';
                }
                return;
            case 'sin': expression += 'Math.sin('; break;
            case 'cos': expression += 'Math.cos('; break;
            case 'tan': expression += 'Math.tan('; break;
            case 'log': expression += 'Math.log10('; break;
            case 'ln': expression += 'Math.log('; break;
            case 'sqrt': expression += 'Math.sqrt('; break;
            case 'pow': expression += '**2'; break;
            case 'pi': expression += String(Math.PI); break;
            case 'e': expression += String(Math.E); break;
            default: expression += val; break;
        }
        display.textContent = expression || '0';
    }

    function evaluateExpression(expr: string): number {
        // Sanitize: only allow numbers, operators, Math functions, parentheses
        const sanitized = expr.replace(/[^0-9+\-*/().eE\s]|(?:Math\.\w+)/g, (match) => {
            if (match.startsWith('Math.')) return match;
            return '';
        });
        // Use Function constructor instead of eval for slightly better safety
        const fn = new Function(`"use strict"; return (${sanitized});`);
        const result = fn();
        if (typeof result !== 'number' || !isFinite(result)) throw new Error('Invalid');
        return Math.round(result * 1e12) / 1e12;
    }
}
