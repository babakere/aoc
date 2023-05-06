import React, { useState, useRef } from "react";
import InputField from "@govuk-react/input-field";
import DateField from "@govuk-react/date-field";
import { Button, Heading, Panel, Radio } from "govuk-react";
import { Navigate, useNavigate } from "react-router-dom"; // Import useHistory

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

  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const navigate = useNavigate(); // Add this line

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      firstName,
      lastName,
      //concat the birthdate
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
      const response = await fetch("http://localhost:8000/register.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(result.message);

      setIsPanelVisible(true); // Set panel visible

      // Hide panel after a few seconds (3 seconds in this example) and redirect to '/main'
      setTimeout(() => {
        setIsPanelVisible(false);
        navigate("/main"); // Redirect to '/main'
      }, 3000);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDateFieldChange = (date) => {
    const { day, month, year } = date;
    const dateString = `${day}-${month}-${year}`;
    setBirthDate(dateString);
  };
  return (
    <div>
      <Heading>Register Page</Heading>
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
              {/* <DateField
              value={birthDate}
              onChange={(e) => handleDateFieldChange(e.target)}
            ></DateField> */}
              <DateField
                input={{
                  value: {
                    day: birthDate.split("-")[0],
                    month: birthDate.split("-")[1],
                    year: birthDate.split("-")[2],
                  },
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
      {isPanelVisible && <Panel title="Registration complete" />}
    </div>
  );
}

export default Register;

/* import React from "react";
import Header from "../header";
import InputField from "@govuk-react/input-field";
import DateField from "@govuk-react/date-field";
import { Button, Heading } from "govuk-react";

function Register() {
  <Header></Header>;
  return (
    <div>
      <Heading>Register Page</Heading>
      <div className="input-container">
        <div className="reg-left">
          <InputField>First Name</InputField>
          <InputField>Middle Name</InputField>
          <InputField>Last Name</InputField>
          <DateField></DateField>
          <InputField
            input={{
              autoComplete: "email",
              name: "group1",
              type: "email",
            }}
          >
            Tel No
          </InputField>
        </div>
        <div className="reg-right">
          <InputField>Address</InputField>
          <InputField>Street Name</InputField>
          <InputField>Post Code</InputField>
          <InputField>NHS Number</InputField>
          <InputField
            input={{
              autoComplete: "email",
              name: "group1",
              type: "email",
            }}
          >
            Email
          </InputField>
          <InputField>Password</InputField>
        </div>
      </div>
      <Button>Submit</Button>
    </div>
  );
}

export default Register;
 */
