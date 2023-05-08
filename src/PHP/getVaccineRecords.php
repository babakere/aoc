<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$NHSNumber = $_GET['NHSNumber'];

try {
    $db = new PDO('sqlite:vaccines.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->prepare('SELECT * FROM vaccines WHERE NHSNumber = :NHSNumber');
    $stmt->bindParam(':NHSNumber', $NHSNumber, PDO::PARAM_INT);
    $stmt->execute();
    $vaccineRecords = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($vaccineRecords);
} catch (PDOException $e) {
    echo json_encode(['error' => $e->getMessage()]);
}
