import React, { useState, useEffect } from "react";
import { Button, Heading, Table, Link, Input, BackLink } from "govuk-react";
import { useNavigate } from "react-router-dom";
function PatientRecord() {
  const [patientDetails, setPatientDetails] = useState({});
  const [vaccineRecords, setVaccineRecords] = useState([]);
  const [editing, setEditing] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const email = localStorage.getItem("email");

    // Fetch patient details
    fetch(`http://localhost:8000/getPatientDetails.php?email=${email}`)
      .then((response) => response.json())
      .then((data) => {
        setPatientDetails(data);

        // Fetch vaccine records using the retrieved NHS number
        fetch(
          `http://localhost:8000/getVaccineRecords.php?NHSNumber=${data.NHSNumber}`
        )
          .then((response) => response.json())
          .then((data) => {
            if (Array.isArray(data)) {
              setVaccineRecords(data);
            } else {
              setVaccineRecords([]);
            }
          });
      });
  }, []);

  function updatePatientDetails(email, fieldName, fieldValue) {
    const updatedDetails = {
      ...patientDetails,
      [fieldName]: fieldValue,
    };

    fetch("http://localhost:8000/updatePatient.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...updatedDetails, Email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPatientDetails(updatedDetails);
      });
  }

  const startEditing = (field) => {
    setEditing({ ...editing, [field]: true });
  };

  const stopEditing = (field) => {
    setEditing({ ...editing, [field]: false });
  };

  const handleInputChange = (event, field) => {
    setPatientDetails({ ...patientDetails, [field]: event.target.value });
  };

  return (
    <div>
      <BackLink href="#" onClick={() => navigate(-1)}>
        Back
      </BackLink>
      <Heading>Patient Record</Heading>

      <Table caption="Patient Details">
        <Table.Row>
          <Table.CellHeader>NHS Number</Table.CellHeader>
          <Table.Cell>{patientDetails.NHSNumber}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.CellHeader>Forename</Table.CellHeader>
          <Table.Cell>
            {editing.Name ? (
              <Input
                value={patientDetails.Name}
                onChange={(e) => handleInputChange(e, "Name")}
              />
            ) : (
              patientDetails.Name
            )}
          </Table.Cell>
          <Table.Cell>
            {editing.Name ? (
              <Button
                onClick={() => {
                  stopEditing("Name");
                  updatePatientDetails(
                    patientDetails.Email,
                    "Name",
                    patientDetails.Name
                  );
                }}
              >
                Update
              </Button>
            ) : (
              <Link onClick={() => startEditing("Name")}>Edit</Link>
            )}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.CellHeader>Surname</Table.CellHeader>
          <Table.Cell>
            {editing.Surname ? (
              <Input
                value={patientDetails.Surname}
                onChange={(e) => handleInputChange(e, "Surname")}
              />
            ) : (
              patientDetails.Surname
            )}
          </Table.Cell>
          <Table.Cell style={{ width: "5vw" }}>
            {editing.Surname ? (
              <Button
                onClick={() => {
                  stopEditing("Surname");
                  updatePatientDetails(
                    patientDetails.Email,
                    "Surname",
                    patientDetails.Surname
                  );
                }}
              >
                Update
              </Button>
            ) : (
              <Link onClick={() => startEditing("Surname")}>Edit</Link>
            )}
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.CellHeader>Date of Birth</Table.CellHeader>
          <Table.Cell>{patientDetails.PersonDB}</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.CellHeader>Gender</Table.CellHeader>
          <Table.Cell>{patientDetails.Gender}</Table.Cell>
        </Table.Row>
      </Table>

      <Table caption="Vaccine Records">
        {vaccineRecords.map((record, index) => (
          <React.Fragment key={index}>
            <Table.Row>
              <Table.CellHeader>
                Date of Vaccination: {record.VaccinationDate}
              </Table.CellHeader>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
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
    </div>
  );
}

export default PatientRecord;
