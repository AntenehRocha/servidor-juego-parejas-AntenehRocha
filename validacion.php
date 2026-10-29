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

        # $coleccionPartida->insertOne([
        #  'nombre' => $nombre
        # ]);
    }

    echo json_encode($mensaje);
    exit;
}

/**
* 
*     if ($nombre == 'orto' or $nombre == 'Orto') {
*        $mensaje = 'hombre, pero si es el profesor, tienes 1000 pts';
*        $coleccionPartida->insertOne([
*            'usuario' => $nombre,
*            'puntuacion' => (int)1000,
*            'tiempo' => 'es un crack y es veloz'
*        ]);
*    }
*    if ($nombre == 'anteneh' or $nombre == 'Anteneh') {
*        $mensaje = 'tio no copies, no eres yo, ya te molaria';
*        $coleccionPartida->insertOne([
*            'usuario' => $nombre,
*            'puntuacion' => '0 pts x pringrao, no me copies',
*            'tiempo' => 'apaga la radio q tardas mucho'
*        ]);
*    }
*    if ($nombre == 'chatgpt' or $nombre == 'Chatgpt') {
*        $mensaje = "tio no eres {$nombre}, tio tira para allá pringao, y olvidate q no juegas";
*    } 
*    
*/