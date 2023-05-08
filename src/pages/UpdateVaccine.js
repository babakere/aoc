import React, { useState, useEffect } from "react";
import { Button, Heading, Table } from "govuk-react";
import { useNavigate } from "react-router-dom";

function Vaccine() {
  const [patientDetails, setPatientDetails] = useState({});
  const [vaccineRecords, setVaccineRecords] = useState([]);


  useEffect(() => {
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
  const nav = (a) => {
    navigate(a);
  };





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
        {headersToInclude.map((head, index) => (
          <Table.Row key={index}>
            <Table.CellHeader>{head}</Table.CellHeader>
            <Table.Cell>{patientDetails[head]}</Table.Cell>
          </Table.Row>
        ))}
      </Table>

      <Button onClick={() => nav("/AddVaccine")}>Add Vaccine</Button>

      <Table>
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

      <Button className="Button" type="button" onClick={() => nav(-1)}>
        Back
      </Button>
    </div>
  );
}

export default Vaccine;
