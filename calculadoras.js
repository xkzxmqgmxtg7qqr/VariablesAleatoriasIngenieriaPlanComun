// Calculadoras Interactivas para Variables Aleatorias
// Incluye visualizaciones con Chart.js

// Variables globales para los gráficos
let chartDiscreta = null;
let chartContinua = null;
let chartEjemplos = null;

// ============================================================
// CALCULADORA DISCRETA
// ============================================================

// Cargar calculadora discreta al inicio
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(cargarCalculadoraDiscretaCompleta, 500);
    setTimeout(cargarCalculadoraContinuaCompleta, 500);
    setTimeout(cargarEjemplosCompletos, 500);
});

function cargarCalculadoraDiscretaCompleta() {
    const container = document.getElementById('calculadora-discreta');
    if (!container) return;
    
    container.innerHTML += `
        <div class="interactive-section">
            <h3>Define tu Variable Aleatoria Discreta</h3>
            <p>Ingresa los valores y sus probabilidades (separa valores con comas)</p>
            
            <div class="grid-2">
                <div class="input-group">
                    <label>Valores de X:</label>
                    <input type="text" id="valores-discretos" placeholder="Ej: 1, 2, 3, 4, 5, 6" value="1, 2, 3, 4, 5, 6">
                    <small>Valores separados por comas</small>
                </div>
                
                <div class="input-group">
                    <label>Probabilidades p(x):</label>
                    <input type="text" id="probs-discretas" placeholder="Ej: 1/6, 1/6, 1/6, 1/6, 1/6, 1/6" value="1/6, 1/6, 1/6, 1/6, 1/6, 1/6">
                    <small>Probabilidades separadas por comas (pueden ser fracciones)</small>
                </div>
            </div>
            
            <div style="text-align: center; margin: 20px 0;">
                <button class="btn btn-success" onclick="calcularDiscreta()">📊 Calcular Propiedades</button>
                <button class="btn btn-warning" onclick="ejemploDiscretoDados()">🎲 Ejemplo: Dos Dados</button>
                <button class="btn btn-warning" onclick="ejemploDiscretoMonedas()">🪙 Ejemplo: Tres Monedas</button>
            </div>
        </div>
        
        <div id="resultado-discreta" style="display:none;"></div>
        <div class="chart-container" style="display:none;" id="chart-discreta-container">
            <canvas id="chart-discreta-pmf"></canvas>
        </div>
    `;
}

function evaluarFraccion(str) {
    // Evalúa expresiones como "1/6", "0.5", etc.
    str = str.trim();
    if (str.includes('/')) {
        const parts = str.split('/');
        return parseFloat(parts[0]) / parseFloat(parts[1]);
    }
    return parseFloat(str);
}

function calcularDiscreta() {
    try {
        // Obtener valores
        const valoresStr = document.getElementById('valores-discretos').value;
        const probsStr = document.getElementById('probs-discretas').value;
        
        const valores = valoresStr.split(',').map(x => parseFloat(x.trim()));
        const probs = probsStr.split(',').map(x => evaluarFraccion(x));
        
        // Validaciones
        if (valores.length !== probs.length) {
            alert('⚠️ El número de valores y probabilidades debe ser igual');
            return;
        }
        
        if (valores.some(isNaN) || probs.some(isNaN)) {
            alert('⚠️ Por favor ingresa valores numéricos válidos');
            return;
        }
        
        if (probs.some(p => p < 0)) {
            alert('⚠️ Las probabilidades no pueden ser negativas');
            return;
        }
        
        const sumaProbs = probs.reduce((a, b) => a + b, 0);
        if (Math.abs(sumaProbs - 1) > 0.001) {
            alert(`⚠️ Las probabilidades deben sumar 1. Suma actual: ${sumaProbs.toFixed(4)}`);
            return;
        }
        
        // Calcular esperanza
        const esperanza = valores.reduce((sum, x, i) => sum + x * probs[i], 0);
        
        // Calcular E[X^2]
        const ex2 = valores.reduce((sum, x, i) => sum + x * x * probs[i], 0);
        
        // Calcular varianza
        const varianza = ex2 - esperanza * esperanza;
        const desviacion = Math.sqrt(varianza);
        
        // Calcular CDF
        const cdf = [];
        let acumulada = 0;
        for (let i = 0; i < valores.length; i++) {
            acumulada += probs[i];
            cdf.push(acumulada);
        }
        
        // Mostrar resultados
        mostrarResultadosDiscretos(valores, probs, cdf, esperanza, varianza, desviacion, ex2);
        
        // Graficar
        graficarDiscreta(valores, probs, cdf);
        
    } catch (error) {
        alert('Error al calcular: ' + error.message);
    }
}

