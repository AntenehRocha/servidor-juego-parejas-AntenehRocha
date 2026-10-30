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
  let bloqueado = false;

  for (let cadaCartaClick of cartasCLick) {
    cadaCartaClick.addEventListener("click", (evento) => {
      const carta = evento.currentTarget;

      if (
        bloqueado ||
        carta === primeraCarta ||
        carta.dataset.encontrada === "true"
      ) {
        return;
      }

      const rutaImagen = carta.dataset.imagen;
      carta.style.backgroundImage = `url("${rutaImagen}")`;
      carta.classList.add("carta-click");

      if (primeraCarta === undefined) {
        primeraCarta = carta;
        return;
      } else {
        if (primeraCarta.dataset.imagen === carta.dataset.imagen) {
          console.log("son pareja");
          puntuacion++;

          primeraCarta.dataset.encontrada = "true";
          carta.dataset.encontrada = "true";

          if (puntuacion === 15) {
            if (tiempoTranscurrido < 60) {
              puntuacion += 40;
            }
            puntuacionHTML.innerHTML = `<p> Puntuacion : ${puntuacion} </p>`;
            alert("tablero completado");
            let formData3 = new FormData();

            // if (tiempoTranscurrido < 60 && puntuacion == 15) {
            //  puntuacion += 40;
            // }

            formData3.append("tiempo", tiempoTranscurrido);
            formData3.append("puntuacion", puntuacion);

            fetch("partida.php", {
              method: "POST",
              body: formData3,
            });

            clearInterval(intervalo);
            return;
          }
        } else {
          console.log("no son pareja");
          const cartaPrimera = primeraCarta;
          const cartaSegunda = carta;
          bloqueado = true;
          setTimeout(() => {
            cartaPrimera.style.backgroundImage = "";
            cartaSegunda.style.backgroundImage = "";
            cartaPrimera.classList.remove("carta-click");
            cartaSegunda.classList.remove("carta-click");
            primeraCarta = undefined;
            bloqueado = false;
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

    // if (tiempoTranscurrido < 60 && puntuacion == 15) {
    //  puntuacion += 40;
    // }

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
