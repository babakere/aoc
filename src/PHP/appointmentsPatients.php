<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

try {
    $pdo = new PDO("sqlite:AOC.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" => "Connection failed: " . $e->getMessage()]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

if (!empty($data->appointmentDate) &&!empty($data->appointmentTime) && !empty($data->appointmentType) && !empty($data->appointmentLocation) ) {

    $query = "INSERT INTO Appointment (AppointmentDate, AppointmentTime, TypeOfAppointment, AppointmentLocation) VALUES (:firstName, :lastName, :birthDate, :email, :address, :gender, :password, :nhsNumber)";

    $stmt = $pdo->prepare($query);



    $stmt->bindParam(':appointmentDate', $data->appointmentDate);
    $stmt->bindParam(':appointmentTime', $data->appointmentTime);
    $stmt->bindParam(':appointmentType', $data->appointmentType);
    $stmt->bindParam(':AppointmentLocation', $data->appointmentLocation);


    if ($stmt->execute()) {
        echo json_encode(["message" => "User registered successfully."]);
    } else {
        echo json_encode(["message" => "Unable to register user. Please try again."]);
    }




}else {
    echo json_encode(["message" => "Unable to register user. Data is incomplete."]);
}