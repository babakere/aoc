<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

try {
    $pdo = new PDO("sqlite:/Users/evan/Documents/AOCdatabase/AOC.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" => "Connection failed: " . $e->getMessage()]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'PATCH') {
    try {

        $data = json_decode(file_get_contents("php://input"), true);
        $patientId = $_GET['patientId'];

        $query = "UPDATE Patient SET Name = :name, Surname = :surname, Email = :email, Address = :address WHERE PatientID = :patientId";
        $stmt = $pdo->prepare($query);

        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':surname', $data['surname']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':address', $data['address']);
        $stmt->bindParam(':patientId', $patientId);

        if ($stmt->execute()) {
            echo json_encode(["message" => "Patient record updated successfully."]);
        } else {
            echo json_encode(["message" => "Failed to update patient record."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Failed to update patient record: " . $e->getMessage()]);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $query = "SELECT * FROM Patient";
    $stmt = $pdo->prepare($query);

    if ($stmt->execute()) {
        $patients = [];
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $patients[] = $row;
        }
        echo json_encode($patients);
    } else {
        echo json_encode(["message" => "Unable to retrieve patients. Please try again."]);
    }
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    try {
        $data = json_decode(file_get_contents("php://input"), true);

        $query = "INSERT INTO Patient (Name, Surname, Email, Address) VALUES (:name, :surname, :email, :address)";
        $stmt = $pdo->prepare($query);

        $stmt->bindParam(':name', $data['name']);
        $stmt->bindParam(':surname', $data['surname']);
        $stmt->bindParam(':email', $data['email']);
        $stmt->bindParam(':address', $data['address']);

        if ($stmt->execute()) {
            $patientId = $pdo->lastInsertId();
            echo json_encode(["message" => "Patient record created successfully.", "patientId" => $patientId]);
        } else {
            echo json_encode(["message" => "Failed to create patient record."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => $e]);
    }
}
