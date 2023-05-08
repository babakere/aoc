import React, { useState } from "react";
import { Button, H2, H4, Radio, WarningText } from "govuk-react";
import { useNavigate } from "react-router-dom";

function LoginSelection() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState("");

  const [showError, setShowError] = useState(false);

  const goLogin = (a) => {
    if (userType) {
      localStorage.setItem("userType", userType);
      navigate(a);
      setShowError(false);
    } else {
      setShowError(true);
    }
  };

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
        <Radio
          checked={userType === "doctor"}
          onChange={() => setUserType("doctor")}
        >
          Doctor
        </Radio>
        <Radio
          checked={userType === "admin"}
          onChange={() => setUserType("admin")}
        >
          Admin
        </Radio>
      </div>

      {showError && (
        <WarningText className="errorMessage">
          Please Confirm a Selection
        </WarningText>
      )}

      <Button onClick={() => goLogin("/login")}>Confirm Selection</Button>
    </div>
  );
}

export default LoginSelection;