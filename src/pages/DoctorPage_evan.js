// Author: Evan Babaker W1633664
import React from "react";
import { Button, H2, LeadParagraph, ListItem, UnorderedList } from "govuk-react";
import { useNavigate } from "react-router-dom";
import { Paragraph } from "govuk-react";

function Doctor() {
  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route);
  };

  return (
    <div>
      {/* Heading */}
      <H2>Doctor Dashboard</H2>

      {/* Description */}
      <LeadParagraph>
        This dashboard provides you with easy access to patient records and appointments.
        You can view patient details and manage appointments conveniently from this page.
      </LeadParagraph>

      {/* Action list */}
      <UnorderedList>
        {/* Action 1 */}
        <ListItem>
          Click on the "View Record" button to see detailed information about a patient.
        </ListItem>
        {/* Action 2 */}
        <ListItem>
          Click on the "View Appointments" button to see the list of upcoming appointments.
        </ListItem>
      </UnorderedList>

      {/* Additional information */}
      <Paragraph>
        Please note that all patient records and appointments are retrieved from the server in real-time,
        ensuring you have the latest information at your fingertips.
      </Paragraph>
      <br />

      {/* Button for viewing appointments */}
      <Button className="Button" onClick={() => navigateTo("/View")}> View Appointments </Button>

      {/* Button for viewing patient record */}
      <Button className="Button" onClick={() => navigateTo("/DoctorPat")}> View Patient Record</Button>
    </div>
  );
}

export default Doctor;
