<?php
// Replace the placeholder with your Atlas connection string
$uri = 'mongodb+srv://antenehro_db_user:XXXXXXXXXXXXX@cluster0.rfzgpbk.mongodb.net/';

// Create a MongoDB client
$client = new MongoDB\Client($uri);

// Ping the server to verify that the connection works
$admin = $client->admin;
$command = ['ping' => 1];
$result = $admin->command($command)->toArray();

echo json_encode($result), PHP_EOL;
echo "Pinged your deployment. You successfully connected to MongoDB!\n";