<?php
header('Content-Type: application/json; charset=utf-8');


require_once __DIR__ . '/conexion.php';

session_start();

$mensaje = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['nombre-usuario'])) {
        $nombre = trim($_POST['nombre-usuario']);
    } else {
        $nombre = trim('');
    }
    if (empty($nombre)) {
        $mensaje = 'Por favor, introduce un nombre de usuario';
    } else {
        $_SESSION['usuario'] = $nombre;
        $coleccionPartida->insertOne([
            'nombre' => $nombre
        ]);
    }

    echo json_encode($mensaje);
    exit;
}
