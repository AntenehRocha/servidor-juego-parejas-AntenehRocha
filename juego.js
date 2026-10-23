"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let nombreUsuario = localStorage.getItem("nombre-usuario");
  console.log(nombreUsuario);
  let saludo = document.querySelector("#saludo");

  saludo.innerHTML = `<p> Hola ${nombreUsuario} </p>`;

  function tiempoJuego() {
    let tiempo = 60;
    let tiempoTranscurrido = 0;
    const tiempoRestante = setInterval(() => {
      tiempo--;
      tiempoTranscurrido++;

      if (tiempo <= 0) {
        clearInterval(tiempoRestante);
        alert("se ha agotado el tiempo pringao");
        let tiempoSesion = tiempoTranscurrido;
        let puntuacionSesion = puntuacion;

        let formData2 = new FormData();
        formData2.append("tiempo", tiempoSesion);
        formData2.append("puntuacion", puntuacionSesion);

        fetch("partida.php", {
          method: "POST",
          body: formData2,
        });
      }

      console.log(tiempo);

      let tiempoHTML = document.querySelector("#tiempo");
      tiempoHTML.innerHTML = `<p> Tiempo : ${tiempo} </p>`;
    }, 100);
  }

  const cartasCLick = document.querySelectorAll(".carta");

  let puntuacionHTML = document.querySelector("#puntuacion");
  let puntuacion = 0;
  for (let cadaCartaClick of cartasCLick) {
    cadaCartaClick.addEventListener("click", (evento) => {
      puntuacion++;
      puntuacionHTML.innerHTML = `<p> Puntuacion : ${puntuacion} </p>`;
    });
  }

  tiempoJuego();
});
