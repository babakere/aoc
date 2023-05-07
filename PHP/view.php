<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

try {
    $pdo = new PDO("sqlite:/Documents/AOCdatabase/AOC.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" => "connection Failed: " . $e->getMessage()]);
}
