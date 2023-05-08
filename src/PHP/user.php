<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");

try {
    $pdo = new PDO("sqlite:AOC.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" => "Connection failed: " . $e->getMessage()]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_SERVER['REQUEST_URI'] === '/user.php/login') {
        try {
            $data = json_decode(file_get_contents("php://input"), true);

            // Get the user with the provided email
            $query = "SELECT Email as email, Password as password FROM Patient WHERE Email = :email";
            $stmt = $pdo->prepare($query);
            $stmt->bindParam(':email', $data['email']);
            if ($stmt->execute()) {
                $user = $stmt->fetch(PDO::FETCH_ASSOC);
                if ($user && password_verify($data['password'], $user['password'])) { //this line does not work with verify password
                    echo json_encode(["user" =>  $user["email"], "type" => "patient", "status" => "200"]);
                } else {
                    $query = "SELECT Email as email, Password as password, StaffID FROM Staff WHERE Email = :email AND Password = :password";
                    $stmt = $pdo->prepare($query);
                    $stmt->bindParam(':email', $data['email']);
                    $stmt->bindParam(':password', $data['password']);
                    if ($stmt->execute()) {
                        $user = $stmt->fetch(PDO::FETCH_ASSOC);
                        if ($user) {
                            $query = "SELECT * FROM Doctor WHERE StaffID = :staffid";
                            $stmt = $pdo->prepare($query);
                            $stmt->bindParam(':staffid', $user["StaffID"]);
                            if ($stmt->execute()) {
                                $current = $stmt->fetch(PDO::FETCH_ASSOC);
                                if ($user) {
                                    echo json_encode(["user" =>  $user["email"], "staffid" => $user["StaffID"], "type" => "doctor", "status" => "200"]);
                                } else {
                                    echo json_encode(["user" =>  $user["email"], "staffid" => $user["StaffID"], "type" => "admin", "status" => "200"]);
                                }
                            } else {
                                http_response_code(401);
                                echo json_encode(["message" => "Failed to log in."]);
                            }
                        } else {
                            http_response_code(401);
                            echo json_encode(["message" => 'Invalid username or password']);
                        }
                    } else {
                        http_response_code(401);
                        echo json_encode(["message" => "Failed to log in."]);
                    }
                }
            } else {
                http_response_code(401);
                echo json_encode(["message" => "Failed to log in."]);
            }
        } catch (PDOException $e) {
            http_response_code(401);
            echo json_encode(["message" => $e->getMessage()]);
        }
    }
}
