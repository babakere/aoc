<!-- Authour: mahamed mahamud w1830373 -->
<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

try {
    $pdo = new PDO("sqlite:AOC.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" => "Connection failed: " . $e->getMessage()]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));
$appointmentRef = $data->appointmentRef;

$query = "DELETE FROM Appointment WHERE AppointmentRef = :appointmentRef";
$stmt = $pdo->prepare($query);
$stmt->bindParam(":appointmentRef", $appointmentRef);
$stmt->execute();

echo json_encode(["message" => "Appointment with Ref $appointmentRef has been canceled."]);
?>







