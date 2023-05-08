<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");



try {
<<<<<<< HEAD:src/PHP/doctor.php
    $pdo = new PDO("sqlite:AOC.db");
    $pdo1 = new PDO("sqlite:vaccines.db");
=======
    $pdo = new PDO("sqlite:/Users/evan/Documents/AOCdatabase/AOC.db");
    $pdo1 = new PDO("sqlite:/Users/evan/Documents/AOCdatabase/vaccines.db");
>>>>>>> abf1a392b3c7efdc58051a2d373dbb9f7de95d9b:PHP/doctor.php

    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" => "Connection failed: " . $e->getMessage()]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

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
    $query = "INSERT INTO Patient (Name, Surname, PersonDB, Email, Address, Gender, Password, NHSNumber) VALUES (:firstName, :lastName, :birthDate, :email, :address, :gender, :password, :nhsNumber)";

    $stmt = $pdo->prepare($query);

    $stmt->bindParam(':firstName', $data->firstName);
    $stmt->bindParam(':lastName', $data->lastName);
    $stmt->bindParam(':birthDate', $data->birthDate);
    $stmt->bindParam(':email', $data->email);
    $stmt->bindParam(':address', $data->address);
    $stmt->bindParam(':gender', $data->gender);
    $stmt->bindParam(':password', $data->password);
    $stmt->bindParam(':nhsNumber', $data->nhsNumber);





    if ($stmt->execute()) {
        echo json_encode(["message" => "User registered successfully."]);
    } else {
        echo json_encode(["message" => "Unable to register user. Please try again."]);
    }
} else {
    echo json_encode(["message" => "Unable to register user. Data is incomplete."]);
}
