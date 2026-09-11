//las variables son cajas, let crea esa caja donde se guarda la informacion

let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");

const ALTURA_SUELO = 20;
const ALTURA_PERSONAJE = 60;
const ANCHO_PERSONAJE = 40;
const ANCHO_LIMON = 20;
const ALTO_LIMON = 20;

let personajeX = canvas.width / 2;
let personajeY = canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);
let limonX=canvas.width/2;
let limonY=0;
let puntaje=0;
let vidas=3;
let velocidadCaida=200;

function iniciar() {
   setInterval(bajarLimon,velocidadCaida);
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();
    aparecerLimon();
}

function dibujarSuelo() {
    ctx.fillStyle = "#a2e6f2";
    ctx.fillRect(0, canvas.height - ALTURA_SUELO, canvas.width, ALTURA_SUELO);
}
function dibujarPersonaje(){
    ctx.fillStyle = "#18568f";
    ctx.fillRect(personajeX, personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}


function moverIzquierda() {
    personajeX -= 10;
   
    if(personajeX < 0) personajeX = 0;
    actualizarPantalla();
}


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
    dibujarLimon(); 
}


function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function dibujarLimon(){
     ctx.fillStyle = "#4e8f18"; //elige el color verde.
     ctx.fillRect(limonX, limonY, ANCHO_LIMON, ALTO_LIMON); //dibuja un rectángulo
}

function bajarLimon(){
    limonY = limonY + 10;
    actualizarPantalla();
    detectarAtrapado(); 
    detectarPiso();
}

function detectarAtrapado(){
   
    let colisionX = limonX + ANCHO_LIMON > personajeX && limonX < personajeX + ANCHO_PERSONAJE;
    
    let colisionY = limonY + ALTO_LIMON > personajeY && limonY < personajeY + ALTURA_PERSONAJE;
    
    if(colisionX && colisionY){
       
        aparecerLimon();
        puntaje += 1;//La forma corta de sumar
       mostrarEnSpan("txtPuntaje", puntaje);
    }
  
}
/*SI el limón llegó al suelo:
    resta una vida
    muestra las vidas en la pantalla
    crea otro limón arriba
    SI las vidas ahora son 0:
        muestra GAME OVER*/ 
function detectarPiso() {
    if (limonY + ALTO_LIMON >= canvas.height - ALTURA_SUELO) {              
        vidas = vidas - 1;
        mostrarEnSpan("txtVidas", vidas);
        aparecerLimon();

        if (vidas === 0) {
            alert("GAME OVER");
        }
    }
}

function aparecerLimon(){
    limonX=generarAleatorio(0,canvas.width-ANCHO_LIMON);
    limonY=0;
    actualizarPantalla();
}

//= no significa “es igual” como en matemática. En programación significa:
//Guarda el valor de la derecha dentro de la caja de la izquierda.

//Los paréntesis () quieren decir “ejecuta esta función”.

//La estructura es siempre:
//if (condición) {
//    instrucciones;
//}