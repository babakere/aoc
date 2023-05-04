import React from "react";
// import ButtonToTop from "./backToTop";
import { InputField, Button } from "govuk-react";

function deregister(){
    const handleAjax = () =>{
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/server.php",
            data: { name: "wigfblrwihebfihewr" },
            success(data) {
                console.log(data);
            },
        });
    }

    
    return(
        <div>
            <h1> De-Register page</h1>
            <p>Please confirm your details to de-register
            <br/>yourself from AOC Surgery
            </p>
 
            <Button class= "govuk-button" onClick={handleAjax} data-module = "govuk-button"> De-register</Button>
{/* <ButtonToTop>top</ButtonToTop> */}
        </div>
    );
}

export default deregister;