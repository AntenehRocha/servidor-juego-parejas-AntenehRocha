"use strict";
import { inicializarTablero } from "./barajar-cartas.js";

document.addEventListener("DOMContentLoaded", () => {
  inicializarTablero();
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
  let primeraCarta;

  for (let cadaCartaClick of cartasCLick) {
    cadaCartaClick.addEventListener("click", (evento) => {
      const carta = evento.currentTarget;
      const interiorCarta = carta.querySelector(".carta-interior");
      if (interiorCarta.classList.contains("carta-click")) {
        return;
      } else {
        interiorCarta.classList.add("carta-click");
      }
      const rutaImagen = carta.dataset.imagen;
      const cara = carta.querySelector(".carta-anverso");
      cara.style.backgroundImage = `url("${rutaImagen}")`;

      if (primeraCarta === undefined) {
        primeraCarta = carta;
      } else {
        if (primeraCarta.dataset.imagen === carta.dataset.imagen) {
          console.log("son pareja");
          puntuacion++;
        } else {
          console.log("no son pareja");
          const cartaPrimera = primeraCarta;
          const cartaSegunda = carta;
          setTimeout(() => {
            cartaPrimera
              .querySelector(".carta-interior")
              .classList.remove("carta-click");
            cartaSegunda
              .querySelector(".carta-interior")
              .classList.remove("carta-click");
          }, 1000);
        }

        primeraCarta = undefined;
      }

      // cadaCartaClick.classList.toggle("carta-click");
      // puntuacion++;
      puntuacionHTML.innerHTML = `<p> Puntuacion : ${puntuacion} </p>`;
    });
  }

  let botonTerminar = document.querySelector(".terminar-ahora");

  botonTerminar.addEventListener("click", () => {
    let formData2 = new FormData();

    if (tiempoTranscurrido > 0 && puntuacion == 15) {
      puntuacion += 40;
    }

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
