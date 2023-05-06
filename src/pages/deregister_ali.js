import React from "react";
import { Heading, Button } from "govuk-react";

function Deregister() {
  const handleDeregister = () => {
    const email = localStorage.getItem("email");

    fetch(`http://localhost:8000/deregisterPatient.php?email=${email}`)
      .then((response) => response.text())
      .then((data) => console.log(data));
  };

  return (
    <div>
      <Heading> Deregister page</Heading>
      <Button onClick={handleDeregister}>Deregister</Button>
    </div>
  );
}

export default Deregister;
