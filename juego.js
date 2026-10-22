"use strict";

let nombreUsuario = localStorage.getItem("nombre-usuario");
console.log(nombreUsuario);
let sidebar = document.querySelector(".sidebar");

sidebar.innerHTML = `<p> Hola ${nombreUsuario} </p>`;
