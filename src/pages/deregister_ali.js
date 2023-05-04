import React from "react";
// import ButtonToTop from "./backToTop";
import { InputField } from "govuk-react";

function deregister_ali(){
    return(
        <div>
            <h1> De-Register page</h1>
            <p>Please confirm your details to de-register
            <br/>yourself from AOC Surgery
            </p>
            <InputField>NHS NUmber</InputField>
            <InputField>Full Name</InputField>
            <button class= "govuk-button" data-module = "govuk-button"> De-register</button>
{/* <ButtonToTop>top</ButtonToTop> */}
        </div>
    );
}

export default deregister_ali;