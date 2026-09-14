// ==========================================
// ARCHIVO: utils.js
// FUNCIONES AUXILIARES - Juego Atrapar Limones
// ==========================================
// Este archivo contiene funciones reutilizables que el juego necesita
// Se carga ANTES de limones.js en el HTML

// ==========================================
// FUNCIÓN: Generar número aleatorio
// ==========================================
// Genera un número ENTERO aleatorio entre dos valores (inclusivos)
// Parámetros:
//   min = valor mínimo (el número más bajo que puede salir)
//   max = valor máximo (el número más alto que puede salir)
// Retorna: Un número entero aleatorio entre min y max
// Ejemplo: generarAleatorio(0, 100) devuelve un número entre 0 y 100

// ¿POR QUÉ EXISTE?
// Se usa para posicionar el limón en coordenadas X aleatorias
// Ejemplo: generarAleatorio(0, canvas.width - ANCHO_LIMON)
//   Devuelve una posición X aleatoria donde el limón siempre está dentro del canvas
function generarAleatorio(min, max){
    // Math.random() devuelve un número decimal entre 0 y 1 (ej: 0.4532)
    let random = Math.random();  // 0 a 1

    // Expandir el rango: multiplicar por (max - min + 1)
    let numero = random * (max - min + 1);  // Ahora es entre 0 y (max-min+1)

    // Math.ceil redondea hacia arriba (ej: 3.2 se convierte en 4)
    let numeroEntero = Math.ceil(numero);

    // Sumar min para desplazar el rango al intervalo [min, max]
    numeroEntero = numeroEntero + min;

    // VERSIÓN OPTIMIZADA: La línea más abajo hace lo mismo en una sola línea
    // (que es más eficiente)
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ==========================================
// FUNCIÓN: Mostrar valor en un elemento HTML
// ==========================================
// Cambia el contenido de texto de un elemento HTML según su ID
// Parámetros:
//   idSpan = el ID del elemento HTML que queremos modificar (debe ser único)
//   valor = el nuevo número que queremos mostrar
// Ejemplo: mostrarEnSpan("txtPuntaje", 5)
//   Busca el elemento con id="txtPuntaje" y cambia su contenido a "5"

// ¿POR QUÉ EXISTE?
// Se usa para actualizar el puntaje y las vidas en la pantalla
// Sin esta función, habría que escribir código más largo cada vez
function mostrarEnSpan(idSpan, valor) {
    // document.getElementById(idSpan) encuentra el elemento HTML con ese ID
    let componente = document.getElementById(idSpan);
    // .textContent = cambia el contenido de texto del elemento
    // Ejemplo: si idSpan es "txtPuntaje" y valor es 5,
    // el HTML cambiará de <span id="txtPuntaje">0</span>
    // a <span id="txtPuntaje">5</span>
    componente.textContent = valor;
}
