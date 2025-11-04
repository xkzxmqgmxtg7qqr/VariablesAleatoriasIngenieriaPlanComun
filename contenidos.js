// Contenidos para Variables Aleatorias

function cargarContenidos() {
    cargarIntroduccion();
    cargarDiscretas();
    cargarContinuas();
    cargarComparacion();
    cargarCalculadoraDiscreta();
    cargarCalculadoraContinua();
    cargarEjemplos();
}

// ============================================================
// INTRODUCCIÓN
// ============================================================
function cargarIntroduccion() {
    document.getElementById('introduccion').innerHTML = `
        <div class="card">
            <h2>📚 Introducción a Variables Aleatorias</h2>
            
            <h3>🎯 Concepto Fundamental</h3>
            <div class="definition-box">
                <h4>Definición: Variable Aleatoria</h4>
                <p>Una <strong>variable aleatoria</strong> es una función que asigna un valor numérico a cada resultado de un experimento aleatorio.</p>
                <p>Matemáticamente: \\(X: \\Omega \\rightarrow \\mathbb{R}\\)</p>
                <p>Donde \\(\\Omega\\) es el espacio muestral y \\(\\mathbb{R}\\) es el conjunto de números reales.</p>
            </div>
            
            <h3>📊 Tipos de Variables Aleatorias</h3>
            
            <div class="grid-2">
                <div class="discrete-box">
                    <h4><span class="badge-discrete">Discreta</span> Variable Aleatoria Discreta</h4>
                    <p><strong>Definición:</strong> Una variable aleatoria \\(X\\) es discreta si puede tomar un conjunto numerable (finito o infinito contable) de valores.</p>
                    <p><strong>Ejemplos:</strong></p>
                    <ul>
                        <li>Número de caras al lanzar una moneda 10 veces</li>
                        <li>Número de clientes que llegan en una hora</li>
                        <li>Número de defectos en un producto</li>
                        <li>Resultado de lanzar un dado</li>
                    </ul>
                </div>
                
                <div class="continuous-box">
                    <h4><span class="badge-continuous">Continua</span> Variable Aleatoria Continua</h4>
                    <p><strong>Definición:</strong> Una variable aleatoria \\(X\\) es continua si puede tomar cualquier valor en un intervalo de números reales.</p>
                    <p><strong>Ejemplos:</strong></p>
                    <ul>
                        <li>Tiempo de espera hasta un evento</li>
                        <li>Altura o peso de una persona</li>
                        <li>Temperatura en un momento dado</li>
                        <li>Distancia recorrida por un vehículo</li>
                    </ul>
                </div>
            </div>
            
            <h3>🔑 Diferencia Fundamental</h3>
            <div class="warning-box">
                <h4>⚠️ Distinción Clave</h4>
                <p><strong>Discretas:</strong> Se pueden <em>contar</em> (1, 2, 3, ...)</p>
                <p><strong>Continuas:</strong> Se pueden <em>medir</em> (cualquier valor en un rango)</p>
                <p><strong>Implicación:</strong> Esto determina cómo describimos sus probabilidades:</p>
                <ul>
                    <li><strong>Discretas</strong> → Función de Probabilidad (PMF)</li>
                    <li><strong>Continuas</strong> → Función de Densidad (PDF)</li>
                </ul>
            </div>
            
            <h3>📐 Notación Estándar</h3>
            <table>
                <thead>
                    <tr>
                        <th>Concepto</th>
                        <th>Discreta</th>
                        <th>Continua</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Variable</strong></td>
                        <td>\\(X\\) (mayúscula)</td>
                        <td>\\(X\\) (mayúscula)</td>
                    </tr>
                    <tr>
                        <td><strong>Valores</strong></td>
                        <td>\\(x_1, x_2, x_3, ...\\)</td>
                        <td>\\(x \\in [a, b]\\)</td>
                    </tr>
                    <tr>
                        <td><strong>Función Principal</strong></td>
                        <td>PMF: \\(p(x) = P(X = x)\\)</td>
                        <td>PDF: \\(f(x)\\)</td>
                    </tr>
                    <tr>
                        <td><strong>Probabilidad</strong></td>
                        <td>\\(P(X = x_i)\\)</td>
                        <td>\\(P(a \\leq X \\leq b) = \\int_a^b f(x)dx\\)</td>
                    </tr>
                    <tr>
                        <td><strong>CDF</strong></td>
                        <td>\\(F(x) = \\sum_{x_i \\leq x} p(x_i)\\)</td>
                        <td>\\(F(x) = \\int_{-\\infty}^x f(t)dt\\)</td>
                    </tr>
                </tbody>
            </table>
            
            <h3>🎓 Objetivo de este Recurso</h3>
            <div class="example-box">
                <p>En este recurso interactivo aprenderás a:</p>
                <ol>
                    <li><strong>Comprender</strong> la naturaleza de las variables aleatorias discretas y continuas</li>
                    <li><strong>Trabajar</strong> con funciones de probabilidad (PMF) y densidad (PDF)</li>
                    <li><strong>Calcular</strong> probabilidades, valores esperados y varianzas</li>
                    <li><strong>Visualizar</strong> gráficamente el comportamiento de estas variables</li>
                    <li><strong>Aplicar</strong> conceptos a problemas prácticos</li>
                </ol>
            </div>
        </div>
    `;
}

