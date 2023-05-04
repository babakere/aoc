import React from "react";
import { Button, ErrorText, H4, InputField } from "govuk-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

function Edit() {
    const {state}= useLocation();
    const [patient, setPatient] =useState(state);

    const navigate = useNavigate();
    const back = (a) => {
    navigate(a);

  }

  const handleChange = (key, value) => {
    setPatient((beforePatient) => ({ ...beforePatient, [key]: value }));
  };
  //block scope

  const handleSubmit = (e) => {
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
    console.log(patient)
    //update
    navigate("/doctor");
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
        <Button className="Button" type="submit">
          Save
        </Button>
        <Button className="Button" type="button" onClick={() => back(-1)}>Back</Button>
      </form>
    </>
  );
  
}

export default Edit;


