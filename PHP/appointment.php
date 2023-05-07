<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

try {
    $pdo = new PDO("sqlite:/Users/evan/Downloads/AOC.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" => "Connection failed: " . $e->getMessage()]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $staffid = $_GET['StaffID'];
    $query = "SELECT * FROM Appointment WHERE StaffID = :staffid";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':staffid', $staffid);

    if ($stmt->execute()) {
        $appointments = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $appointments[] = $row;
        }
        echo json_encode(["Appointments" => $appointments]);
    } else {
        echo json_encode(["message" => "Unable to retrieve appointments. Please try again."]);
    }
}
