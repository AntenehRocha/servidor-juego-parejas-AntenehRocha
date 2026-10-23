<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/conexion.php';

session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['tiempo'])) {
        $tiempo = $_POST['tiempo'];
    } else {
        echo json_encode('falta el tiempo');
    }

    if (isset($_POST['puntuacion'])) {
        $puntuacion = $_POST['puntuacion'];
    } else {
        echo json_encode('falta la puntuacion');
    }

    if (isset($_SESSION['usuario'])) {
        $usuario = $_SESSION['usuario'];
    } else {
        echo json_encode('falta el nombe de usuario');
    }

    $coleccionPartida->insertOne([
        'usuario' => $usuario,
        'tiempo' => $tiempo,
        'puntuacion' => $puntuacion
    ]);
}
