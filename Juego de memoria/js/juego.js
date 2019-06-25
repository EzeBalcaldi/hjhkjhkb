"use strict";
let tablero = Array(5);
let puntos = 0;
let errores =0;
let marcas=0;
let puntosTotales=0;
let erroresTotales=0;
let ganadas=0;
document.querySelector('.comenzarJuego').addEventListener("click", comenzarJuego);
document.querySelector('.verificar').addEventListener("click", verificar);
function comenzarJuego(){
  puntos=0;
  errores=0;
  actualizarErrores();
  actualizarPuntuacion();
  cargarTablero();
  cambiarColores();
  let timer = setTimeout(ocultar, 2000);
  desbloquearButtons();
}
function cargarTablero(){ //carga el arreglo tablero
  marcas=0;
  for (let i=0; i<tablero.length; i++){
    let valor= Math.random()
    if (valor<0.5){
        tablero[i]="marca";
        marcas++;
    }
    if ((valor>=0.5)&&(valor<0.6)){
      tablero[i]="bomba";
    }
    if (valor>=0.6){
      tablero[i]="nomarca";
    }
  }
}
function verificar(){ //pido el valor de los radio button
  let x;
  let opcion = document.querySelector('input[name="CASILLERO"]:checked').value;
  comparar(opcion);
  MostrarCasilla(opcion);
  //mostrar la casilla
}
  function MostrarCasilla(opcion) { // cambia el color de la casilla opción en función de lo que sea
  let elementos = document.getElementsByClassName('memo');
  elementos[opcion].classList.remove("ocultos")
}
  function comparar(valor) { //compara los valores de las casillas con las selecciones del usuario
    document.getElementById("casillero"+valor).disabled = true;
    document.getElementById("casillero"+valor).checked = false;
    if (tablero[valor]== "bomba"){
      alert("GAME OVER");
      reiniciarJuego();
      alert("Para volver a jugar presione comenzar");
    }
    if (tablero[valor]=="marca"){
      puntos++;
      puntosTotales++;
      marcas--;
      actualizarPuntuacion();
      if (marcas==0){
        alert("Felicidades, ganaste el juego");
        ganadas++;
        reiniciarJuego();
        alert("Para volver a jugar presione comenzar");
      }
    }
    if (tablero[valor]=="nomarca"){
      errores++;
      erroresTotales++;
      actualizarErrores();
    }
  }
  function desbloquearButtons() {
    for (let i = 0; i < 5; i++) {
      document.getElementById("casillero"+i).disabled = false;
      document.getElementById("casillero"+i).checked = false;
    }
}
  function bloquearButtons() {
    for (let i = 0; i < 5; i++) {
      document.getElementById("casillero"+i).disabled = true;
      document.getElementById("casillero"+i).checked = false;
    }
}

function ocultar() {
  let elementos = document.getElementsByClassName('memo');
  for (let i = 0; i < tablero.length; i++) {
    let d = elementos[i];
    d.classList.add("ocultos");
  }
}
function cambiarColores(){
  let elementos = document.getElementsByClassName("memo");
  for(let a = 0; a < tablero.length; a++){
    let elem = elementos[a];
    elem.classList.remove("error", "marca", "bomba");
    switch(tablero[a]){
        case "nomarca": elem.classList.add("error") //elem.classList.add("blue")
        break;
        case "bomba" : elem.classList.add("bomba");
        break;
        case "marca" : elem.classList.add("marca");
        break;
    }
  }
}
function reiniciarJuego() {
  let elementos = document.getElementsByClassName("memo");
  for (let i = 0; i < elementos.length; i++) {
    let elem= elementos[i];
    elem.classList.remove("ocultos");
  }
  if (ganadas==3){
    alert("Felicidades, ganaste 3 partidas!");
    ganadas=0;
  }
  bloquearButtons();
}

function actualizarPuntuacion() {
  let nodoPuntos = document.getElementById('txtPuntos');
  nodoPuntos.innerHTML = "Puntos= " +puntos;
  nodoPuntos = document.getElementById('txtPuntosTotales');
  nodoPuntos.innerHTML = "Puntos totales=" +puntosTotales;
}
function actualizarErrores(){
  let nodoErrores = document.getElementById('txtErrores');
  nodoErrores.innerHTML = "Errores=" +errores;
  nodoErrores = document.getElementById('txtErroresTotales');
  nodoErrores.innerHTML = "Errores totales=" +erroresTotales;
}
