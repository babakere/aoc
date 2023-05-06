import React, { useState, useEffect } from "react";
import { Button, Heading, Table } from "govuk-react";

function PatientRecord() {
  const [patientDetails, setPatientDetails] = useState({});
  const [vaccineRecords, setVaccineRecords] = useState([]);

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

  return (
    <div className="patient-record-page">
      <Heading>Patient Record</Heading>
      <div className="p-details">
        <Table caption="Patient Details">
          <Table.Row>
            <Table.CellHeader>NHS Number</Table.CellHeader>
            <Table.Cell>{patientDetails.NHSNumber}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>Forename</Table.CellHeader>
            <Table.Cell>{patientDetails.Name}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>Surname</Table.CellHeader>
            <Table.Cell>{patientDetails.Surname}</Table.Cell>
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

        <div className="p-vacc-record">
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
      </div>

      <Button>Update Records</Button>
    </div>
  );
}

export default PatientRecord;

/* import React from "react";
import { Button, Heading, Table, InsetText } from "govuk-react";
function PatientRecord() {
  return (
    <div className="patient-record-page">
      <Heading>Patient Record</Heading>
      <div className="p-details">
        <Table caption="Patient Details">
          <Table.Row>
            <Table.CellHeader>NHS Number</Table.CellHeader>
            <Table.Cell>012023</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>Forename</Table.CellHeader>
            <Table.Cell>James</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>Surname</Table.CellHeader>
            <Table.Cell>McCartney</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>Date of Birth</Table.CellHeader>
            <Table.Cell>12/12/1928</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>Gender</Table.CellHeader>
            <Table.Cell>Male</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>Tel No</Table.CellHeader>
            <Table.Cell>072372323</Table.Cell>
          </Table.Row>
        </Table>

        <div className="p-vacc-record">
          <Table caption="Vaccine Records">
            <Table.Row>
              <Table.CellHeader>Date of Vaccine</Table.CellHeader>
              <Table.Cell>
                Vaccine details,Vaccine details,Vaccine details
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.CellHeader>Date of Vaccine</Table.CellHeader>
              <Table.Cell>
                Vaccine details,Vaccine details,Vaccine details
              </Table.Cell>
            </Table.Row>
          </Table>
        </div>
      </div>

      <Button>Update Records</Button>
    </div>
  );
}
export default PatientRecord;
 */
