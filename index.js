"use strict";

document.getElementById("boton-jugar").addEventListener("click", function () {
  let nombreUsuario = document.getElementById("nombre-usuario").value;

  let formData = new FormData();
  formData.append("nombre-usuario", nombreUsuario);

  fetch("validacion.php", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((mensaje) => {
      if (mensaje) {
        alert(mensaje);
      } else {
        localStorage.setItem("nombre-usuario", nombreUsuario);
        window.location.href = "juego.html";
      }
      console.log(mensaje);
    });
});

document.addEventListener("DOMContentLoaded", () => {
  fetch("top-cinco.php", {
    method: "GET",
  })
    .then((respuesta) => respuesta.json())
    .then((partidas) => {
      console.log(partidas);

      let contenedorTop = document.querySelector("#contenedor-datos-top");
      if (partidas.error) {
        contenedorTop.innerHTML = `${partidas.error}`;
      } else {
        contenedorTop.innerHTML = `
      <p> El primero es ${partidas[0].usuario} con ${partidas[0].puntuacion} puntos </p>
      <p> El segundo es ${partidas[1].usuario} con ${partidas[1].puntuacion} puntos </p>
      <p> El tercero es ${partidas[2].usuario} con ${partidas[2].puntuacion} puntos </p>
      <p> El cuarto es ${partidas[3].usuario} con ${partidas[3].puntuacion} puntos </p>
      <p> El quinto es ${partidas[4].usuario} con ${partidas[4].puntuacion} puntos </p>
      `;
      }
    });
});
