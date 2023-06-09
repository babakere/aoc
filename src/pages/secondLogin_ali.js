import React, { useState } from "react";
import { Button, H2, H4, InputField, WarningText, Input, Label, H5} from "govuk-react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const handleLogin = async () => {
    localStorage.setItem("email", email); // Save email in local storage

    const response = await fetch("http://localhost:8000/user.php/login ", {
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
      if (data.patientid) {
        localStorage.setItem("patientid", data.patientid);
      }
      navigate(`/${data.type}`);
    } else {
      setShowError(true);
    }
  };

  return (
    <div >
      <H2> Welcome Back to AOC Surgery </H2>
      <Label>

      <H5>Email</H5>
      </Label>
      <Input
      
        type="email"
        label="email"
        value={email}

        onChange={(e) => setEmail(e.target.value)}
      />
      <Label>

      <H5>Password</H5>
      </Label>
      <Input
      
        type="password"
        label="Password"
        value={password}

        onChange={(e) => setPassword(e.target.value)}
      />

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
