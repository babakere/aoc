import React from "react";
// import ButtonToTop from "./backToTop";
import { InputField, Button } from "govuk-react";

function deregister(){
    // const handleAjax = () =>{
    //     $.ajax({
    //         type: "POST",
    //         url: "http://localhost:8000/server.php",
    //         data: { name: "wigfblrwihebfihewr" },
    //         success(data) {
    //             console.log(data);
    //         },
    //     });
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
    
        
        try {
          const response = await fetch("http://localhost:8000/register.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(""),
          });
    
          const result = await response.json();
          alert(result.message);
        } catch (error) {
          console.error("Error:", error);
        }
      };

    
    return(
        <div>
            <h1> De-Register page</h1>
            <p>Please confirm your details to de-register
            <br/>yourself from AOC Surgery
            </p>
 
            <Button className= "govuk-button" onClick={handleSubmit} data-module = "govuk-button"> De-register</Button>
{/* <ButtonToTop>top</ButtonToTop> */}
        </div>
    );
}

export default deregister;