<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

$postData = json_decode(file_get_contents("php://input"), true);

try {
    $conn = new PDO('sqlite:/Users/ImranBary/AOC.db');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "UPDATE Patient SET Name = :name, Surname = :surname WHERE Email = :email";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(":name", $postData["Name"]);
    $stmt->bindParam(":surname", $postData["Surname"]);
    $stmt->bindParam(":email", $postData["Email"]);

    $stmt->execute();

    echo json_encode(["message" => "Patient record updated successfully."]);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}

$conn = null;
?>
