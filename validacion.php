<?php
header('Content-Type: application/json; charset=utf-8');

session_start();

$mensaje = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = trim($_POST['nombre-usuario']);

    if (empty($nombre)) {
        $mensaje = 'Por favor, introduce un nombre de usuario';
    }

    echo json_encode($mensaje);
}



?>
