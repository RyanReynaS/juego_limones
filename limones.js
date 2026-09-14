// ==========================================
// ARCHIVO: limones.js
// JUEGO: Atrapar Limones del Cielo
// ==========================================
// Este archivo contiene toda la lógica del juego donde el jugador
// debe atrapar limones que caen usando un personaje que se mueve
// horizontalmente. Tienes 3 vidas y debes atrapar 10 limones para ganar.

// ==========================================
// OBTENER ELEMENTOS DEL DOM Y CONTEXTO
// ==========================================
// Las variables son "cajas" donde guardamos información
// let crea una caja nueva donde puedes guardar datos

// Obtener el elemento canvas (área donde se dibuja todo)
let canvas = document.getElementById("areaJuego");
// Obtener el contexto 2D para dibujar en el canvas
let ctx = canvas.getContext("2d");

// ==========================================
// DIMENSIONES CONSTANTES (no cambian durante el juego)
// ==========================================
// Altura del suelo en píxeles (donde el personaje está parado)
const ALTURA_SUELO = 20;
// Alto del personaje en píxeles (60 = personaje visible; 40 = más pequeño)
const ALTURA_PERSONAJE = 60;
// Ancho del personaje en píxeles
const ANCHO_PERSONAJE = 40;
// Ancho del limón en píxeles
const ANCHO_LIMON = 20;
// Alto del limón en píxeles
const ALTO_LIMON = 20;

// ==========================================
// VARIABLES DEL JUEGO (posiciones, puntuación, etc.)
// ==========================================
// Posición horizontal del personaje (canvas.width / 2 = comienza en el centro)
let personajeX = canvas.width / 2;
// Posición vertical del personaje (abajo, sobre el suelo)
// canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE) = coloca el personaje en la posición correcta
let personajeY = canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);

// Posición horizontal del limón (comienza en el centro)
let limonX = canvas.width/2;
// Posición vertical del limón (0 = arriba, cae desde aquí)
let limonY = 0;

// Contador de limones atrapados
let puntaje = 0;
// Número de vidas restantes (empieza con 3, pierdes una si un limón cae)
let vidas = 3;

// ==========================================
// VELOCIDAD Y TEMPORIZACIÓN
// ==========================================
// Velocidad de caída en milisegundos (200 = lento; 100 = muy rápido)
// Números MENORES = los limones caen MÁS RÁPIDO (más difícil)
// Números MAYORES = los limones caen MÁS LENTO (más fácil)
// Esta velocidad cambia cuando atrapas limones:
//   - A 3 limones: velocidad baja a 150 (más rápido)
//   - A 6 limones: velocidad baja a 100 (aún más rápido)
let velocidadCaida = 200;
// Variable para almacenar el intervalo (se usa para pausar o reiniciar el juego)
let intervalo;

// ==========================================
// FUNCIÓN: Iniciar el juego
// ==========================================
// Se ejecuta al cargar la página (onload="iniciar()")
// Configura las posiciones iniciales y empieza la caída de limones
function iniciar() {
    // setInterval ejecuta la función bajarLimon cada X milisegundos (velocidadCaida)
    // Si velocidadCaida = 200, el limón baja cada 200ms (0.2 segundos)
    intervalo = setInterval(bajarLimon, velocidadCaida);
    // Dibujar elementos iniciales en el canvas
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
    // Posicionar el limón en una posición aleatoria horizontal (arriba)
    aparecerLimon();
}

// ==========================================
// FUNCIÓN: Dibujar el suelo
// ==========================================
// El suelo es el área azul clara en la parte inferior del canvas
function dibujarSuelo() {
    // "#a2e6f2" = color azul claro para el suelo
    ctx.fillStyle = "#a2e6f2";
    // Dibuja un rectángulo:
    //   - x: 0 (desde el borde izquierdo)
    //   - y: canvas.height - ALTURA_SUELO (en la parte inferior)
    //   - ancho: canvas.width (ocupa todo el ancho)
    //   - alto: ALTURA_SUELO (20 píxeles de altura)
    ctx.fillRect(0, canvas.height - ALTURA_SUELO, canvas.width, ALTURA_SUELO);
}

