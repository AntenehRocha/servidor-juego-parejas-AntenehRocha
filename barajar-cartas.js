"use strict";

export function inicializarTablero() {
    let arrayRutas = [];
    const baraja = document.querySelectorAll(".carta");

    for (const cada_carta of baraja) {
        const dataset_imagen = cada_carta.dataset.imagen;
        arrayRutas.push(dataset_imagen);
        // console.log(dataset_imagen);
    }

    // console.log(baraja);

    function barajar(arrayRutas) {
        for (let i = arrayRutas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrayRutas[i], arrayRutas[j]] = [arrayRutas[j], arrayRutas[i]];
        }
        return arrayRutas;
    }

    barajar(arrayRutas);

    console.log(arrayRutas);

    for (let i = 0; i < baraja.length; i++) {
        baraja[i].dataset.imagen = arrayRutas[i];
    }
}
