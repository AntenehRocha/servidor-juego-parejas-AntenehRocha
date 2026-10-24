"use strict";

document.addEventListener("DOMContentLoaded", () => {
  let nombreUsuario = localStorage.getItem("nombre-usuario");
  console.log(nombreUsuario);
  let saludo = document.querySelector("#saludo");
  saludo.innerHTML = `<p> Hola ${nombreUsuario} </p>`;
  let tiempo = 60;
  let tiempoTranscurrido = 0;
  let intervalo;

  function tiempoJuego() {
    intervalo = setInterval(() => {
      tiempo--;
      tiempoTranscurrido++;

      if (tiempo <= 0) {
        clearInterval(intervalo);
        alert("tiempo agotado, intentalo de nuevo");

        let formData2 = new FormData();
        formData2.append("tiempo", tiempoTranscurrido);
        formData2.append("puntuacion", puntuacion);

        fetch("partida.php", {
          method: "POST",
          body: formData2,
        });
      }

      console.log(tiempo);

      let tiempoHTML = document.querySelector("#tiempo");
      tiempoHTML.innerHTML = `<p> Tiempo : ${tiempo} </p>`;
    }, 1000);
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

  let botonTerminar = document.querySelector(".terminar-ahora");

  botonTerminar.addEventListener("click", () => {
    let formData2 = new FormData();
    formData2.append("tiempo", tiempoTranscurrido);
    formData2.append("puntuacion", puntuacion);

    fetch("partida.php", {
      method: "POST",
      body: formData2,
    });
    clearInterval(intervalo);
    alert("juego terminado con exito");
  });

  tiempoJuego();
});