// ============================================================
// VARIABLES ALEATORIAS DISCRETAS
// ============================================================
function cargarDiscretas() {
    document.getElementById('discretas').innerHTML = `
        <div class="card">
            <h2>🎲 Variables Aleatorias Discretas</h2>
            
            <h3>📊 Función de Probabilidad (PMF)</h3>
            <div class="definition-box">
                <h4>Definición: Función de Masa de Probabilidad (PMF)</h4>
                <p>Para una variable aleatoria discreta \\(X\\), la función de probabilidad es:</p>
                <p>\\[p(x) = P(X = x)\\]</p>
                <p>que asigna a cada valor posible \\(x\\) su probabilidad de ocurrencia.</p>
            </div>
            
            <h3>✅ Propiedades de la PMF</h3>
            <div class="formula-box">
                <p><strong>Para que \\(p(x)\\) sea una función de probabilidad válida, debe cumplir:</strong></p>
                <ol>
                    <li><strong>No negatividad:</strong> \\(p(x) \\geq 0\\) para todo \\(x\\)</li>
                    <li><strong>Normalización:</strong> \\(\\displaystyle\\sum_{\\text{todos los } x} p(x) = 1\\)</li>
                </ol>
                <p><strong>Interpretación:</strong> Las probabilidades no pueden ser negativas y deben sumar 1 (certeza total).</p>
            </div>
            
            <h3>📈 Función de Distribución Acumulada (CDF)</h3>
            <div class="discrete-box">
                <h4>CDF para Variable Discreta</h4>
                <p>\\[F(x) = P(X \\leq x) = \\sum_{x_i \\leq x} p(x_i)\\]</p>
                <p><strong>Interpretación:</strong> \\(F(x)\\) da la probabilidad de que la variable tome un valor menor o igual a \\(x\\).</p>
                <p><strong>Propiedades:</strong></p>
                <ul>
                    <li>\\(0 \\leq F(x) \\leq 1\\) para todo \\(x\\)</li>
                    <li>\\(F(x)\\) es no decreciente</li>
                    <li>\\(\\lim_{x \\to -\\infty} F(x) = 0\\) y \\(\\lim_{x \\to \\infty} F(x) = 1\\)</li>
                    <li>Es una función escalonada (salta en cada valor con probabilidad positiva)</li>
                </ul>
            </div>
            
            <h3>📊 Valor Esperado</h3>
            <div class="formula-box">
                <h4>Esperanza Matemática (Media)</h4>
                <p>\\[E[X] = \\mu = \\sum_{\\text{todos los } x} x \\cdot p(x)\\]</p>
                <p><strong>Interpretación:</strong> El valor esperado es el promedio ponderado de todos los valores posibles, donde los pesos son sus probabilidades.</p>
                <p><strong>Propiedades:</strong></p>
                <ul>
                    <li>\\(E[aX + b] = aE[X] + b\\) (linealidad)</li>
                    <li>\\(E[X + Y] = E[X] + E[Y]\\) (aditividad)</li>
                </ul>
            </div>
            
            <h3>📏 Varianza y Desviación Estándar</h3>
            <div class="formula-box">
                <h4>Varianza</h4>
                <p>\\[Var(X) = \\sigma^2 = E[(X - \\mu)^2] = \\sum_{\\text{todos los } x} (x - \\mu)^2 \\cdot p(x)\\]</p>
                <p><strong>Fórmula alternativa (más práctica):</strong></p>
                <p>\\[Var(X) = E[X^2] - (E[X])^2 = \\sum_{\\text{todos los } x} x^2 \\cdot p(x) - \\mu^2\\]</p>
                
                <h4>Desviación Estándar</h4>
                <p>\\[\\sigma = \\sqrt{Var(X)}\\]</p>
                <p><strong>Interpretación:</strong> La varianza mide la dispersión de los valores alrededor de la media.</p>
            </div>
            
            <h3>💡 Ejemplo Conceptual</h3>
            <div class="example-box">
                <h4>Lanzamiento de Dos Dados</h4>
                <p>Sea \\(X\\) = suma de dos dados. Entonces:</p>
                <ul>
                    <li><strong>Espacio de valores:</strong> \\(X \\in \\{2, 3, 4, ..., 12\\}\\)</li>
                    <li><strong>PMF:</strong> 
                        <ul>
                            <li>\\(p(2) = 1/36\\) (solo 1+1)</li>
                            <li>\\(p(3) = 2/36\\) (1+2 o 2+1)</li>
                            <li>\\(p(7) = 6/36 = 1/6\\) (valor más probable)</li>
                            <li>... y así sucesivamente</li>
                        </ul>
                    </li>
                    <li><strong>Verificación:</strong> \\(\\sum_{x=2}^{12} p(x) = 1\\) ✓</li>
                    <li><strong>Valor esperado:</strong> \\(E[X] = 7\\)</li>
                    <li><strong>Varianza:</strong> \\(Var(X) \\approx 5.83\\)</li>
                </ul>
            </div>
            
            <h3>📊 Representación Gráfica</h3>
            <div class="discrete-box">
                <p><strong>Gráfico de Barras (PMF):</strong> Cada valor de \\(x\\) se representa con una barra cuya altura es \\(p(x)\\)</p>
                <p><strong>Gráfico Escalonado (CDF):</strong> Función que sube en escalones en cada valor con probabilidad positiva</p>
            </div>
        </div>
    `;
}

