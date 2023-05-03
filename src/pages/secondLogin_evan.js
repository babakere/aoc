import React from "react";
import { Button, H2, H4, InputField } from "govuk-react";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const back = () => {
    navigate(-1);

  }

  return(
    <div>
      <H2> Welcome Back to AOC Surgery </H2>
      <H4> Choose one From The List</H4>
      
      <InputField className="input">Email</InputField>
      <InputField className="input">Password</InputField>

      <Button className="loginButton" onClick={back}>Back</Button>
      <Button className="loginButton">Login</Button>
    </div>

  ) 
  
}

export default Login;