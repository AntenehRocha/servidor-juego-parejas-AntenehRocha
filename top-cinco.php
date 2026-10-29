<?php

use MongoDB\Operation\Find;

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/conexion.php';

if (count($coleccionPartida->find()->toArray()) < 5) {
    $resultados = ['error' => 'no hay suficientes partidas para mostrar el top'];
    echo json_encode($resultados);
    exit;
} else {
    $top = [
        'sort' => ['puntuacion' => -1],
        'limit' => 5
    ];
    $resultados = $coleccionPartida->find([], $top);
};


echo json_encode(iterator_to_array($resultados));
