// Author: Evan Babaker W1633664

import React, { useEffect, useState } from "react";
import { Button, ErrorText, H4, InputField, Label, Input, Radio } from "govuk-react";
import { useNavigate } from "react-router-dom";

function AddVaccine() {
  const [vaccine, setVaccine] = useState({});
  const [submit, setSubmit] = useState(false);
  const [errors, setErrors] = useState([]);
  
  const navigate = useNavigate();
  
  useEffect(() => {
    // Retrieve selected patient's NHSNumber from localStorage and set it in the vaccine state
    const selectedPatient = JSON.parse(localStorage.getItem("selectedPatient")).NHSNumber;
    setVaccine((previous) => ({ ...previous, ["NHSNumber"]: selectedPatient }));
    setErrors((previous) => ( [...previous]));
  }, []);
  
  const handleChange = (key, value) => {
    // Update the vaccine state when input fields are modified
    setVaccine((prevVaccine) => ({ ...prevVaccine, [key]: value }));
    // setFieldModified((prevFieldModified) => ({ ...prevFieldModified, [key]: true }));
  };

  const handleSubmit = async (e) => {
    setSubmit(true)
    e.preventDefault();
    // const isFalse = Object.values(vaccine).filter((value) => !value);
    const caughtErrors = headersToInclude.filter((head)=> !vaccine[head])
    setErrors(caughtErrors)
    console.log(errors)
    if (caughtErrors.length) {
      // Display an error message or take appropriate action when any field is empty
      console.log("Please fill out all fields");
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
        navigate("/doctor");
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
              <div>
                <Label>{header}</Label>
                <div>
                <Radio
                    id={`${header}-yes`}
                    name={header}
                    value="1"
                    checked={vaccine[header] === "1"}
                    onChange={(e) => handleChange(header, e.target.value)}
                  >Yes</Radio>
                  
                </div>
                <div>
                <Radio
                    id={`${header}-no`}
                    name={header}
                    value="0"
                    checked={vaccine[header] === "0"}
                    
                    onChange={(e) => handleChange(header, e.target.value)}
                  >No</Radio>
                  {submit && errors.includes(header) && !vaccine[header] ? <ErrorText>Please choose yes or no</ErrorText> : null}
                  
                
                  
                </div>
                
              </div>
            ) : (
              <React.Fragment key={header}>
                
                <InputField
                  label={header}
                  value={vaccine[header] || ""}
                  type="text"
                  meta={submit && errors.includes(header) && !vaccine[header] ?{ error:`Missing ${header}`, touched:true }
                    :false
                  }
                  onChange={(e) => handleChange(header, e.target.value)}
                >
                  {header}
                </InputField>
                <br/>
              
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