// ============================================================
// VARIABLES ALEATORIAS CONTINUAS
// ============================================================
function cargarContinuas() {
    document.getElementById('continuas').innerHTML = `
        <div class="card">
            <h2>📈 Variables Aleatorias Continuas</h2>
            
            <h3>📊 Función de Densidad de Probabilidad (PDF)</h3>
            <div class="definition-box">
                <h4>Definición: Función de Densidad (PDF)</h4>
                <p>Para una variable aleatoria continua \\(X\\), la función de densidad \\(f(x)\\) satisface:</p>
                <p>\\[P(a \\leq X \\leq b) = \\int_a^b f(x) dx\\]</p>
                <p><strong>⚠️ IMPORTANTE:</strong> \\(f(x)\\) NO es una probabilidad. Es una <em>densidad</em> de probabilidad.</p>
            </div>
            
            <div class="warning-box">
                <h4>⚠️ Diferencia Crucial con Variables Discretas</h4>
                <p>En variables continuas:</p>
                <ul>
                    <li>\\(P(X = x) = 0\\) para cualquier valor específico \\(x\\)</li>
                    <li>Solo tiene sentido hablar de probabilidades en <strong>intervalos</strong></li>
                    <li>\\(f(x)\\) puede ser mayor que 1 (¡no es una probabilidad!)</li>
                    <li>El área bajo \\(f(x)\\) en un intervalo es la probabilidad</li>
                </ul>
            </div>
            
            <h3>✅ Propiedades de la PDF</h3>
            <div class="formula-box">
                <p><strong>Para que \\(f(x)\\) sea una función de densidad válida, debe cumplir:</strong></p>
                <ol>
                    <li><strong>No negatividad:</strong> \\(f(x) \\geq 0\\) para todo \\(x\\)</li>
                    <li><strong>Normalización:</strong> \\(\\displaystyle\\int_{-\\infty}^{\\infty} f(x) dx = 1\\)</li>
                </ol>
                <p><strong>Interpretación:</strong> El área total bajo la curva debe ser 1 (certeza total).</p>
            </div>
            
            <h3>📈 Función de Distribución Acumulada (CDF)</h3>
            <div class="continuous-box">
                <h4>CDF para Variable Continua</h4>
                <p>\\[F(x) = P(X \\leq x) = \\int_{-\\infty}^x f(t) dt\\]</p>
                <p><strong>Relación inversa:</strong></p>
                <p>\\[f(x) = \\frac{d}{dx} F(x)\\]</p>
                <p>Es decir, la PDF es la derivada de la CDF.</p>
                <p><strong>Propiedades:</strong></p>
                <ul>
                    <li>\\(0 \\leq F(x) \\leq 1\\) para todo \\(x\\)</li>
                    <li>\\(F(x)\\) es no decreciente</li>
                    <li>\\(F(x)\\) es continua (no tiene saltos)</li>
                    <li>\\(\\lim_{x \\to -\\infty} F(x) = 0\\) y \\(\\lim_{x \\to \\infty} F(x) = 1\\)</li>
                </ul>
            </div>
            
            <h3>📊 Valor Esperado</h3>
            <div class="formula-box">
                <h4>Esperanza Matemática (Media)</h4>
                <p>\\[E[X] = \\mu = \\int_{-\\infty}^{\\infty} x \\cdot f(x) dx\\]</p>
                <p><strong>Interpretación:</strong> El "centro de masa" de la distribución de probabilidad.</p>
                <p><strong>Para una función de X:</strong></p>
                <p>\\[E[g(X)] = \\int_{-\\infty}^{\\infty} g(x) \\cdot f(x) dx\\]</p>
            </div>
            
            <h3>📏 Varianza y Desviación Estándar</h3>
            <div class="formula-box">
                <h4>Varianza</h4>
                <p>\\[Var(X) = \\sigma^2 = E[(X - \\mu)^2] = \\int_{-\\infty}^{\\infty} (x - \\mu)^2 \\cdot f(x) dx\\]</p>
                <p><strong>Fórmula alternativa:</strong></p>
                <p>\\[Var(X) = E[X^2] - (E[X])^2 = \\int_{-\\infty}^{\\infty} x^2 \\cdot f(x) dx - \\mu^2\\]</p>
                
                <h4>Desviación Estándar</h4>
                <p>\\[\\sigma = \\sqrt{Var(X)}\\]</p>
            </div>
            
            <h3>💡 Ejemplo Conceptual: Distribución Uniforme</h3>
            <div class="example-box">
                <h4>Variable Uniforme en [a, b]</h4>
                <p>\\[f(x) = \\begin{cases}
                    \\frac{1}{b-a} & \\text{si } a \\leq x \\leq b \\\\
                    0 & \\text{en otro caso}
                \\end{cases}\\]</p>
                
                <p><strong>Propiedades:</strong></p>
                <ul>
                    <li><strong>PDF:</strong> Constante en el intervalo [a,b]</li>
                    <li><strong>CDF:</strong> 
                        \\[F(x) = \\begin{cases}
                            0 & \\text{si } x < a \\\\
                            \\frac{x-a}{b-a} & \\text{si } a \\leq x \\leq b \\\\
                            1 & \\text{si } x > b
                        \\end{cases}\\]
                    </li>
                    <li><strong>Media:</strong> \\(E[X] = \\frac{a+b}{2}\\)</li>
                    <li><strong>Varianza:</strong> \\(Var(X) = \\frac{(b-a)^2}{12}\\)</li>
                </ul>
                
                <p><strong>Interpretación:</strong> Todos los valores en [a,b] son igualmente probables.</p>
            </div>
            
            <h3>💡 Ejemplo: Distribución Triangular</h3>
            <div class="example-box">
                <h4>Distribución Triangular en [0, 1]</h4>
                <p>\\[f(x) = \\begin{cases}
                    2x & \\text{si } 0 \\leq x \\leq 1 \\\\
                    0 & \\text{en otro caso}
                \\end{cases}\\]</p>
                
                <p><strong>Verificación de normalización:</strong></p>
                <p>\\[\\int_0^1 2x\\, dx = [x^2]_0^1 = 1 - 0 = 1\\] ✓</p>
                
                <p><strong>Media:</strong></p>
                <p>\\[E[X] = \\int_0^1 x \\cdot 2x\\, dx = \\int_0^1 2x^2\\, dx = \\left[\\frac{2x^3}{3}\\right]_0^1 = \\frac{2}{3}\\]</p>
            </div>
            
            <h3>📊 Representación Gráfica</h3>
            <div class="continuous-box">
                <p><strong>Gráfico de Curva (PDF):</strong> La función \\(f(x)\\) se representa como una curva continua</p>
                <p><strong>Área = Probabilidad:</strong> El área bajo la curva entre dos puntos es la probabilidad</p>
                <p><strong>Gráfico Suave (CDF):</strong> Función continua y no decreciente</p>
            </div>
        </div>
    `;
}