// ==========================================
// FUNCIÓN: Dibujar el personaje
// ==========================================
// El personaje es un rectángulo azul que controla el jugador
function dibujarPersonaje(){
    // "#18568f" = color azul oscuro para el personaje
    ctx.fillStyle = "#18568f";
    // Dibuja un rectángulo en la posición del personaje:
    //   - personajeX: posición horizontal
    //   - personajeY: posición vertical
    //   - ANCHO_PERSONAJE: 40 píxeles de ancho
    //   - ALTURA_PERSONAJE: 60 píxeles de alto
    ctx.fillRect(personajeX, personajeY, ANCHO_PERSONAJE, ALTURA_PERSONAJE);
}

// ==========================================
// FUNCIÓN: Mover personaje a la izquierda
// ==========================================
// Mueve el personaje 10 píxeles hacia la izquierda
// Cambiar 10 a otro número:
//   - 5 = movimiento más lento
//   - 20 = movimiento más rápido
function moverIzquierda() {
    personajeX -= 10;  // Restar mueve a la izquierda

    // Limitar para que no salga del borde izquierdo
    if(personajeX < 0) personajeX = 0;
    // Redibujar todo con la nueva posición
    actualizarPantalla();
}

// ==========================================
// FUNCIÓN: Mover personaje a la derecha
// ==========================================
// Mueve el personaje 10 píxeles hacia la derecha
function moverDerecha() {
    personajeX += 10;  // Sumar mueve a la derecha

    // Limitar para que no salga del borde derecho
    // personajeX + ANCHO_PERSONAJE debe ser menor o igual a canvas.width
    if(personajeX + ANCHO_PERSONAJE > canvas.width) personajeX = canvas.width - ANCHO_PERSONAJE;
    // Redibujar todo con la nueva posición
    actualizarPantalla();
}

// ==========================================
// FUNCIÓN: Actualizar pantalla
// ==========================================
// Limpia el canvas y redibuja todos los elementos
// Se llama después de cada movimiento o cambio
function actualizarPantalla(){
    // Borra todo lo que estaba dibujado
    limpiarCanva();
    // Redibuja todos los elementos en sus nuevas posiciones
    dibujarPersonaje();
    dibujarSuelo();
    dibujarLimon();
}

