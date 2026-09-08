let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");
const ALTURA_SUELO = 20;
const ALTURA_PERSONAJE = 60;
let personajeX = canvas.width / 2;


function iniciar() {
    dibujarSuelo();
    dibujarPersonaje();
}

function dibujarSuelo() {
    ctx.fillStyle = "#a2e6f2";
    ctx.fillRect(0, canvas.height - ALTURA_SUELO, canvas.width, ALTURA_SUELO);
}
function dibujarPersonaje(){
    ctx.fillStyle = "#528f18";
    ctx.fillRect(personajeX, canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE), 40, ALTURA_PERSONAJE);
}

function moverIzquierda() {
    personajeX -= 10;
    actualizarPantalla();
    
}

function moverDerecha() {
    personajeX += 10;
    actualizarPantalla();
    
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarPersonaje();
    dibujarSuelo();
}


function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}
