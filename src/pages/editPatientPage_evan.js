import React from "react";
import { Button, ErrorText, H4, InputField } from "govuk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Edit() {
    const {state}= useLocation();
    const [patient, setPatient] = useState(state);
console.log(patient)
    const navigate = useNavigate();
    const back = (a) => {
    navigate(a);

  }

  const handleChange = (key, value) => {
    setPatient((beforePatient) => ({ ...beforePatient, [key]: value }));
  };
  //block scope

  const handleSubmit = async (e) => {
    e.preventDefault();
    let isFalse = false;
    Object.keys(patient).forEach((data) => {
      if (!patient[data]) {
        isFalse = true;
      }
    });
    if (isFalse) {
      return;
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
        console.log(result)
        navigate("/doctor");
      } else {
        console.log('Response status', response.status);
      }
    } catch (err) {
      console.log(err);
      console.log(patient)
    }
  };
 


  return (
    <>
      
      <form className="loginPage" onSubmit={handleSubmit}>
        {Object.entries(patient).map(([key, value]) => (
            <React.Fragment key={key}>

          <InputField
            key={key}
            label={key}
            value={value}
            type="text"
            onChange={(e) => handleChange(key, e.target.value)}
            >
            {key}
          </InputField>
          {!value?(
              
              <ErrorText key={`${key}-error`}>{key} can't be empty</ErrorText>
              ):null}

              </React.Fragment>

        ))}
        <Button className="Button" type="submit" onClick={handleSubmit}>
          Save
        </Button>
        <Button className="Button" type="button" onClick={() => back(-1)}>Back</Button>
      </form>
    </>
  );
  
}

export default Edit;


