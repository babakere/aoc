import React from "react";
import { Button, H2, Tabs, Table, Link } from "govuk-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function DoctorPat() {
  const [testData, setTestData] = useState("");
  // let testData = [{
  //   name: "S.Phillips",
  //   date: "2023/04/05",
  //   address: "72 Guild Street",
  //   number: "07700 900457",
  //   email: "sarah.phillips@example.com"
  // },{
  //   name: "Evan",
  //   date: "2023/04/05",
  //   address: "73 Guild Street",
  //   number: "07701 900457",
  //   email: "sfdfsh.phillips@example.com"
  // },{
  //   name: "Evan",
  //   date: "2023/04/05",
  //   address: "73 Guild Street",
  //   number: "07701 900457",
  //   email: "sfdfsh.phillips@example.com"
  // } ]

  useEffect(() => {
    fetch("http://localhost:8000/patients.php", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setTestData(data))
      .catch((error) => console.error(error));
  }, []);

  const navigate = useNavigate();
    // Save patient data in localStorage

  const nav = (a, patient) => {
    navigate(a, { state: patient }
      );
      localStorage.setItem("selectedPatient", JSON.stringify(patient));
  };

  const headersToInclude = [

"Name",
"Surname",
"PersonDB",
"Email",
"Address",
"Gender",
"NHSNumber"];

  return (
    <div >
      {testData ? (
        <>
          <H2>View the Doctors Patients record page</H2>
          <H2>Patients </H2>
          <Table>
            <Table.Row>
              {Object.keys(testData[0]).filter((key) => headersToInclude.includes(key)).map((head) => (
                <Table.CellHeader key={head}>{head}</Table.CellHeader>
              ))}
            </Table.Row>
            {testData.map((patient, index) => (
              <Table.Row key={index}>
                {Object.keys(patient).filter((key) => headersToInclude.includes(key)).map((data) =>(
                  <Table.Cell key={data}>{patient[data]}</Table.Cell>
                ))}

                <Table.Cell>
                  <Link onClick={() => nav("/edit", patient)}>Edit</Link>
                </Table.Cell>
                <Table.Cell>
                <Link onClick={() => nav("/Vaccine", patient)}>Update Vaccine</Link>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
          <Button onClick={() => nav(-1)}> Back</Button>
        </>
      ) : null}
    </div>
  );
}

export default DoctorPat;
