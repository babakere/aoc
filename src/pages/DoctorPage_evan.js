import React from "react";
import { Button, H2, LeadParagraph, ListItem, UnorderedList } from "govuk-react";
import { useNavigate } from "react-router-dom";
import { Paragraph } from "govuk-react";


function Doctor() {
  const navigate = useNavigate();
  const nav = (a) => {
    navigate(a);
  };

  return (
    <div>
      <H2>Doctor Dashboard</H2>
      <LeadParagraph>
      This dashboard provides you with easy access to patient records and appointments. 
      You can view patient details and manage appointments conveniently from this page.
      </LeadParagraph>
      <UnorderedList>
        <ListItem>
        Click on the "View Record" button to see detailed information about a patient.
        </ListItem>
        <ListItem>
        Click on the "View Appointments" button to see the list of upcoming appointments.
        </ListItem>
      </UnorderedList>
      <Paragraph>
      Please note that all patient records and appointments are retrieved from the server in real-time,
       ensuring you have the latest information at your fingertips.
      </Paragraph>
      <br />
      

      <Button className="Button" onClick={() => nav("/View")}> View Appointments </Button>
      <Button className="Button" onClick={() => nav("/DoctorPat")}> View Patient Record</Button>

    
    </div>
  );
}

export default Doctor;
