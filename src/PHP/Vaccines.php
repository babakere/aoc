<?php
// Author: Evan Babaker W1633664

// Set the appropriate HTTP response headers for CORS and content type to JSON
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

try {
    // Establish a PDO (PHP Data Objects) database connection to the SQLite database file named "vaccines.db"
    $pdo = new PDO("sqlite:vaccines.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // If connection fails, return an error message as JSON and exit
    echo json_encode(["message" => "Connection failed: " . $e->getMessage()]);
    exit();
}

// Retrieve the JSON data from the request body and decode it into a PHP object
$data = json_decode(file_get_contents("php://input"));

// Initialize an array to store any validation errors
$errors = [];

// Perform required field validation
if (empty($data->DoseNo)) {
    $errors[] = "DoseNo is required.";
}

if (empty($data->VaccineManufacturer)) {
    $errors[] = "VaccineManufacturer is required.";
}

if (empty($data->VaccineType)) {
    $errors[] = "VaccineType is required.";
}

if (empty($data->VaccineBatchNumber)) {
    $errors[] = "VaccineBatchNumber is required.";
}

if (empty($data->Booster)) {
    $errors[] = "Booster is required.";
}

if (empty($data->NHSNumber)) {
    $errors[] = "NHSNumber is required.";
}

if (empty($errors)) {
    // If there are no validation errors, prepare the SQL query to insert the vaccine record into the "vaccines" table
    $query = "INSERT INTO vaccines (DoseNo, VaccinationDate, VaccineManufacturer, DiseaseTargeted, VaccineType, Product, VaccineBatchNumber, CountryOfVaccination, Authority, Site, TotalSeriesOfDoses, DisplayName, SnomedCode, DateEntered, ProcedureCode, Booster, NHSNumber) VALUES (:doseNo, :vaccinationDate, :manufacturer, :diseaseTargeted, :vaccineType, :product, :batchNumber, :countryOfVaccination, :authority, :site, :totalSeriesOfDoses, :displayName, :snomedCode, :dateEntered, :procedureCode, :booster, :NHSNumber)";

    // Prepare the SQL statement
    $stmt = $pdo->prepare($query);

    // Bind the parameter values to the prepared statement
    $stmt->bindParam(':doseNo', $data->DoseNo);
    $stmt->bindParam(':vaccinationDate', $data->VaccinationDate);
    $stmt->bindParam(':manufacturer', $data->VaccineManufacturer);
    $stmt->bindParam(':diseaseTargeted', $data->DiseaseTargeted);
    $stmt->bindParam(':vaccineType', $data->VaccineType);
    $stmt->bindParam(':product', $data->Product);
    $stmt->bindParam(':batchNumber', $data->VaccineBatchNumber);
    $stmt->bindParam(':countryOfVaccination', $data->CountryOfVaccination);
    $stmt->bindParam(':authority', $data->Authority);
    $stmt->bindParam(':site', $data->Site);
    $stmt->bindParam(':totalSeriesOfDoses', $data->TotalSeriesOfDoses);
    $stmt->bindParam(':displayName', $data->DisplayName);
    $stmt->bindParam(':snomedCode', $data->SnomedCode);
    $stmt->bindParam(':dateEntered', $data->DateEntered);
    $stmt->bindParam(':procedureCode', $data->ProcedureCode);
    $stmt->bindParam(':booster', $data->Booster, PDO::PARAM_BOOL);
    $stmt->bindParam(':NHSNumber', $data->NHSNumber);



    // Execute the prepared statement
    if ($stmt->execute()) {
        // If the execution is successful, return a success message as JSON
        echo json_encode(["message" => "Vaccine record inserted successfully."]);
    } else {
        // If the execution fails, return an error message as JSON
        echo json_encode(["message" => "Unable to insert vaccine record. Please try again."]);
    }
} else {
    // If there are validation errors, return an error message along with the validation errors as JSON
    echo json_encode(["message" => "Unable to insert vaccine record. Data is incomplete.", "errors" => $errors]);
}
