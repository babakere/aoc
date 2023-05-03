import React from "react";
import Header from "../header";
import InputField from "@govuk-react/input-field";
import DateField from "@govuk-react/date-field";
import { Button, Heading } from "govuk-react";
import FileUpload from "@govuk-react/file-upload";
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
          <FileUpload>Upload Photo</FileUpload>
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
