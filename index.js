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
