<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$email = $_GET['email'];

try {
    $db = new PDO('sqlite:AOC.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->prepare('SELECT * FROM Patient WHERE Email = :email');
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();
    $patientDetails = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($patientDetails);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
