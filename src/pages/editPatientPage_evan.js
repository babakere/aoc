// Author: Evan Babaker W1633664
import React from "react";
import { Button, ErrorText, H4, InputField } from "govuk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Edit() {
  const { state } = useLocation(); // Retrieve the patient object from the location state
  const [patient, setPatient] = useState(state); // Store the patient object in component state

  const navigate = useNavigate();
  const back = (a) => {
    navigate(a); // Navigate to the specified route
  };

  const handleChange = (key, value) => {
    setPatient((previousPatient) => ({ ...previousPatient, [key]: value })); // Update the patient object when input fields are changed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    let isFalse = false;
    Object.keys(patient).forEach((data) => {
      if (!patient[data]) {
        isFalse = true;
      }
    });

    if (isFalse) {
      return; // Stop the submission if any field is empty
    }

    const params = patient.PatientID;

    try {
      const response = await fetch(
        `http://localhost:8000/patients.php?PatientId=${params}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(patient),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        navigate("/DoctorPat"); // Navigate to the "/doctor" route after successful submission
      } else {
        console.log("Response status", response.status);
      }
    } catch (err) {
      console.log(err);
      console.log(patient);
    }
  };

  const headersToInclude = ["Name", "Surname"];

  return (
    <>
      <form onSubmit={handleSubmit}>
        {Object.entries(patient).map(([key, value]) => {
          if (headersToInclude.includes(key)) {
            return (
              <React.Fragment key={key}>
                <InputField
                  label={key}
                  value={value}
                  type="text"
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="input"
                >
                  {key}
                </InputField>
                {!value && (
                  <ErrorText key={`${key}-error`}>{key} can't be empty</ErrorText>
                )}
              </React.Fragment>
            );
          }
          return null;
        })}
        
        <Button className="Button" type="submit" onClick={handleSubmit}>
          
          Save
        </Button>
        <Button className="Button" type="button" onClick={() => back(-1)}>
          Back
        </Button>
        
      </form>
    </>
  );
}

export default Edit;