function mostrarResultadosDiscretos(valores, probs, cdf, esperanza, varianza, desviacion, ex2) {
    const resultado = document.getElementById('resultado-discreta');
    
    // Crear tabla de probabilidades
    let tablaHTML = '<table><thead><tr><th>x</th><th>p(x)</th><th>F(x)</th><th>x·p(x)</th><th>x²·p(x)</th></tr></thead><tbody>';
    for (let i = 0; i < valores.length; i++) {
        tablaHTML += `<tr>
            <td>${valores[i]}</td>
            <td>${probs[i].toFixed(4)}</td>
            <td>${cdf[i].toFixed(4)}</td>
            <td>${(valores[i] * probs[i]).toFixed(4)}</td>
            <td>${(valores[i] * valores[i] * probs[i]).toFixed(4)}</td>
        </tr>`;
    }
    tablaHTML += '</tbody></table>';
    
    resultado.innerHTML = `
        <div class="result-box">
            <h3>✅ Resultados Calculados</h3>
            
            <div class="grid-2">
                <div>
                    <h4>📊 Valor Esperado (Media)</h4>
                    <div class="result-value">E[X] = μ = ${esperanza.toFixed(4)}</div>
                    <p>\\[E[X] = \\sum x \\cdot p(x) = ${esperanza.toFixed(4)}\\]</p>
                </div>
                
                <div>
                    <h4>📏 Varianza</h4>
                    <div class="result-value">Var(X) = ${varianza.toFixed(4)}</div>
                    <p>\\[\\sigma^2 = E[X^2] - (E[X])^2\\]</p>
                    <p>\\[= ${ex2.toFixed(4)} - ${(esperanza*esperanza).toFixed(4)} = ${varianza.toFixed(4)}\\]</p>
                </div>
            </div>
            
            <div>
                <h4>📐 Desviación Estándar</h4>
                <div class="result-value">σ = √Var(X) = ${desviacion.toFixed(4)}</div>
            </div>
            
            <h4>📋 Tabla de Distribución</h4>
            ${tablaHTML}
            
            <div class="formula-box">
                <h4>📊 Interpretación</h4>
                <ul>
                    <li><strong>Valor esperado (${esperanza.toFixed(2)}):</strong> En promedio, la variable toma este valor</li>
                    <li><strong>Desviación estándar (${desviacion.toFixed(2)}):</strong> Los valores típicamente se desvían ±${desviacion.toFixed(2)} de la media</li>
                    <li><strong>Rango efectivo:</strong> Aproximadamente [${(esperanza - 2*desviacion).toFixed(2)}, ${(esperanza + 2*desviacion).toFixed(2)}] contiene ~95% de la probabilidad</li>
                </ul>
            </div>
        </div>
    `;
    
    resultado.style.display = 'block';
    
    // Re-renderizar MathJax
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise([resultado]);
    }
}

function graficarDiscreta(valores, probs, cdf) {
    const container = document.getElementById('chart-discreta-container');
    container.style.display = 'block';
    
    // Destruir gráfico anterior si existe
    if (chartDiscreta) {
        chartDiscreta.destroy();
    }
    
    const ctx = document.getElementById('chart-discreta-pmf').getContext('2d');
    
    chartDiscreta = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: valores,
            datasets: [{
                label: 'p(x) - PMF',
                data: probs,
                backgroundColor: 'rgba(155, 89, 182, 0.7)',
                borderColor: 'rgba(155, 89, 182, 1)',
                borderWidth: 2
            }, {
                label: 'F(x) - CDF',
                data: cdf,
                type: 'line',
                stepped: true,
                backgroundColor: 'rgba(231, 76, 60, 0.2)',
                borderColor: 'rgba(231, 76, 60, 1)',
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: 'rgba(231, 76, 60, 1)',
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Función de Probabilidad (PMF) y Distribución Acumulada (CDF)',
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 1.1,
                    title: {
                        display: true,
                        text: 'Probabilidad'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Valores de X'
                    }
                }
            }
        }
    });
}

