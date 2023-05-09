<?php
// author: Imran Feisal w1843601
// Set the necessary headers for cross-origin requests and JSON content type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Get the JSON data from the POST request
$postData = json_decode(file_get_contents("php://input"), true);

// Connect to the SQLite database AOC.db and set error mode to throw exceptions
try {
    $conn = new PDO('sqlite:AOC.db');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Prepare an SQL query to update the patient record in the Patient table
    $sql = "UPDATE Patient SET Name = :name, Surname = :surname WHERE Email = :email";
    $stmt = $conn->prepare($sql);

    // Bind the new data to the prepared statement
    $stmt->bindParam(":name", $postData["Name"]);
    $stmt->bindParam(":surname", $postData["Surname"]);
    $stmt->bindParam(":email", $postData["Email"]);

    // Execute the prepared statement and update the patient record in the database
    $stmt->execute();

    // Return a success message
    echo json_encode(["message" => "Patient record updated successfully."]);
} catch (PDOException $e) {
    // In case of error, display the error message
    echo "Error: " . $e->getMessage();
}

// Close the database connection
$conn = null;
