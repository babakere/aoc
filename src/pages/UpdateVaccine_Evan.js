// Author: Evan Babaker W1633664
import React, { useState, useEffect } from "react";
import { Button, Heading, Table } from "govuk-react";
import { useNavigate } from "react-router-dom";

function Vaccine() {
  const [patientDetails, setPatientDetails] = useState({});
  const [vaccineRecords, setVaccineRecords] = useState([]);

  useEffect(() => {
    // Retrieve the selected patient from local storage
    const selectedPatient = JSON.parse(localStorage.getItem("selectedPatient"));
    setPatientDetails(selectedPatient);

    // Fetch vaccine records using the retrieved NHS number
    fetch(
      `http://localhost:8000/getVaccineRecords.php?NHSNumber=${selectedPatient.NHSNumber}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVaccineRecords(data);
        } else {
          setVaccineRecords([]);
        }
      });
  }, []);

  const navigate = useNavigate();

  // Function to navigate to the specified route
  const navigateTo = (route) => {
    navigate(route);
  };

  // Define the headers to include in the patient details table
  const headersToInclude = [
    "Name",
    "Surname",
    "Email",
    "PersonDB",
    "Address",
    "Gender",
    "NHSNumber",
  ];

  return (
    <div>
      <Heading>Patient Vaccine Record</Heading>

      <Table>
        {/* Render patient details in a table */}
        {headersToInclude.map((head, index) => (
          <Table.Row key={index}>
            <Table.CellHeader>{head}</Table.CellHeader>
            <Table.Cell>{patientDetails[head]}</Table.Cell>
          </Table.Row>
        ))}
      </Table>

      {/* Button to navigate to the "AddVaccine" page */}
      <Button onClick={() => navigateTo("/AddVaccine")}>Add Vaccine</Button>

      <Table>
        {/* Render vaccine records in a table */}
        {vaccineRecords.map((record, index) => (
          <React.Fragment key={index}>
            <Table.Row>
              <Table.CellHeader>
                Date of Vaccination: {record.VaccinationDate}
              </Table.CellHeader>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                {/* Display vaccine record details */}
                {`${record.DoseNo} ${record.VaccineManufacturer} ${
                  record.VaccineType
                } ${record.VaccineBatchNumber} ${
                  record.Booster ? "Booster" : ""
                }`}
              </Table.Cell>
            </Table.Row>
          </React.Fragment>
        ))}
      </Table>

      {/* Button to navigate back to the previous page */}
      <Button className="Button" type="button" onClick={() => navigateTo(-1)}>
        Back
      </Button>
    </div>
  );
}

export default Vaccine;
