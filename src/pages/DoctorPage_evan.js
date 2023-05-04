import React from "react";
import { Button, H1, H3, Select } from "govuk-react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./logoutButton";
function Doctor() {
  const navigate = useNavigate();
  const nav = (a) => {
  navigate(a);

}

      return(
        
        <div>
         <LogoutButton></LogoutButton>
            <H1>Welcome Doctor</H1>
            
            
            <Button className="Button" onClick={()=>nav("/View")}> View Appointments </Button>
            <Button className="Button" onClick={()=>nav("/DoctorPat")}> View Patient Record</Button>


            


        </div>
    
      ) 
      
    }
    
    export default Doctor;