<!-- Authour: mahamed mahamud w1830373 -->

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


    // $query= "INSERT INTO Appointment (AppointmentRef, AppointmentDate, AppointmentTime, TypeOfAppointment, AppointmentLocation, StaffID, PatientID) 
    // VALUES (NULL, :appointmentDate, :appointmentTime, :AppointmentType, :appointmentLocation, 2, 1)";

    // $query = "INSERT INTO Appointment (AppointmentRef, AppointmentDate, AppointmentTime, TypeOfAppointment, AppointmentLocation, StaffID, PatientID)
    // VALUES (NULL, '2023-05-10', '10:30:00', 'Checkup', '123 Main St', 2, 3)";

    $query = "INSERT INTO Appointment (AppointmentDate, AppointmentTime, TypeOfAppointment, AppointmentLocation, StaffID, PatientID, AppointmentRef)
    VALUES (:appointmentDate, :appointmentTime, :AppointmentType, :appointmentLocation, 1, 1, NULL)";


    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':appointmentDate', $data->AppointmentDate);
    $stmt->bindParam(':appointmentTime', $data->AppointmentTime);
    $stmt->bindParam(':AppointmentType', $data->appointmentType);
    $stmt->bindParam(':appointmentLocation', $data->AppointmentLocation);


    if ($stmt->execute()) {
        echo json_encode(["message" => "Appointment successful."]);
    } else {
        echo json_encode(["message" => "Unable to book appointment. Please try again."]);
    }
} else {
    echo json_encode(["message" => "Unable to book appointment. Data is incomplete."]);
}


?>