// Ejemplos predefinidos
function ejemploDiscretoDados() {
    // Suma de dos dados
    document.getElementById('valores-discretos').value = '2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12';
    document.getElementById('probs-discretas').value = '1/36, 2/36, 3/36, 4/36, 5/36, 6/36, 5/36, 4/36, 3/36, 2/36, 1/36';
    calcularDiscreta();
}

function ejemploDiscretoMonedas() {
    // Número de caras en 3 monedas
    document.getElementById('valores-discretos').value = '0, 1, 2, 3';
    document.getElementById('probs-discretas').value = '1/8, 3/8, 3/8, 1/8';
    calcularDiscreta();
}

// ============================================================
// CALCULADORA CONTINUA
// ============================================================

function cargarCalculadoraContinuaCompleta() {
    const container = document.getElementById('calculadora-continua');
    if (!container) return;
    
    container.innerHTML += `
        <div class="interactive-section">
            <h3>Selecciona un Ejemplo de Función de Densidad</h3>
            
            <div class="input-group">
                <label>Tipo de Distribución:</label>
                <select id="tipo-continua" onchange="cargarEjemploContinua()">
                    <option value="uniforme">Uniforme en [a, b]</option>
                    <option value="triangular">Triangular en [0, 1]</option>
                    <option value="exponencial-simple">Exponencial Simple</option>
                    <option value="cuadratica">Cuadrática en [0, 1]</option>
                </select>
            </div>
            
            <div id="parametros-continua"></div>
            
            <div style="text-align: center; margin: 20px 0;">
                <button class="btn btn-success" onclick="calcularContinua()">📈 Calcular y Graficar</button>
            </div>
        </div>
        
        <div id="resultado-continua" style="display:none;"></div>
        <div class="chart-container" style="display:none;" id="chart-continua-container">
            <canvas id="chart-continua-pdf"></canvas>
        </div>
    `;
    
    cargarEjemploContinua();
}

function cargarEjemploContinua() {
    const tipo = document.getElementById('tipo-continua').value;
    const container = document.getElementById('parametros-continua');
    
    let html = '';
    
    switch(tipo) {
        case 'uniforme':
            html = `
                <div class="formula-box">
                    <p><strong>Distribución Uniforme en [a, b]:</strong></p>
                    <p>\\[f(x) = \\begin{cases} \\frac{1}{b-a} & \\text{si } a \\leq x \\leq b \\\\ 0 & \\text{en otro caso} \\end{cases}\\]</p>
                </div>
                <div class="grid-2">
                    <div class="input-group">
                        <label>Límite inferior (a):</label>
                        <input type="number" id="param-a" value="0" step="0.1">
                    </div>
                    <div class="input-group">
                        <label>Límite superior (b):</label>
                        <input type="number" id="param-b" value="10" step="0.1">
                    </div>
                </div>
            `;
            break;
            
        case 'triangular':
            html = `
                <div class="formula-box">
                    <p><strong>Distribución Triangular en [0, 1]:</strong></p>
                    <p>\\[f(x) = \\begin{cases} 2x & \\text{si } 0 \\leq x \\leq 1 \\\\ 0 & \\text{en otro caso} \\end{cases}\\]</p>
                </div>
                <p><em>Esta distribución no tiene parámetros ajustables en este ejemplo.</em></p>
            `;
            break;
            
        case 'exponencial-simple':
            html = `
                <div class="formula-box">
                    <p><strong>Exponencial Decreciente en [0, ∞):</strong></p>
                    <p>\\[f(x) = \\lambda e^{-\\lambda x} \\text{ para } x \\geq 0\\]</p>
                </div>
                <div class="input-group">
                    <label>Parámetro λ (lambda):</label>
                    <input type="number" id="param-lambda" value="1" step="0.1" min="0.1">
                </div>
                <p><small>Graficaremos hasta x = ${(10 / 1).toFixed(1)} (10/λ)</small></p>
            `;
            break;
            
        case 'cuadratica':
            html = `
                <div class="formula-box">
                    <p><strong>Distribución Cuadrática en [0, 1]:</strong></p>
                    <p>\\[f(x) = \\begin{cases} \\frac{3x^2}{1} = 3x^2 & \\text{si } 0 \\leq x \\leq 1 \\\\ 0 & \\text{en otro caso} \\end{cases}\\]</p>
                </div>
                <p><em>Esta distribución no tiene parámetros ajustables en este ejemplo.</em></p>
            `;
            break;
    }
    
    container.innerHTML = html;
    
    // Re-renderizar MathJax
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise([container]);
    }
}