// ==========================================
// FUNCIÓN: Limpiar canvas
// ==========================================
// Borra todo lo dibujado en el canvas (lo deja en blanco)
function limpiarCanva(){
    // clearRect borra un rectángulo del canvas
    // (0, 0, canvas.width, canvas.height) borra TODO el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// ==========================================
// FUNCIÓN: Dibujar limón
// ==========================================
// Dibuja un pequeño rectángulo verde en la posición del limón
function dibujarLimon(){
    // "#4e8f18" = color verde para el limón
    ctx.fillStyle = "#4e8f18";
    // Dibuja un rectángulo en las coordenadas del limón
    ctx.fillRect(limonX, limonY, ANCHO_LIMON, ALTO_LIMON);
}

// ==========================================
// FUNCIÓN: Bajar el limón
// ==========================================
// Mueve el limón hacia abajo y verifica si fue atrapado o cayó
// Se ejecuta automáticamente cada velocidadCaida milisegundos
function bajarLimon(){
    // Sumar a limonY hace que baje (aumenta la coordenada vertical)
    // El número 10 es cuántos píxeles baja en cada ejecución
    // Si cambias a 5: baja más lento
    // Si cambias a 20: baja más rápido
    limonY = limonY + 10;

    // Redibujar todo con la nueva posición del limón
    actualizarPantalla();
    // Verificar si el personaje atrapó el limón
    detectarAtrapado();
    // Verificar si el limón cayó al suelo
    detectarPiso();
}

// ==========================================
// FUNCIÓN: Detectar si el limón fue atrapado
// ==========================================
// Verifica si el limón toca al personaje usando lógica de colisiones
function detectarAtrapado(){
    // Colisión en eje X (horizontal)
    // El limón toca al personaje si:
    //   - El borde derecho del limón pasa el borde izquierdo del personaje Y
    //   - El borde izquierdo del limón está antes del borde derecho del personaje
    let colisionX = limonX + ANCHO_LIMON > personajeX && limonX < personajeX + ANCHO_PERSONAJE;

    // Colisión en eje Y (vertical)
    // El limón toca al personaje si:
    //   - El borde inferior del limón pasa el borde superior del personaje Y
    //   - El borde superior del limón está antes del borde inferior del personaje
    let colisionY = limonY + ALTO_LIMON > personajeY && limonY < personajeY + ALTURA_PERSONAJE;

    // Si hay colisión TANTO en X como en Y, el personaje atrapó el limón
    if(colisionX && colisionY){
        // Hacer aparecer un nuevo limón en posición aleatoria
        aparecerLimon();
        // Sumar 1 punto (puntaje += 1 es la forma corta de puntaje = puntaje + 1)
        puntaje += 1;
        // Actualizar el número de puntos mostrado en el HTML
        mostrarEnSpan("txtPuntaje", puntaje);
    }

    // SISTEMA DE DIFICULTAD: La velocidad aumenta cuando atrapas limones
    // Si atrapas 3 limones: velocidad baja de 200 a 150 (más rápido)
    if (puntaje === 3) {
        velocidadCaida = 150;
    }

    // Si atrapas 6 limones: velocidad baja de 150 a 100 (aún más rápido)
    if (puntaje === 6) {
        velocidadCaida = 100;
    }

    // GANAR: Si atrapas 10 limones, ¡ganaste!
    if (puntaje === 10) {
        // Detener la caída de limones
        clearInterval(intervalo);
        // Mostrar mensaje de victoria
        alert("¡GANASTE! Tienes los limones; ahora te faltan sal y tequila.");
    }
}

// ==========================================
// FUNCIÓN: Detectar si el limón llegó al suelo
// ==========================================
// Verifica si el limón cayó sin ser atrapado y resta una vida
function detectarPiso() {
    // Verificar si el limón alcanzó la altura del suelo
    // limonY + ALTO_LIMON >= canvas.height - ALTURA_SUELO
    // significa que el limón tocó el suelo
    if (limonY + ALTO_LIMON >= canvas.height - ALTURA_SUELO) {
        // Restar una vida
        vidas = vidas - 1;
        // Actualizar el número de vidas mostrado en el HTML
        mostrarEnSpan("txtVidas", vidas);
        // Hacer aparecer un nuevo limón en la parte superior
        aparecerLimon();

        // PERDER: Si se acaban las vidas, game over
        if (vidas === 0) {
            // Detener la caída de limones
            clearInterval(intervalo);
            // Mostrar mensaje de derrota
            alert("GAME OVER");
        }
    }
}

// ==========================================
// FUNCIÓN: Hacer aparecer limón
// ==========================================
// Crea un nuevo limón en una posición aleatoria horizontal (en la parte superior)
function aparecerLimon(){
    // generarAleatorio devuelve un número entre 0 y canvas.width - ANCHO_LIMON
    // Esto asegura que el limón siempre esté dentro del canvas
    limonX = generarAleatorio(0, canvas.width - ANCHO_LIMON);
    // Posicionar en la parte superior (0 = arriba)
    limonY = 0;
    // Redibujar el canvas con el nuevo limón
    actualizarPantalla();
}

// ==========================================
// FUNCIÓN: Reiniciar el juego
// ==========================================
// Reseteá todos los valores y comienza una nueva partida
function reiniciar() {
    // Restaurar valores iniciales
    vidas = 3;
    puntaje = 0;
    velocidadCaida = 200;

    // Actualizar los valores mostrados en pantalla
    mostrarEnSpan("txtVidas", vidas);
    mostrarEnSpan("txtPuntaje", puntaje);

    // Llamar a iniciar para preparar el nuevo juego
    iniciar();
}

// ==========================================
// NOTAS IMPORTANTES SOBRE JAVASCRIPT
// ==========================================
// = NO significa "es igual" como en matemática
// En programación = significa:
//   "Guarda el valor de la derecha dentro de la caja (variable) de la izquierda"
//   Ejemplo: puntaje = 5  (guarda el número 5 en la variable puntaje)

// Los paréntesis () significan "ejecuta esta función"
//   Ejemplo: iniciar()  (ejecuta la función iniciar)

// La estructura de if siempre es:
// if (condición) {
//     instrucciones que se ejecutan si la condición es verdadera;
// }
