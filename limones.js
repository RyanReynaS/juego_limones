let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTURA_SUELO = 20;
const ALTURA_PERSONAJE = 60;
const ANCHO_PERSONAJE = 40; // Ancho del personaje dibujado (rectángulo de 40px)
const ANCHO_LIMON = 20;
const ALTO_LIMON = 20;

let personajeX = canvas.width / 2;
let personajeY = canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=0;

function iniciar() {
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
}

function dibujarSuelo() {
    ctx.fillStyle = "#a2e6f2";
    ctx.fillRect(0, canvas.height - ALTURA_SUELO, canvas.width, ALTURA_SUELO);
}
function dibujarPersonaje(){
    ctx.fillStyle = "#18568f";
    ctx.fillRect(personajeX, personajeY - (ALTURA_SUELO + ALTURA_PERSONAJE), 40, ALTURA_PERSONAJE);
}

// Mueve el personaje 10 píxeles hacia la izquierda
function moverIzquierda() {
    personajeX -= 10;
    // Limitar movimiento para que no salga del canvas
    if(personajeX < 0) personajeX = 0;
    actualizarPantalla();
}

// Mueve el personaje 10 píxeles hacia la derecha
function moverDerecha() {
    personajeX += 10;
    // Limitar movimiento para que no salga del canvas
    if(personajeX + ANCHO_PERSONAJE > canvas.width) personajeX = canvas.width - ANCHO_PERSONAJE;
    actualizarPantalla();
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarPersonaje();
    dibujarSuelo();
    dibujarLimon(); // CORREGIDO: Agregados paréntesis para llamar la función
}


function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function dibujarLimon(){
     ctx.fillStyle = "#4e8f18";
     ctx.fillRect(limonX, limonY, ANCHO_LIMON, ALTO_LIMON); // CORREGIDO: Cambié punto por coma entre limonY y ANCHO_LIMON, agregué coma antes de ALTO_LIMON
}
// Mueve el limón hacia abajo (simula que cae)
function bajarLimon(){
    limonY = limonY + 10;
    actualizarPantalla();
    detectarColision(); // Detectar colisión solo cuando el limón se mueve (cae)
}
// Detecta si el limón toca al personaje
function detectarColision(){
    // Validar colisión en el eje X (izquierda-derecha)
    let colisionX = limonX + ANCHO_LIMON > personajeX && limonX < personajeX + ANCHO_PERSONAJE;

    // Validar colisión en el eje Y (arriba-abajo)
    // Comparar posición Y del limón con la posición Y del personaje
    let colisionY = limonY + ALTO_LIMON > personajeY && limonY < personajeY + ALTURA_PERSONAJE;

    // Si colisiona en ambos ejes, mostrar alerta
    if(colisionX && colisionY){
        alert("¡ATRAPADO!");
        // Aquí puedes reiniciar el juego o sumar puntos
    }
}