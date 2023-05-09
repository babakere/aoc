<?php
// author: Imran Feisal w1843601
// Set the necessary headers for cross-origin requests and JSON content type
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Get the email parameter from the GET request
$email = $_GET['email'];

// Connect to the SQLite database AOC.db and set error mode to throw exceptions
try {
    $db = new PDO('sqlite:AOC.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare an SQL query to select patient details from the Patient table based on the email
    $stmt = $db->prepare('SELECT * FROM Patient WHERE Email = :email');

    // Bind the email parameter to the prepared statement
    $stmt->bindParam(':email', $email, PDO::PARAM_STR);
    $stmt->execute();

    // Return the patient details as a JSON object
    $patientDetails = $stmt->fetch(PDO::FETCH_ASSOC);

    echo json_encode($patientDetails);
} catch (PDOException $e) {
    // In case of error, return the error message as JSON
    echo json_encode(['error' => $e->getMessage()]);
}
