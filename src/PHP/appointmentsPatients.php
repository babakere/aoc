<?php
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

if (
    !empty($data->appointmentType) &&
    !empty($data->AppointmentLocation) &&
    !empty($data->AppointmentDate) &&
    !empty($data->AppointmentTime) 
 
    
    
  
) {
    $query = "INSERT INTO Appointment (AppointmentDate, AppointmentTime, TypeOfAppointment, AppointmentLocation) VALUES (:appointmentDate, :appointmentTime, :appointmentType, :appointmentLocation)";

    $stmt = $pdo->prepare($query);
    // Hash the password before saving to the database
    
  
    $stmt->bindParam(':appointmentDate', $data->AppointmentDate);
    $stmt->bindParam(':appointmentTime', $data->AppointmentTime);
    $stmt->bindParam(':appointmentType', $data->appointmentType);
    $stmt->bindParam(':appointmentLocation', $data->AppointmentLocation);
    



    if ($stmt->execute()) {
        echo json_encode(["message" => "User registered successfully."]);
    } else {
        echo json_encode(["message" => "Unable to register user. Please try again."]);
    }
} else {
    echo json_encode(["message" => "Unable to register user. Data is incomplete."]);
}


?>







