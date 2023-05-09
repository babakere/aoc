import React, { useState } from "react";
import { Button, H2, H4, Radio, WarningText } from "govuk-react";
import { useNavigate } from "react-router-dom";
{/*This defines a new React component called LoginSelection.*/}
function LoginSelection() {     
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");

  const [showError, setShowError] = useState(false);
{/*This code defines the goLogin function which will be called when the user clicks the "Confirm Selection" button*/}
  const goLogin = (a) => {
    if (userType) {  {/* If the userType is not empty,the goLogin function stores the selected userType in the browser's local storage and navigates the user to the login page with navigate(a).*/}
      localStorage.setItem("userType", userType);
      navigate(a);
      setShowError(false);
    } else { {/* If userType is empty, the goLogin function sets the showError flag to true to indicate that the user must select a user type before proceeding.*/}
      setShowError(true);
    }
  };
{/*It returns a JSX element that renders the user interface for selecting the user type. */}
  return (
    <div>
      <H2>Welcome Back to AOC Surgery</H2>
      <H4>Choose one From The List</H4>
      <div>
        <Radio
          checked={userType === "patient"}
          onChange={() => setUserType("patient")}    
        >
          Patient
        </Radio>
        {/*'onchange prop is used to update the userType state variable with the specific value'*/}
        <Radio
          checked={userType === "doctor"}
          onChange={() => setUserType("doctor")}  
        >
          Doctor
        </Radio>
    {/*Radio components use the checked prop to set whether or not each radio button is currently selected based on the value of the userType state variable. */}
        <Radio     
          checked={userType === "admin"}
          onChange={() => setUserType("admin")} 
        >
          Admin
        </Radio>
      </div>
{/*showError state variable is used to control the rendering of the warning message*/}
      {showError && (    
        <WarningText className="errorMessage">  {/* warning message bis only rendered if the showError state variable is true*/}
          Please Confirm a Selection
        </WarningText>
      )}

      <Button onClick={() => goLogin("/login")}>Confirm Selection</Button>
    </div>
  );
}

export default LoginSelection;