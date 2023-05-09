// Author: Evan Babaker W1633664
import React from "react";
import { Button, H2, Tabs, Table, Link } from "govuk-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function DoctorPat() {
  const [testData, setTestData] = useState("");
  
  useEffect(() => {
    // Fetch patient data from the server
    fetch("http://localhost:8000/patients.php", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTestData(data))
      .catch((error) => console.error(error));
  }, []);

  const navigate = useNavigate();
  
  const nav = (a, patient) => {
    // Navigate to the specified route and pass the selected patient as location state
    navigate(a, { state: patient });
    localStorage.setItem("selectedPatient", JSON.stringify(patient)); // Save patient data in localStorage
  };

  const headersToInclude = [
    "Name",
    "Surname",
    "PersonDB",
    "Email",
    "Address",
    "Gender",
    "NHSNumber"
  ];

  return (
    <div>
      {testData ? (
        <>
          <H2>View the Doctors Patients record page</H2>
          <H2>Patients</H2>
          <Table>
            <Table.Row>
              {/* Render table headers based on headersToInclude array */}
              {Object.keys(testData[0])
                .filter((key) => headersToInclude.includes(key))
                .map((head) => (
                  <Table.CellHeader key={head}>{head}</Table.CellHeader>
                ))}
            </Table.Row>
            {testData.map((patient, index) => (
              <Table.Row key={index}>
                {/* Render table cells based on headersToInclude array */}
                {Object.keys(patient)
                  .filter((key) => headersToInclude.includes(key))
                  .map((data) => (
                    <Table.Cell key={data}>{patient[data]}</Table.Cell>
                  ))}
                {/* Display links for editing and updating vaccine */}
                <Table.Cell>
                  <Link onClick={() => nav("/edit", patient)}>Edit</Link>
                </Table.Cell>
                <Table.Cell>
                  <Link onClick={() => nav("/Vaccine", patient)}>
                    Update Vaccine
                  </Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
          {/* Button for navigating back */}
          <Button onClick={() => nav(-1)}>Back</Button>
        </>
      ) : null}
    </div>
  );
}

export default DoctorPat;
