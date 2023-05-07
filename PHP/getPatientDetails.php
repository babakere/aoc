<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
$NHSNumber = $_GET['NHSNumber'];

try {
    $db = new PDO("sqlite:/Users/ImranBary/AOC.db");
    $query = "SELECT * FROM Patient WHERE NHSNumber = :NHSNumber";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':NHSNumber', $NHSNumber, PDO::PARAM_INT);
    $stmt->execute();

    $patient = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($patient);

} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
