"use strict";

document.getElementById('boton-jugar').addEventListener('click', function () {
    fetch('validacion.php', {
        method: 'POST'
    })
        .then(res => res.json())
        .then(mensaje => {
            console.log(mensaje);
        })
});

