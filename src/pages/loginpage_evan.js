import React from "react";
import { Button, H2, H4, InputField } from "govuk-react";
import { Checkbox } from "govuk-react";
import { useNavigate } from "react-router-dom";

function LoginSelection() {
const navigate = useNavigate();
const goLogin = () => {
    navigate("/login")

  }

  return(
    <div>
      <H2> Welcome Back to AOC Surgery </H2>
      <H4> Choose one From The List</H4>
      <div className="checkBox">
      <Checkbox className="loginRadio"> Patient</Checkbox>
      <Checkbox className="loginRadio"> Doctor</Checkbox>
      <Checkbox className="loginRadio"> Admin</Checkbox>
      </div>
      <Button onClick={goLogin}>Confirm Selection</Button>
      
    </div>

  ) 
  
}

export default LoginSelection;