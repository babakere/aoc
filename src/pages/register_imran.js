import React, { useState, useEffect } from "react";
import InputField from "@govuk-react/input-field";
import DateField from "@govuk-react/date-field";
import { Button, Heading, Panel, LoadingBox } from "govuk-react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [telNo, setTelNo] = useState("");
  const [nhsNumber, setNhsNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const navigate = useNavigate();

  const [dateInput, setDateInput] = useState({ day: "", month: "", year: "" });

  useEffect(() => {
    const { day, month, year } = dateInput;
    if (day && month && year) {
      setBirthDate(`${day}-${month}-${year}`);
    } else {
      setBirthDate("");
    }
  }, [dateInput]);

  const handleDateFieldChange = (date) => {
    setDateInput(date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      birthDate,
      telNo,
      nhsNumber,
      address,
      gender,
      email,
      password,
    };

    console.log("Form Data:", formData);
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message);

      setIsPanelVisible(true);
      setLoading(false);

      setTimeout(() => {
        setIsPanelVisible(false);
        navigate("/main");
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  return (
    <div>
      <Heading>Register Page</Heading>
      <LoadingBox loading={loading} backgroundColorOpacity={0.85}>
        {!isPanelVisible && (
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <div className="reg-left">
                <InputField
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                >
                  First Name
                </InputField>
                <InputField
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                >
                  Last Name
                </InputField>
                <DateField
                  input={{
                    value: dateInput,
                    onChange: handleDateFieldChange,
                  }}
                ></DateField>
                <InputField
                  value={telNo}
                  onChange={(e) => setTelNo(e.target.value)}
                >
                  Tel No
                </InputField>
                <InputField
                  value={nhsNumber}
                  onChange={(e) => setNhsNumber(e.target.value)}
                >
                  NHS Number
                </InputField>
              </div>
              <div className="reg-right">
                <InputField
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                >
                  {" "}
                  Address
                </InputField>
                <InputField
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  Gender
                </InputField>
                <InputField
                  value={email}
                  input={{
                    autoComplete: "email",
                    name: "group1",
                    type: "email",
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                >
                  Email
                </InputField>
                <InputField
                  value={password}
                  input={{
                    autoComplete: "new-password",
                    name: "group1",
                    type: "password",
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                >
                  Password
                </InputField>
              </div>
            </div>
            <Button type="submit">Submit</Button>
          </form>
        )}
      </LoadingBox>
      {isPanelVisible && (
        <Panel title="Registration complete" className="panel">
          You have successfully registered!
        </Panel>
      )}
    </div>
  );
}

export default Register;
