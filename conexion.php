<?php

require_once __DIR__ . '/vendor/autoload.php';
// Replace the placeholder with your Atlas connection string
$uri = 'mongodb+srv://antenehro_db_user:antenehrocha@cluster0.rfzgpbk.mongodb.net/';

// Create a MongoDB client
$client = new MongoDB\Client($uri);

$bd = $client->selectDatabase('juego-pareja-cartas');
$coleccionUsuarios = $bd->selectCollection('usuarios');

?>
