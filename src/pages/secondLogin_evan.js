import React, { useState } from "react";
import { Button, H2, H4, InputField, WarningText } from "govuk-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    localStorage.setItem("email", email); // Save email in local storage
    const response = await fetch("http://localhost:8000/user.php/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    console.log(data);
    if (data.status == "200") {
      localStorage.setItem("loggedIn", "true");
      localStorage.setItem("user", JSON.stringify(data.user));
      if (data.staffid) {
        localStorage.setItem("staffid", data.staffid);
      }
      navigate(`/${data.type}`);
    } else {
      setShowError(true);
    }
  };

  return (
    <div className="input">
      <H2> Welcome Back to AOC Surgery </H2>
      <InputField className="input" onChange={(e) => setEmail(e.target.value)}>
        Email
      </InputField>
      <InputField
        className="input"
        onChange={(e) => setPassword(e.target.value)}
      >
        Password
      </InputField>

      {showError && (
        <WarningText className="errorMessage">
          Incorrect email or password
        </WarningText>
      )}

      <Button className="Button" onClick={() => navigate(-1)}>
        Back
      </Button>
      <Button
        className="Button"
        disabled={!email || !password}
        onClick={handleLogin}
      >
        Login
      </Button>
    </div>
  );
}

export default Login;
