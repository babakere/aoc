<?php
// author: Imran Feisal w1843601
// Set the necessary headers for cross-origin requests and JSON content type
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Get the NHSNumber parameter from the GET reques
$NHSNumber = $_GET['NHSNumber'];

// Connect to the SQLite database vaccines.db and set error mode to throw exceptions
try {
    $db = new PDO('sqlite:vaccines.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare an SQL query to select vaccine records from the vaccines table based on the NHS number
    $stmt = $db->prepare('SELECT * FROM vaccines WHERE NHSNumber = :NHSNumber');

    // Bind the NHSNumber parameter to the prepared statement
    $stmt->bindParam(':NHSNumber', $NHSNumber, PDO::PARAM_INT);

    // Execute the prepared statement and fetch all vaccine records from the database
    $stmt->execute();
    $vaccineRecords = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Return the vaccine records as a JSON object
    echo json_encode($vaccineRecords);
} catch (PDOException $e) {
     // In case of error, return the error message as JSON
    echo json_encode(['error' => $e->getMessage()]);
}
