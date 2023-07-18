// let diccionario = ["ARBOL","ANGEL","MARCO","SILLA","BAILE"];
let palabra ;
//diccionario[Math.floor(Math.random() * diccionario.length)];

let intentos = 6;

const API = "https://random-word-api.herokuapp.com/word?length=5&lang=es" 
fetch(API)
    .then(response => response.json())
    .then(response => {
        console.log(response);
        palabra = response[0].toUpperCase();
        console.log(palabra);
    })
    .catch(err => console.error(err));

const BOTON = document.getElementById("guess-button");
BOTON.addEventListener("click", intentar);

function intentar(){


    const GRID = document.getElementById("grid");
    const ROW = document.createElement("div");
    ROW.className = "row";


    const INTENTO = leerIntento();
    if (INTENTO == palabra){
        terminar("<h1>GANASTE :) </h1>");
        return;
    }

    for (let i in palabra){
        const SPAN = document.createElement("span");
        SPAN.className = "letter";
        if (INTENTO[i]===palabra[i]){ //VERDE
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#31ee31";
        } else if( palabra.includes(INTENTO[i]) ) { //AMARILLO
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#e6f74c";
        } else {      //GRIS
            SPAN.innerHTML = INTENTO[i];
            SPAN.style.backgroundColor = "#f07c6c";
        }
        ROW.appendChild(SPAN)
    }
    GRID.appendChild(ROW)
    
    intentos--;
    if (intentos==0){
        terminar("<h1>PERDISTE :(</h1>");
        GRID.style.display = "none";
        return;
    }
    
}

function leerIntento() {
    let intento = document.getElementById("guess-input").value;
    intento = intento.toUpperCase();
    var alphaOnly = /^[a-zA-Z]+$/;

    if (intento.length !== 5) {
        alert("Ingrese exactamente 5 letras");
        return null;
      }
    if (intento.match(alphaOnly)) {
      return intento;
    } else {
      alert("Ingrese solo letras");
    }
  }
  
function terminar(mensaje){
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = mensaje
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled = true;
    BOTON.disabled = true;
}




