<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$email = $_GET['email'];

$dbname = '/Users/ImranBary/AOC.db';
$conn = new PDO("sqlite:$dbname");

// Check if the Patient table exists
$table_check = $conn->query("SELECT name FROM sqlite_master WHERE type='table' AND name='Patient'");

if ($table_check->fetch()) {
    // Patient table exists, proceed with the DELETE statement
    $sql = "DELETE FROM Patient WHERE Email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':email', $email);
    $stmt->execute();

    echo json_encode(["result" => "success", "message" => "Patient deregistered successfully"]);
} else {
    // Patient table not found
    echo json_encode(["result" => "error", "message" => "Patient table not found"]);
}

$conn = null;
?>
