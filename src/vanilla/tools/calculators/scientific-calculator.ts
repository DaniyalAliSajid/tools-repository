export function render(container: HTMLElement): void {
    container.innerHTML = `
    <div class="tool-layout__input">
      <div class="p-card" style="padding: var(--space-4); background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: var(--radius-xl);">
        <!-- Display Area -->
        <div id="sci-display-container" style="
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
          <div id="sci-expression" style="font-size: 0.9rem; color: #64748b; height: 1.2rem; margin-bottom: 4px; font-family: 'JetBrains Mono', monospace; overflow-x: auto; white-space: nowrap;"></div>
          <div id="sci-current" style="font-size: 2.2rem; font-weight: 700; font-family: 'JetBrains Mono', monospace; line-height: 1.2; word-break: break-all;">0</div>
        </div>

        <!-- Mode Toggle -->
        <div style="display: flex; justify-content: flex-end; gap: var(--space-4); margin-bottom: var(--space-4); font-size: var(--fs-xs); font-weight: 600; color: #475569;">
          <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
            <input type="radio" name="sci-mode" value="deg" checked> Deg
          </label>
          <label style="display: flex; align-items: center; gap: 4px; cursor: pointer;">
            <input type="radio" name="sci-mode" value="rad"> Rad
          </label>
        </div>

        <!-- Grid Area -->
        <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--space-1);">
          <!-- Trigonometry Row -->
          <button class="sci-btn btn-fn" data-val="sin">sin</button>
          <button class="sci-btn btn-fn" data-val="cos">cos</button>
          <button class="sci-btn btn-fn" data-val="tan">tan</button>
          <button class="sci-btn btn-fn" data-val="asin" style="font-size: 0.8rem;">sin⁻¹</button>
          <button class="sci-btn btn-fn" data-val="acos" style="font-size: 0.8rem;">cos⁻¹</button>

          <button class="sci-btn btn-fn" data-val="atan" style="font-size: 0.8rem;">tan⁻¹</button>
          <button class="sci-btn btn-fn" data-val="pi">π</button>
          <button class="sci-btn btn-fn" data-val="e">e</button>
          <button class="sci-btn btn-fn" data-val="pow">x<sup>y</sup></button>
          <button class="sci-btn btn-fn" data-val="pow3">x<sup>3</sup></button>

          <button class="sci-btn btn-fn" data-val="pow2">x<sup>2</sup></button>
          <button class="sci-btn btn-fn" data-val="exp">e<sup>x</sup></button>
          <button class="sci-btn btn-fn" data-val="10x">10<sup>x</sup></button>
          <button class="sci-btn btn-fn" data-val="sqrt">√</button>
          <button class="sci-btn btn-fn" data-val="log">log</button>

          <button class="sci-btn btn-fn" data-val="ln">ln</button>
          <button class="sci-btn btn-fn" data-val="(">(</button>
          <button class="sci-btn btn-fn" data-val=")">)</button>
          <button class="sci-btn btn-fn" data-val="inv">1/x</button>
          <button class="sci-btn btn-fn" data-val="fact">n!</button>

          <!-- Standard Keys -->
          <button class="sci-btn btn-num" data-val="7">7</button>
          <button class="sci-btn btn-num" data-val="8">8</button>
          <button class="sci-btn btn-num" data-val="9">9</button>
          <button class="sci-btn btn-op" data-val="+">+</button>
          <button class="sci-btn btn-special" data-val="backspace">Back</button>

          <button class="sci-btn btn-num" data-val="4">4</button>
          <button class="sci-btn btn-num" data-val="5">5</button>
          <button class="sci-btn btn-num" data-val="6">6</button>
          <button class="sci-btn btn-op" data-val="-">−</button>
          <button class="sci-btn btn-special" data-val="ans">Ans</button>

          <button class="sci-btn btn-num" data-val="1">1</button>
          <button class="sci-btn btn-num" data-val="2">2</button>
          <button class="sci-btn btn-num" data-val="3">3</button>
          <button class="sci-btn btn-op" data-val="*">×</button>
          <button class="sci-btn btn-special" data-val="m+">M+</button>

          <button class="sci-btn btn-num" data-val="0">0</button>
          <button class="sci-btn btn-num" data-val=".">.</button>
          <button class="sci-btn btn-num" data-val="exp_notation">EXP</button>
          <button class="sci-btn btn-op" data-val="/">÷</button>
          <button class="sci-btn btn-special" data-val="m-">M-</button>

          <button class="sci-btn btn-num" data-val="sign">±</button>
          <button class="sci-btn btn-num" data-val="rnd">RND</button>
          <button class="sci-btn btn-special" data-val="AC" style="background: #fecaca; color: #991b1b;">AC</button>
          <button class="sci-btn btn-op" data-val="=" style="background: #fbbf24; color: #1e293b; font-weight: 700;">=</button>
          <button class="sci-btn btn-special" data-val="mr">MR</button>
        </div>

        <style>
          .sci-btn {
              padding: var(--space-3) 0;
              border: 1px solid #cbd5e1;
              border-radius: var(--radius-md);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.1rem;
              font-family: inherit;
              cursor: pointer;
              transition: all 0.1s ease;
          }
          .sci-btn:hover { background-opacity: 0.9; transform: translateY(-1px); }
          .btn-fn { background: #e2e8f0; color: #475569; font-size: 0.95rem; }
          .btn-num { background: white; color: #1e293b; font-weight: 600; }
          .btn-op { background: #f8fafc; color: #1e293b; font-size: 1.3rem; }
          .btn-special { background: #e2e8f0; color: #475569; font-size: 0.9rem; font-weight: 600; }
        </style>
      </div>
      
      <div class="p-card" style="margin-top: var(--space-4);">
        <p style="font-size: var(--fs-xs); color: var(--color-text-muted); line-height: 1.6;">
          <strong>Advanced:</strong> Supports trigonometric functions, logarithms, and standard arithmetic with operator precedence.
        </p>
      </div>
    </div>
    
    <div class="tool-layout__output">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--fs-base);">Advanced Functions Guide</h3>
      </div>
      <div class="p-card" style="display: flex; flex-direction: column; gap: var(--space-4);">
        <div style="display: grid; grid-template-columns: 1fr 2fr; gap: var(--space-2); font-size: var(--fs-sm);">
          <span style="font-weight: 700;">sin(x)</span> <span style="color: var(--color-text-muted);">Sine of x (radians)</span>
          <span style="font-weight: 700;">log(x)</span> <span style="color: var(--color-text-muted);">Base-10 Logarithm</span>
          <span style="font-weight: 700;">ln(x)</span> <span style="color: var(--color-text-muted);">Natural Logarithm</span>
          <span style="font-weight: 700;">pow(x,y)</span> <span style="color: var(--color-text-muted);">x to the power of y</span>
        </div>
      </div>
      <div style="margin-top: var(--space-6); text-align: center; opacity: 0.1; font-size: 4rem;">📐</div>
    </div>
  `;

    let currentExpr = '';
    let lastAns = '0';
    let memory = 0;
    const displayCur = document.getElementById('sci-current')!;
    const displayExp = document.getElementById('sci-expression')!;

    container.querySelectorAll('.sci-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            handleInput((btn as HTMLElement).dataset.val!);
        });
    });

    function handleInput(val: string): void {
        const mode = (container.querySelector('input[name="sci-mode"]:checked') as HTMLInputElement).value;
        const toRad = (x: number) => mode === 'deg' ? x * (Math.PI / 180) : x;
        const fromRad = (x: number) => mode === 'deg' ? x * (180 / Math.PI) : x;

        switch (val) {
            case 'AC':
                currentExpr = '';
                displayCur.textContent = '0';
                displayExp.textContent = '';
                return;
            case 'backspace':
                currentExpr = currentExpr.slice(0, -1);
                displayExp.textContent = currentExpr;
                return;
            case '=':
                try {
                    const result = evaluate(currentExpr, toRad, fromRad);
                    lastAns = String(result);
                    displayCur.textContent = lastAns;
                    displayExp.textContent = currentExpr + ' =';
                    currentExpr = lastAns;
                } catch {
                    displayCur.textContent = 'Error';
                }
                return;
            case 'ans': currentExpr += lastAns; break;
            case 'm+': memory += parseFloat(displayCur.textContent!) || 0; return;
            case 'm-': memory -= parseFloat(displayCur.textContent!) || 0; return;
            case 'mr': currentExpr += String(memory); break;
            case 'pi': currentExpr += 'PI'; break;
            case 'e': currentExpr += 'E'; break;
            case 'sin': currentExpr += 'sin('; break;
            case 'cos': currentExpr += 'cos('; break;
            case 'tan': currentExpr += 'tan('; break;
            case 'asin': currentExpr += 'asin('; break;
            case 'acos': currentExpr += 'acos('; break;
            case 'atan': currentExpr += 'atan('; break;
            case 'log': currentExpr += 'log10('; break;
            case 'ln': currentExpr += 'log('; break;
            case 'sqrt': currentExpr += 'sqrt('; break;
            case 'pow': currentExpr += '^'; break;
            case 'pow2': currentExpr += '^2'; break;
            case 'pow3': currentExpr += '^3'; break;
            case 'exp': currentExpr += 'exp('; break;
            case '10x': currentExpr += '10^'; break;
            case 'inv': currentExpr += '1/'; break;
            case 'fact': currentExpr += '!'; break;
            case 'rnd': currentExpr += String(Math.random().toFixed(4)); break;
            case 'sign': 
                if (currentExpr.startsWith('-')) currentExpr = currentExpr.slice(1);
                else currentExpr = '-' + currentExpr;
                break;
            case 'exp_notation': currentExpr += 'E'; break;
            default: currentExpr += val; break;
        }
        displayExp.textContent = currentExpr;
    }

    function evaluate(expr: string, toRad: (x: number) => number, fromRad: (x: number) => number): number {
        // Pre-processing: Standardize tokens
        let s = expr.replace(/PI/g, String(Math.PI))
                    .replace(/E/g, String(Math.E))
                    .replace(/\^/g, '**');
        
        // Define supported functions
        const funcs: Record<string, Function> = {
            'sin': (x: number) => Math.sin(toRad(x)),
            'cos': (x: number) => Math.cos(toRad(x)),
            'tan': (x: number) => Math.tan(toRad(x)),
            'asin': (x: number) => fromRad(Math.asin(x)),
            'acos': (x: number) => fromRad(Math.acos(x)),
            'atan': (x: number) => fromRad(Math.atan(x)),
            'log10': Math.log10,
            'log': Math.log,
            'sqrt': Math.sqrt,
            'exp': Math.exp,
        };

        // Recursive replacement for functions
        const applyFuncs = (input: string): string => {
            let changed = true;
            while(changed) {
                const prev = input;
                for (const f in funcs) {
                    const regex = new RegExp(`${f}\\(([^()]+)\\)`, 'g');
                    input = input.replace(regex, (_, args) => {
                        const val = new Function(`return (${args})`)();
                        return String((funcs[f] as any)(val));
                    });
                }
                changed = prev !== input;
            }
            return input;
        };

        s = applyFuncs(s);

        // Factorial
        s = s.replace(/(\d+)!/g, (_, n) => {
            let res = 1;
            for (let i = 2; i <= parseInt(n); i++) res *= i;
            return String(res);
        });

        const result = new Function(`return (${s})`)();
        return Math.round(result * 1e10) / 1e10;
    }
}