function calcularContinua() {
    const tipo = document.getElementById('tipo-continua').value;
    
    let funcion, inicio, fin, nombre;
    
    switch(tipo) {
        case 'uniforme':
            const a = parseFloat(document.getElementById('param-a').value);
            const b = parseFloat(document.getElementById('param-b').value);
            if (a >= b) {
                alert('⚠️ El límite inferior debe ser menor que el superior');
                return;
            }
            funcion = x => (x >= a && x <= b) ? 1/(b-a) : 0;
            inicio = a - (b-a)*0.2;
            fin = b + (b-a)*0.2;
            nombre = `Uniforme[${a}, ${b}]`;
            break;
            
        case 'triangular':
            funcion = x => (x >= 0 && x <= 1) ? 2*x : 0;
            inicio = -0.2;
            fin = 1.2;
            nombre = 'Triangular[0, 1]';
            break;
            
        case 'exponencial-simple':
            const lambda = parseFloat(document.getElementById('param-lambda').value);
            funcion = x => (x >= 0) ? lambda * Math.exp(-lambda * x) : 0;
            inicio = 0;
            fin = 10 / lambda;
            nombre = `Exponencial(λ=${lambda})`;
            break;
            
        case 'cuadratica':
            funcion = x => (x >= 0 && x <= 1) ? 3*x*x : 0;
            inicio = -0.2;
            fin = 1.2;
            nombre = 'Cuadrática[0, 1]';
            break;
    }
    
    // Calcular propiedades numéricamente
    const resultados = calcularPropiedadesContinua(funcion, inicio, fin);
    mostrarResultadosContinuos(resultados, nombre, tipo);
    graficarContinua(funcion, inicio, fin, nombre);
}

function calcularPropiedadesContinua(f, a, b) {
    // Integración numérica usando regla del trapecio
    const n = 1000;
    const h = (b - a) / n;
    
    // Calcular integral de f(x) (verificar normalización)
    let integral = 0;
    for (let i = 0; i <= n; i++) {
        const x = a + i * h;
        const peso = (i === 0 || i === n) ? 0.5 : 1;
        integral += peso * f(x) * h;
    }
    
    // Calcular E[X]
    let esperanza = 0;
    for (let i = 0; i <= n; i++) {
        const x = a + i * h;
        const peso = (i === 0 || i === n) ? 0.5 : 1;
        esperanza += peso * x * f(x) * h;
    }
    
    // Calcular E[X^2]
    let ex2 = 0;
    for (let i = 0; i <= n; i++) {
        const x = a + i * h;
        const peso = (i === 0 || i === n) ? 0.5 : 1;
        ex2 += peso * x * x * f(x) * h;
    }
    
    const varianza = ex2 - esperanza * esperanza;
    const desviacion = Math.sqrt(varianza);
    
    return {
        integral: integral,
        esperanza: esperanza,
        varianza: varianza,
        desviacion: desviacion,
        ex2: ex2
    };
}

