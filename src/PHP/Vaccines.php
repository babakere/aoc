<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

try {
    $pdo = new PDO("sqlite:vaccines.db");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo json_encode(["message" => "Connection failed: " . $e->getMessage()]);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

$errors = [];

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
    $query = "INSERT INTO vaccines (DoseNo, VaccinationDate, VaccineManufacturer, DiseaseTargeted, VaccineType, Product, VaccineBatchNumber, CountryOfVaccination, Authority, Site, TotalSeriesOfDoses, DisplayName, SnomedCode, DateEntered, ProcedureCode, Booster, NHSNumber) VALUES (:doseNo, :vaccinationDate, :manufacturer, :diseaseTargeted, :vaccineType, :product, :batchNumber, :countryOfVaccination, :authority, :site, :totalSeriesOfDoses, :displayName, :snomedCode, :dateEntered, :procedureCode, :booster, :NHSNumber)";


    $stmt = $pdo->prepare($query);

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



    if ($stmt->execute()) {
        echo json_encode(["message" => "Vaccine record inserted successfully."]);
    } else {
        echo json_encode(["message" => "Unable to insert vaccine record. Please try again."]);
    }
} else {
    echo json_encode(["message" => "Unable to insert vaccine record. Data is incomplete.", "errors" => $errors]);
}
