let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");
const ALTURA_SUELO = 20;
const ALTURA_PERSONAJE = 60;

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
    ctx.fillRect(canvas.width / 2 - 25, canvas.height - (ALTURA_SUELO + ALTURA_PERSONAJE), 40, ALTURA_PERSONAJE);
}