function mostrarResultadosContinuos(resultados, nombre, tipo) {
    const resultado = document.getElementById('resultado-continua');
    
    // Valores teóricos para comparación
    let teoriaHTML = '';
    if (tipo === 'uniforme') {
        const a = parseFloat(document.getElementById('param-a').value);
        const b = parseFloat(document.getElementById('param-b').value);
        const mediaT = (a + b) / 2;
        const varT = Math.pow(b - a, 2) / 12;
        teoriaHTML = `
            <div class="example-box">
                <h4>📚 Valores Teóricos (Fórmulas exactas):</h4>
                <p>\\[E[X] = \\frac{a+b}{2} = \\frac{${a}+${b}}{2} = ${mediaT.toFixed(4)}\\]</p>
                <p>\\[Var(X) = \\frac{(b-a)^2}{12} = \\frac{${(b-a).toFixed(2)}^2}{12} = ${varT.toFixed(4)}\\]</p>
                <p><small>Compara estos valores con los calculados numéricamente arriba</small></p>
            </div>
        `;
    } else if (tipo === 'triangular') {
        teoriaHTML = `
            <div class="example-box">
                <h4>📚 Valores Teóricos:</h4>
                <p>\\[E[X] = \\int_0^1 x \\cdot 2x\\, dx = \\int_0^1 2x^2\\, dx = \\frac{2}{3} \\approx 0.6667\\]</p>
                <p>\\[Var(X) = E[X^2] - (E[X])^2 = \\frac{1}{2} - \\frac{4}{9} = \\frac{1}{18} \\approx 0.0556\\]</p>
            </div>
        `;
    }
    
    resultado.innerHTML = `
        <div class="result-box">
            <h3>✅ Resultados para ${nombre}</h3>
            
            <div class="formula-box">
                <h4>✓ Verificación de Normalización</h4>
                <p>\\[\\int_{-\\infty}^{\\infty} f(x)\\, dx = ${resultados.integral.toFixed(4)}\\]</p>
                ${Math.abs(resultados.integral - 1) < 0.01 ? 
                    '<p style="color: green;">✓ La función está correctamente normalizada</p>' :
                    '<p style="color: orange;">⚠️ La función no está perfectamente normalizada (error numérico o definición incorrecta)</p>'}
            </div>
            
            <div class="grid-2">
                <div>
                    <h4>📊 Valor Esperado (Media)</h4>
                    <div class="result-value">E[X] = ${resultados.esperanza.toFixed(4)}</div>
                    <p>\\[E[X] = \\int x \\cdot f(x)\\, dx\\]</p>
                </div>
                
                <div>
                    <h4>📏 Varianza</h4>
                    <div class="result-value">Var(X) = ${resultados.varianza.toFixed(4)}</div>
                    <p>\\[Var(X) = E[X^2] - (E[X])^2\\]</p>
                </div>
            </div>
            
            <div>
                <h4>📐 Desviación Estándar</h4>
                <div class="result-value">σ = ${resultados.desviacion.toFixed(4)}</div>
            </div>
            
            ${teoriaHTML}
            
            <div class="continuous-box">
                <h4>📈 Interpretación</h4>
                <ul>
                    <li><strong>Centro de la distribución:</strong> La media está en x = ${resultados.esperanza.toFixed(2)}</li>
                    <li><strong>Dispersión:</strong> Los valores típicamente se encuentran en el rango [${(resultados.esperanza - resultados.desviacion).toFixed(2)}, ${(resultados.esperanza + resultados.desviacion).toFixed(2)}]</li>
                    <li><strong>Recuerda:</strong> P(X = ${resultados.esperanza.toFixed(2)}) = 0 (probabilidad de un punto exacto es cero)</li>
                </ul>
            </div>
        </div>
    `;
    
    resultado.style.display = 'block';
    
    // Re-renderizar MathJax
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise([resultado]);
    }
}

