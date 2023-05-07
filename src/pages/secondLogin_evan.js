import React, { useState } from "react";
import { Button, H2, H4, InputField } from "govuk-react";
import { json, useNavigate } from "react-router-dom";


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loggedIn, setIsLogged] = useState("");
    const[invalid, setInvalid] = useState(false);
    const navigate = useNavigate();

    const back = (a) => {
    navigate(a);

  }
  const  userData = [{
    username:"123",
    password:"123",
    type: "doctor"
  }, {
    username:"1234",
    password:"1234",
    type: "admin"
  },
  {
    username:"1235",
    password:"1235",
    type: "patient"
  }
]

  function login(){
    let type =localStorage.getItem("userType")
    //get request
    // console.log(user)
   
    const loggedIn = userData.find(
      (data) => data.username === username && data.password === password
    );
    if(loggedIn){
      delete loggedIn["password"];
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("user", JSON.stringify(loggedIn));
      setIsLogged("true");
      back(`/${type}`)
    }
    else{
      setInvalid(true);
    }

  }

  

  return(
    <div className="input">
      <H2> Welcome Back to AOC Surgery </H2>    
      <InputField className="input"
      onChange ={(e) => setUsername(e.target.value)}>Email</InputField>
      <InputField className="input"
      onChange ={(e) => setPassword(e.target.value)}>Password</InputField>

      <Button className="Button" onClick={()=>back(-1)}>Back</Button>
      <Button className="Button" 
      disabled={!username || !password}
      onClick={login}>Login</Button>
    </div>

  ) 
  
}

export default Login;