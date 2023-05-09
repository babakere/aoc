<?php
// author: Imran Feisal w1843601
// Set the necessary headers for cross-origin requests and JSON content type
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");


// Connect to the SQLite database AOC.db and set error mode to throw exceptions
try {
    $pdo = new PDO("sqlite:AOC.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" => "Connection failed: " . $e->getMessage()]);
    exit();
}

// Get the JSON data from the POST request
$data = json_decode(file_get_contents("php://input"));

// Check if all required fields are present
if (
    !empty($data->firstName) &&
    /*     !empty($data->middleName) && */
    !empty($data->lastName) &&
    !empty($data->birthDate) &&
    /*    !empty($data->telNo) && */
    !empty($data->address) &&
    /*    !empty($data->streetName) &&
    !empty($data->postCode) && */
    !empty($data->nhsNumber) &&
    !empty($data->email) &&
    !empty($data->password)
) {
     // Prepare an SQL query to insert a new user into the Patient table
    $query = "INSERT INTO Patient (Name, Surname, PersonDB, Email, Address, Gender, Password, NHSNumber) VALUES (:firstName, :lastName, :birthDate, :email, :address, :gender, :password, :nhsNumber)";

    $stmt = $pdo->prepare($query);
    // Hash the password before saving to the database
    $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);

     // Bind the user data to the prepared statement
    $stmt->bindParam(':firstName', $data->firstName);
    $stmt->bindParam(':lastName', $data->lastName);
    $stmt->bindParam(':birthDate', $data->birthDate);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':address', $data->address);
    $stmt->bindParam(':gender', $data->gender);
    $stmt->bindParam(':password', $hashedPassword); // Bind hashed password
    $stmt->bindParam(':nhsNumber', $data->nhsNumber);




// Execute the prepared statement and insert the user data into the database
    if ($stmt->execute()) {
        echo json_encode(["message" => "User registered successfully."]);
    } else {
        echo json_encode(["message" => "Unable to register user. Please try again."]);
    }
} else {
    echo json_encode(["message" => "Unable to register user. Data is incomplete."]);
}