function graficarContinua(f, inicio, fin, nombre) {
    const container = document.getElementById('chart-continua-container');
    container.style.display = 'block';
    
    // Destruir gráfico anterior
    if (chartContinua) {
        chartContinua.destroy();
    }
    
    // Generar puntos para el gráfico
    const n = 200;
    const labels = [];
    const dataPDF = [];
    const dataCDF = [];
    
    let cdfAcumulada = 0;
    const h = (fin - inicio) / n;
    
    for (let i = 0; i <= n; i++) {
        const x = inicio + i * h;
        labels.push(x.toFixed(2));
        dataPDF.push(f(x));
        
        // Calcular CDF aproximada
        if (i > 0) {
            cdfAcumulada += (f(x) + f(inicio + (i-1)*h)) * h / 2;
        }
        dataCDF.push(Math.min(cdfAcumulada, 1));
    }
    
    const ctx = document.getElementById('chart-continua-pdf').getContext('2d');
    
    chartContinua = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'f(x) - PDF',
                data: dataPDF,
                borderColor: 'rgba(22, 160, 133, 1)',
                backgroundColor: 'rgba(22, 160, 133, 0.2)',
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 0
            }, {
                label: 'F(x) - CDF',
                data: dataCDF,
                borderColor: 'rgba(231, 76, 60, 1)',
                backgroundColor: 'rgba(231, 76, 60, 0.1)',
                borderWidth: 3,
                fill: false,
                tension: 0.4,
                pointRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: `Función de Densidad (PDF) y Distribución Acumulada (CDF) - ${nombre}`,
                    font: { size: 16, weight: 'bold' }
                },
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'f(x) / F(x)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'x'
                    },
                    ticks: {
                        maxTicksLimit: 15
                    }
                }
            }
        }
    });
}

// ============================================================
// EJEMPLOS INTERACTIVOS
// ============================================================

function cargarEjemplosCompletos() {
    const container = document.getElementById('ejemplos');
    if (!container) return;
    
    container.innerHTML += `
        <h3>📚 Ejemplos Comparativos</h3>
        
        <div class="grid-2">
            <div class="discrete-box">
                <h4>🎲 Ejemplo Discreto: Calificaciones</h4>
                <p>En un curso, las calificaciones posibles son 1, 2, 3, 4, 5, 6, 7 con las siguientes probabilidades:</p>
                <ul>
                    <li>p(4) = 0.05 (Insuficiente)</li>
                    <li>p(5) = 0.15 (Suficiente)</li>
                    <li>p(6) = 0.30 (Bueno)</li>
                    <li>p(7) = 0.35 (Muy Bueno)</li>
                    <li>p(8) = 0.15 (Excelente)</li>
                </ul>
                <button class="btn" onclick="ejemploCalificaciones()">Ver Análisis</button>
            </div>
            
            <div class="continuous-box">
                <h4>⏱️ Ejemplo Continuo: Tiempo de Espera</h4>
                <p>El tiempo de espera (en minutos) en una fila sigue una distribución con densidad:</p>
                <p>\\[f(t) = 0.5 e^{-0.5t} \\text{ para } t \\geq 0\\]</p>
                <p>Esta es una distribución exponencial con λ = 0.5</p>
                <button class="btn" onclick="ejemploTiempoEspera()">Ver Análisis</button>
            </div>
        </div>
        
        <div id="resultado-ejemplos" style="display:none;"></div>
    `;
    
    // Re-renderizar MathJax
    if (typeof MathJax !== 'undefined') {
        MathJax.typesetPromise([container]);
    }
}

function ejemploCalificaciones() {
    // Cambiar a tab de calculadora discreta y cargar ejemplo
    const tabs = document.getElementsByClassName('tab-button');
    for (let btn of tabs) {
        if (btn.textContent.includes('Calc. Discreta')) {
            btn.click();
            break;
        }
    }
    
    setTimeout(() => {
        document.getElementById('valores-discretos').value = '4, 5, 6, 7, 8';
        document.getElementById('probs-discretas').value = '0.05, 0.15, 0.30, 0.35, 0.15';
        calcularDiscreta();
    }, 300);
}

function ejemploTiempoEspera() {
    // Cambiar a tab de calculadora continua y cargar ejemplo
    const tabs = document.getElementsByClassName('tab-button');
    for (let btn of tabs) {
        if (btn.textContent.includes('Calc. Continua')) {
            btn.click();
            break;
        }
    }
    
    setTimeout(() => {
        document.getElementById('tipo-continua').value = 'exponencial-simple';
        cargarEjemploContinua();
        setTimeout(() => {
            document.getElementById('param-lambda').value = '0.5';
            calcularContinua();
        }, 200);
    }, 300);
}

