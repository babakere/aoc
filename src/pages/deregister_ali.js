import React, { useState, useEffect } from "react";
import { Heading, Button, LoadingBox } from "govuk-react";
{/*This code defines a Deregister function component that uses the useState hook to 
  define two pieces of state: loading and deregistered. Both are initially set to false.*/}
function Deregister() {
  const [loading, setLoading] = useState(false);
  const [deregistered, setDeregistered] = useState(false);

  const handleDeregister = () => {      {/*This code defines a handleDeregister function that is called when the user clicks the "Deregister" button.*/}
    const email = localStorage.getItem("email"); {/* It first retrieves the user's email from local storage, then sets the loading state to true.*/}
    setLoading(true);
    fetch(`http://localhost:8000/deregisterPatient.php?email=${email}`)
      .then((response) => response.text())
      .then((data) => {
        console.log(data);  {/*when the request completes, it logs the response data to the console and sets the deregistered state to true*/}
        setDeregistered(true);
      });
  };
{/*I uses the useEffect hook to watch for changes to the deregistered state. */}
  useEffect(() => {
    if (deregistered) {
      setTimeout(() => { {/*When deregistered becomes true, i sets a timeout for 2 seconds.*/}
        setLoading(false);
        window.location.href = "/main"; {/*When the timeout completes, i sets the loading state back to false and redirects the user to the /main page.*/}
      }, 2000);
    }
  }, [deregistered]);
{/*This code returns a LoadingBox component that displays a spinner when the loading state is true*/}
  return (
    <LoadingBox
      loading={loading}
      spinnerColor="#0b0c0c"
      backgroundColor="#ffffff"
      backgroundColorOpacity={0.85}
      timeIn={800}
      timeOut={200}
    >
      {/* button's onClick event is set to call the handleDeregister function when clicked.*/}
      <div>
        <Heading> Deregister page</Heading>
        <Button onClick={handleDeregister}>Deregister</Button>
      </div>
    </LoadingBox>
  );
}

export default Deregister;
