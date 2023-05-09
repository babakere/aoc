// author: Imran Feisal w1843601
// Import required dependencies, components and hooks
import React, { useState, useEffect } from "react";
import InputField from "@govuk-react/input-field";
import DateField from "@govuk-react/date-field";
import {
  Button,
  Heading,
  Panel,
  LoadingBox,
  MultiChoice,
  Radio,
} from "govuk-react";
import { useNavigate } from "react-router-dom";

// Define the Register component
function Register() {
  // Declare state variables for form input values and other component states
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
  const [errors, setErrors] = useState({});

  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const navigate = useNavigate();

  const [dateInput, setDateInput] = useState({ day: "", month: "", year: "" });

  // Update the birthDate state variable based on dateInput
  useEffect(() => {
    const { day, month, year } = dateInput;
    if (day && month && year) {
      setBirthDate(`${day}-${month}-${year}`);
    } else {
      setBirthDate("");
    }
  }, [dateInput]);

  // Handle the change in date field input
  const handleDateFieldChange = (date) => {
    setDateInput(date);
  };

  // Handle form submission
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
    const newErrors = {};

    // Validate form inputs and add errors if any
    if (!firstName) newErrors.firstName = "Complete First Name";
    if (!lastName) newErrors.lastName = "Complete Last Name";
    if (!birthDate) newErrors.birthDate = "Complete Birth Date";
    if (!telNo) newErrors.telNo = "Complete Tel No";
    if (!nhsNumber) newErrors.nhsNumber = "Complete NHS Number";
    if (!address) newErrors.address = "Complete Address";
    if (!gender) newErrors.gender = "Complete Gender";
    if (!email) newErrors.email = "Complete Email";
    if (!password) newErrors.password = "Complete Password";
    if (!birthDate) newErrors.birthDate = "Complete Birth Date";
    // Check if date inputs are numbers and within the correct ranges
    const { day, month, year } = dateInput;
    if (birthDate) {
      if (
        isNaN(day) ||
        isNaN(month) ||
        isNaN(year) ||
        day < 1 ||
        day > 31 ||
        month < 1 ||
        month > 12 ||
        year < 1900 ||
        year > new Date().getFullYear()
      ) {
        newErrors.birthDate = "Invalid Birth Date";
      }
    }
    // Check if telNo and nhsNumber inputs are numbers only
    if (telNo && isNaN(telNo)) newErrors.telNo = "Invalid Tel No";
    if (nhsNumber && isNaN(nhsNumber))
      newErrors.nhsNumber = "Invalid NHS Number";

    // Check if there are any errors, and return if so
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form Data:", formData);

    // Submit form data to the server-side script
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

      // Show a success panel after registration and navigate to the main page
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

  // Render the registration form, loading box, and panel
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
                  meta={{ error: errors.firstName, touched: true }}
                >
                  First Name
                </InputField>
                <InputField
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  meta={{ error: errors.lastName, touched: true }}
                >
                  Last Name
                </InputField>
                <DateField
                  input={{
                    value: dateInput,
                    onChange: handleDateFieldChange,
                  }}
                  errorText={errors.birthDate}
                >
                  Date of birth
                </DateField>
                <InputField
                  value={telNo}
                  onChange={(e) => setTelNo(e.target.value)}
                  meta={{ error: errors.telNo, touched: true }}
                >
                  Tel No
                </InputField>
                <InputField
                  value={nhsNumber}
                  onChange={(e) => setNhsNumber(e.target.value)}
                  meta={{ error: errors.nhsNumber, touched: true }}
                >
                  NHS Number
                </InputField>
              </div>
              <div className="reg-right">
                <InputField
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  meta={{ error: errors.address, touched: true }}
                >
                  {" "}
                  Address
                </InputField>
                <MultiChoice
                  label="Gender"
                  meta={{ error: errors.gender, touched: true }}
                >
                  <Radio
                    inline
                    name="group1"
                    value="Male"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    Male
                  </Radio>
                  <Radio
                    inline
                    name="group1"
                    value="Female"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    Female
                  </Radio>
                  <Radio
                    inline
                    name="group1"
                    value="Other"
                    onChange={(e) => setGender(e.target.value)}
                  >
                    Other
                  </Radio>
                </MultiChoice>
                <InputField
                  value={email}
                  input={{
                    autoComplete: "email",
                    name: "group1",
                    type: "email",
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                  meta={{ error: errors.email, touched: true }}
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
                  meta={{ error: errors.password, touched: true }}
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
