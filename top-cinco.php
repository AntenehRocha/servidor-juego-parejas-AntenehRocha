<?php

use MongoDB\Operation\Find;

header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/conexion.php';

$top = [
    'sort' => ['puntuacion' => -1],
    'limit' => 5
];

$resultados = $coleccionPartida->find([], $top);

echo json_encode(iterator_to_array($resultados));
