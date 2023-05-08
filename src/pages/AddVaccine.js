import React, { useState } from "react";
import { Button, ErrorText, H4, InputField } from "govuk-react";
import { useNavigate } from "react-router-dom";

function AddVaccine() {
  const [vaccine, setVaccine] = useState({});
  const [patient, setPatient] = useState();
  const [fieldModified, setFieldModified] = useState({});
  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setVaccine((prevVaccine) => ({ ...prevVaccine, [key]: value }));
    setFieldModified((prevFieldModified) => ({ ...prevFieldModified, [key]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const selectedPatient = JSON.parse(localStorage.getItem("selectedPatient")).NHSNumber

setVaccine((previous)=>({...previous,["NHSNumber"]:selectedPatient}))
console.log(vaccine)
    let isFalse = false;
    Object.keys(vaccine).forEach((data) => {
      if (!vaccine[data]) {
        isFalse = true;
      }
    });
    if (isFalse) {
      return;
    }

    try {
        const response = await fetch("http://localhost:8000/Vaccines.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(vaccine),
        });
      
        if (response.ok) {
          const result = await response.json();
          console.log(result);
          // navigate("/doctor");
        } else {
          console.log("Response status", response.status);
          const errorResponse = await response.text();
          console.log("Error response", errorResponse);
        }
      } catch (err) {
        console.log(err);
        console.log(vaccine);
      }
  };

  const headersToInclude = [
    
"DoseNo",
"VaccinationDate",
"VaccineManufacturer",
"DiseaseTargeted",
"VaccineType",
"Product",
"VaccineBatchNumber",
"CountryOfVaccination",
"Authority",
"Site",
"TotalSeriesOfDoses",
"DisplayName",
"SnomedCode",
"DateEntered",
"ProcedureCode",
"Booster",
  ];

  return (
    <>
      <form onSubmit={handleSubmit}>
        {headersToInclude.map((header) => (
          <React.Fragment key={header}>
            {header === "Booster" ? (
              <div >
                <label>{header}</label>
                <div>
                  <input
                    type="radio"
                    id={`${header}-yes`}
                    name={header}
                    value="1"
                    onChange={(e) => handleChange(header, e.target.value)}
                  />
                  <label htmlFor={`${header}-yes`}>Yes</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id={`${header}-no`}
                    name={header}
                    value="0"
                    onChange={(e) => handleChange(header, e.target.value)}
                  />
                  <label htmlFor={`${header}-no`}>No</label>
                </div>
              </div>
            ) : (
              <React.Fragment key={header}>
                <InputField
                  label={header}
                  value={vaccine[header] || ""}
                  type="text"
                  onChange={(e) => handleChange(header, e.target.value)}
                >
                  {header}
                </InputField>
                {fieldModified[header] && !vaccine[header] && (
                  <ErrorText key={`${header}-error`}>
                    {header} can't be empty
                  </ErrorText>
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        ))}
        <Button className="Button" type="submit" onClick={handleSubmit}>
          Save
        </Button>
        <Button className="Button" type="button" onClick={() => navigate(-1)}>
          Back
        </Button>
      </form>
    </>
  );
}

export default AddVaccine;
