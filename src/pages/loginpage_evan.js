import React, { useState } from "react";
import { Button, H2, H4, Checkbox, WarningText } from "govuk-react";
import { useNavigate } from "react-router-dom";

function LoginSelection() {
const navigate = useNavigate();
const [userType, setUserType] = useState("");

const [showError, setShowError] = useState(false);
const goLogin = (a) => {
  if(userType){

    localStorage.setItem("userType", userType)
    navigate(a)
    setShowError(true);

  } else{
    setShowError(true);
  }

  }

  return(
    <div>
      <H2> Welcome Back to AOC Surgery </H2>
      <H4> Choose one From The List</H4>
      <div>
      <Checkbox  checked={userType === "patient"} onClick={() => setUserType("patient")}> Patient</Checkbox>
      <Checkbox checked={userType === "doctor"} onClick={() => setUserType("doctor")}> Doctor</Checkbox>
      <Checkbox checked={userType === "admin"} onClick={() => setUserType("admin")}> Admin</Checkbox>
      
      </div>

      {showError && (
        <WarningText className="errorMessage" >Please Confirm a Selection</WarningText>
      )}
      
      <Button onClick={()=>goLogin("/login")}> Confirm Selection</Button>
      
    </div>

  ) 
  
}

export default LoginSelection;