// ============================================================
// COMPARACIÓN
// ============================================================
function cargarComparacion() {
    document.getElementById('comparacion').innerHTML = `
        <div class="card">
            <h2>⚖️ Comparación: Discretas vs Continuas</h2>
            
            <h3>📊 Tabla Comparativa</h3>
            <table>
                <thead>
                    <tr>
                        <th>Aspecto</th>
                        <th><span class="badge-discrete">Discreta</span></th>
                        <th><span class="badge-continuous">Continua</span></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Valores posibles</strong></td>
                        <td>Contables (finitos o infinito numerable)</td>
                        <td>No contables (cualquier valor en un intervalo)</td>
                    </tr>
                    <tr>
                        <td><strong>Función principal</strong></td>
                        <td>PMF: \\(p(x) = P(X = x)\\)</td>
                        <td>PDF: \\(f(x)\\) (NO es probabilidad)</td>
                    </tr>
                    <tr>
                        <td><strong>Probabilidad de un punto</strong></td>
                        <td>\\(P(X = x) = p(x)\\) puede ser > 0</td>
                        <td>\\(P(X = x) = 0\\) siempre</td>
                    </tr>
                    <tr>
                        <td><strong>Probabilidad en intervalo</strong></td>
                        <td>\\(P(a \\leq X \\leq b) = \\sum_{a \\leq x_i \\leq b} p(x_i)\\)</td>
                        <td>\\(P(a \\leq X \\leq b) = \\int_a^b f(x)dx\\)</td>
                    </tr>
                    <tr>
                        <td><strong>CDF</strong></td>
                        <td>\\(F(x) = \\sum_{x_i \\leq x} p(x_i)\\)</td>
                        <td>\\(F(x) = \\int_{-\\infty}^x f(t)dt\\)</td>
                    </tr>
                    <tr>
                        <td><strong>Tipo de CDF</strong></td>
                        <td>Escalonada (con saltos)</td>
                        <td>Continua (suave)</td>
                    </tr>
                    <tr>
                        <td><strong>Normalización</strong></td>
                        <td>\\(\\sum_x p(x) = 1\\)</td>
                        <td>\\(\\int_{-\\infty}^{\\infty} f(x)dx = 1\\)</td>
                    </tr>
                    <tr>
                        <td><strong>Valor esperado</strong></td>
                        <td>\\(E[X] = \\sum_x x \\cdot p(x)\\)</td>
                        <td>\\(E[X] = \\int_{-\\infty}^{\\infty} x \\cdot f(x)dx\\)</td>
                    </tr>
                    <tr>
                        <td><strong>Varianza</strong></td>
                        <td>\\(Var(X) = \\sum_x (x-\\mu)^2 \\cdot p(x)\\)</td>
                        <td>\\(Var(X) = \\int_{-\\infty}^{\\infty} (x-\\mu)^2 \\cdot f(x)dx\\)</td>
                    </tr>
                    <tr>
                        <td><strong>Gráfico</strong></td>
                        <td>Barras o puntos</td>
                        <td>Curva continua</td>
                    </tr>
                    <tr>
                        <td><strong>Ejemplos típicos</strong></td>
                        <td>Conteos, número de eventos</td>
                        <td>Mediciones, tiempos, distancias</td>
                    </tr>
                </tbody>
            </table>
            
            <h3>🔄 Analogía Suma ↔ Integral</h3>
            <div class="formula-box">
                <p>La relación entre variables discretas y continuas es análoga a la relación entre sumas e integrales:</p>
                <div class="grid-2">
                    <div class="discrete-box">
                        <h4>Discreta (Suma)</h4>
                        <p>\\[\\sum_{i=1}^n x_i\\]</p>
                        <p>Suma finita o infinita numerable de valores</p>
                    </div>
                    <div class="continuous-box">
                        <h4>Continua (Integral)</h4>
                        <p>\\[\\int_a^b x\\, dx\\]</p>
                        <p>Suma "continua" sobre un intervalo</p>
                    </div>
                </div>
                <p><strong>Conexión:</strong> La integral es el límite de una suma cuando el número de términos tiende a infinito y el espaciado tiende a cero.</p>
            </div>
            
            <h3>⚠️ Errores Comunes</h3>
            <div class="warning-box">
                <h4>Conceptos que se confunden frecuentemente:</h4>
                <ol>
                    <li><strong>PDF ≠ Probabilidad:</strong> En variables continuas, \\(f(x)\\) puede ser mayor que 1. Solo el área bajo la curva es probabilidad.</li>
                    <li><strong>\\(P(X = x) = 0\\) en continuas:</strong> Esto NO significa que sea imposible, solo que la probabilidad de un punto exacto es cero.</li>
                    <li><strong>Intervalos cerrados vs abiertos:</strong> En continuas, \\(P(a \\leq X \\leq b) = P(a < X < b)\\) porque \\(P(X = a) = P(X = b) = 0\\)</li>
                    <li><strong>PMF vs PDF:</strong> La PMF da probabilidades directamente, la PDF necesita integrarse.</li>
                </ol>
            </div>
            
            <h3>💡 Ejemplo Ilustrativo</h3>
            <div class="example-box">
                <h4>Analogía: Personas en una fila</h4>
                <p><strong>Discreta:</strong> Contar el número de personas en una fila</p>
                <ul>
                    <li>Valores: 0, 1, 2, 3, ... personas</li>
                    <li>Pregunta válida: "¿Cuál es la probabilidad de que haya exactamente 5 personas?"</li>
                </ul>
                
                <p><strong>Continua:</strong> Medir la altura de una persona seleccionada</p>
                <ul>
                    <li>Valores: Cualquier número real positivo (en metros)</li>
                    <li>Pregunta SIN sentido: "¿Cuál es la probabilidad de que mida exactamente 1.75000000... metros?"</li>
                    <li>Pregunta válida: "¿Cuál es la probabilidad de que mida entre 1.70 y 1.80 metros?"</li>
                </ul>
            </div>
            
            <h3>🎯 Cuándo Usar Cada Tipo</h3>
            <div class="grid-2">
                <div class="discrete-box">
                    <h4>Usar Variable Discreta cuando:</h4>
                    <ul>
                        <li>Puedes contar los resultados</li>
                        <li>Los valores son enteros</li>
                        <li>Hay saltos entre valores posibles</li>
                        <li>Ejemplos: número de hijos, intentos hasta éxito, defectos en producción</li>
                    </ul>
                </div>
                <div class="continuous-box">
                    <h4>Usar Variable Continua cuando:</h4>
                    <ul>
                        <li>Estás midiendo algo</li>
                        <li>Los valores pueden ser decimales arbitrarios</li>
                        <li>Hay infinitos valores en cualquier intervalo</li>
                        <li>Ejemplos: tiempo, temperatura, peso, distancia</li>
                    </ul>
                </div>
            </div>
        </div>
    `;
}

// Las funciones de calculadoras y ejemplos se cargan en calculadoras.js
function cargarCalculadoraDiscreta() {
    document.getElementById('calculadora-discreta').innerHTML = `
        <div class="card">
            <h2>🧮 Calculadora de Variables Discretas</h2>
            <p>Define tu propia función de probabilidad y calcula propiedades</p>
            <!-- Content will be added by calculadoras.js -->
        </div>
    `;
}

function cargarCalculadoraContinua() {
    document.getElementById('calculadora-continua').innerHTML = `
        <div class="card">
            <h2>📐 Calculadora de Variables Continuas</h2>
            <p>Define tu propia función de densidad y calcula propiedades</p>
            <!-- Content will be added by calculadoras.js -->
        </div>
    `;
}

function cargarEjemplos() {
    document.getElementById('ejemplos').innerHTML = `
        <div class="card">
            <h2>💡 Ejemplos Interactivos</h2>
            <p>Explora ejemplos prácticos de ambos tipos de variables</p>
            <!-- Content will be added by calculadoras.js -->
        </div>
    `;
}

