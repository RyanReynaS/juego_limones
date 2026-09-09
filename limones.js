let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTURA_SUELO = 20;
const ALTURA_PERSONAJE = 60;
const ANCHO_LIMON=20;
const ALTO_LIMON=20;

let personajeX = canvas.width / 2;
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
    dibujarLimon(); // CORREGIDO: Agregados paréntesis para llamar la función
}


function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function dibujarLimon(){
     ctx.fillStyle = "#4e8f18";
     ctx.fillRect(limonX, limonY, ANCHO_LIMON, ALTO_LIMON); // CORREGIDO: Cambié punto por coma entre limonY y ANCHO_LIMON, agregué coma antes de ALTO_LIMON
}
function bajarLimon(){
    limonY = limonY + 10;
    actualizarPantalla(); // CORREGIDO: Agregados paréntesis para llamar la función
}
   