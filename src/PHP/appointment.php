<?php
// Author: Evan Babaker W1633664

// Set the appropriate HTTP response headers for CORS and content type to JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

try {
    // Establish a PDO (PHP Data Objects) database connection to the SQLite database file named "AOC.db"
    $pdo = new PDO("sqlite:AOC.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // If connection fails, return an error message as JSON and exit
    echo json_encode(["message" => "Connection failed: " . $e->getMessage()]);
    exit();
}

// Check if the HTTP request method is GET
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Get the value of the "StaffID" parameter from the query string
    $staffid = $_GET['StaffID'];

    // Prepare the SQL query to select all appointments where the StaffID matches the provided value
    $query = "SELECT * FROM Appointment WHERE StaffID = :staffid";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':staffid', $staffid);

    // Execute the prepared statement
    if ($stmt->execute()) {
        // Initialize an empty array to store the fetched appointments
        $appointments = [];

        // Fetch each row of the result set and add it to the appointments array
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $appointments[] = $row;
        }

        // Return the fetched appointments as JSON
        echo json_encode(["Appointments" => $appointments]);
    } else {
        // If unable to retrieve appointments, return an error message as JSON
        echo json_encode(["message" => "Unable to retrieve appointments. Please try again."]);
    }
}
