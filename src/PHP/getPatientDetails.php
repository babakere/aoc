<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");
$NHSNumber = $_GET['NHSNumber'];

try {
<<<<<<< HEAD:src/PHP/getPatientDetails.php
    $db = new PDO('sqlite:AOC.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $db->prepare('SELECT * FROM Patient WHERE Email = :email');
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
=======
    $db = new PDO("sqlite:/Users/ImranBary/AOC.db");
    $query = "SELECT * FROM Patient WHERE NHSNumber = :NHSNumber";
    $stmt = $db->prepare($query);
    $stmt->bindValue(':NHSNumber', $NHSNumber, PDO::PARAM_INT);
>>>>>>> abf1a392b3c7efdc58051a2d373dbb9f7de95d9b:PHP/getPatientDetails.php
    $stmt->execute();

    $patient = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($patient);

} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>
