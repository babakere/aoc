import React, { useState, useEffect } from "react";
import { Heading, Button, LoadingBox } from "govuk-react";

function Deregister() {
  const [loading, setLoading] = useState(false);
  const [deregistered, setDeregistered] = useState(false);

  const handleDeregister = () => {
    const email = localStorage.getItem("email");

    setLoading(true);
    fetch(`http://localhost:8000/deregisterPatient.php?email=${email}`)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setDeregistered(true);
      });
  };

  useEffect(() => {
    if (deregistered) {
      setTimeout(() => {
        setLoading(false);
        window.location.href = "/main";
      }, 2000);
    }
  }, [deregistered]);

  return (
    <LoadingBox
      loading={loading}
      spinnerColor="#0b0c0c"
      backgroundColor="#ffffff"
      backgroundColorOpacity={0.85}
      timeIn={800}
      timeOut={200}
    >
      <div>
        <Heading> Deregister page</Heading>
        <Button onClick={handleDeregister}>Deregister</Button>
      </div>
    </LoadingBox>
  );
}

export default Deregister;
