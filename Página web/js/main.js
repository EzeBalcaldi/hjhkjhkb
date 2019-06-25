"use strict";
const url="http://web-unicen.herokuapp.com/api/groups/nba/equipos";
window.onload=load("home.html");

document.querySelector('#botonTabla').addEventListener("click", cargarTabla);

document.querySelector('#botonLista').addEventListener("click", cargarLista);

document.querySelector('#botonRegistro').addEventListener("click", cargarRegistro);

document.querySelector('#botonHome').addEventListener("click", cargarHome);

function load(url) {
  fetch(url)
  .then(function(response){
    response.text().then(t=>{
      document.querySelector(".container-fluid").innerHTML = t;
      if (url === "tabla.html"){
      document.querySelector('.js-botoneliminar').addEventListener("click", eliminarElemento);
      document.querySelector('.js-enviarEquipo').addEventListener("click", postData);
      document.querySelector('.js-enviarEquipox3').addEventListener("click", postDatax3);
      document.querySelector('.js-filtrar').addEventListener("click", filtrar);
      document.querySelector('.js-editar').addEventListener("click", putData);
      }
    }
  )}
)}

  function cargarTabla(){
    load("tabla.html");
    getData();
  }

  function cargarLista(){
    load("lista.html");
  }

  function cargarRegistro(){
    load("registro.html");
  }

  function cargarHome(){
    load("home.html");
  }
  function postData(){
    let nombreEquipo = document.querySelector(".js-formEquipo").value;
    let pg = document.querySelector(".js-formPG").value;
    let pp = document.querySelector(".js-formPP").value;
    let dato = {
      "thing": {
        "nombre": nombreEquipo,
        "partidosGanados": pg,
        "partidosPerdidos": pp,
      }
    }
    fetch(url,
    {
      "method": "POST",
      "headers":{"Content-Type": "application/json"},
      "body": JSON.stringify(dato),
    }).then(function(r){
      if(!r.ok){
        console.log("error")
      }
      return r.json()
    })
    .then(function(json) {
      cargarTabla();
    })
    .catch(function(e){
      console.log(e)
    })
}
function postDatax3(){
  let nombreEquipo = document.querySelector(".js-formEquipo").value;
  let pg = document.querySelector(".js-formPG").value;
  let pp = document.querySelector(".js-formPP").value;
  let aux = 0;
  let dato = {
      "thing": {
        "nombre": nombreEquipo,
        "partidosGanados": pg,
        "partidosPerdidos": pp,
      }
    }
  for(let i = 0; i < 3; i++){
    fetch(url,
    {
      "method": "POST",
      "headers":{"Content-Type": "application/json"},
      "body": JSON.stringify(dato),
    }).then(function(r){
      if(!r.ok){
        console.log("error")
      }
      return r.json()
    })
    .then(function(json) {
      aux++;
      if (aux===3){
        cargarTabla();
      }
    })
    .catch(function(e){
      console.log(e)
    }
  )}
}

function getData() {
  fetch(url,{
    "method":"GET",
  }).then(function(r){
    if(!r.ok){
      console.log("error")
    }
    return r.json()
  })
  .then(function(json) {
    let posicion= 1;
    let contenedor = document.querySelector(".contenedor-tabla");
    console.log(contenedor);
    for (let data of json.equipos) {
      let destacado = parseInt(data.thing.partidosGanados);
      contenedor.innerHTML +=   "<tr>" + "<td>" + posicion + "</td>" + "<td>" + data.thing.nombre + "</td>" +"<td>" + data.thing.partidosGanados + "</td>" +"<td>" + data.thing.partidosPerdidos + "</td> <td> <button type='button' name='"+ data._id +"' class='js-eliminarFila'>Eliminar</button></tr>";
      posicion++;
      }
      let botonesFilas = document.querySelectorAll('.js-eliminarFila');
        for (let i = 0; i < botonesFilas.length; i++) {
          botonesFilas[i].addEventListener("click", ()=>{ deleteData(botonesFilas[i].name)});
        }
    })
    .catch(function(e){
      console.log(e)
    })
}
function eliminarElemento() {
let id = document.querySelector('.js-eliminar').value;
    deleteData(id);
}
function deleteData(id) {
  console.log(id);
  fetch(url+"/"+id,{
    "method":"DELETE",
    }).then(function(r){
  if(!r.ok){
    console.log("Error")
  }
  return r.json()
})
.then(function(json) {
  cargarTabla();
})
.catch(function(e){
  console.log(e)
  })
}
function filtrar(){
  fetch(url,{
    "method":"GET",
  }).then(function(r){
    if(!r.ok){
      console.log("error")
    }
    return r.json()
  })
  .then(function(json) {
    let formularioFiltrar = parseInt(document.querySelector(".js-formFiltrado").value);
    (formularioFiltrar);
    let posicion= 1;
    let contenedor = document.querySelector(".contenedor-tabla");
        contenedor.innerHTML = "";
    for (let data of json.equipos) {
      if(formularioFiltrar !== null){
        let aux=parseInt(data.thing.partidosGanados);
        if(aux > formularioFiltrar){
          contenedor.innerHTML +=   "<tr>" + "<td>" + posicion + "</td>" + "<td>" + data.thing.nombre + "</td>" +"<td>" + data.thing.partidosGanados + "</td>" +"<td>" + data.thing.partidosPerdidos + "</td>" + "</tr>";
        }
        }
      posicion++;
    }
  })
  .catch(function(e){
      console.log(e)
    })
}
function putData(){
  let id = document.querySelector('.js-id').value;
  let name = document.querySelector(".js-editarEquipo").value;
  let pp = document.querySelector(".js-editarpp").value;
  let pg = document.querySelector(".js-editarpg").value;
  let contenedor = document.querySelector('.contenedor-tabla');
  let url2 = "http://web-unicen.herokuapp.com/api/groups/nba/equipos/"
  if( name.length === 0 || id.length === 0) {
    contenedor.innerHTML = "Ingrese un ID y nombre";
    return;
  }
  let data = {
    "thing": {
      "nombre": name,
      "partidosGanados": pg,
      "partidosPerdidos": pp,
    }
  };
  url2 += id;
  fetch(url2,{
    "method": "PUT",
    "headers": { "Content-Type": "application/json" },
    "body": JSON.stringify(data)
  }).then(function(r){
    if(!r.ok){
      console.log("Error")
    }
    return r.json()
  })
  .then(function(json) {
    cargarTabla();
  })
  .catch(function(e){
    console.log(e)
  })
}
