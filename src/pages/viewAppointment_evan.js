// Author: Evan Babaker W1633664
import React, { useEffect, useState } from "react";
import { Button, Select, Table } from "govuk-react";
import { useNavigate } from "react-router-dom";

function View() {
  const [appointments, setAppointments] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [selectDate, setSelectDate] = useState([]);

  useEffect(() => {
    // Retrieve staff ID from local storage
    const staffID = localStorage.getItem("staffid");

    // Fetch appointments for the specified staff ID
    fetch(`http://localhost:8000/appointment.php?StaffID=${staffID}`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setAppointments(data.Appointments);

        // Extract unique appointment dates
        let dates = [];
        data.Appointments.map((appointment) => {
          if (dates.includes(appointment.AppointmentDate.toString())) {
            // Skip duplicate dates
          } else {
            dates.push(appointment.AppointmentDate.toString());
          }
        });

        setSelectDate(dates);
        setSelectValue(dates.length > 0 ? dates[0] : "");
      })
      .catch((error) => console.error(error));
  }, []);

  const [filteredAppointments, setFilteredAppointments] = useState([]);

  useEffect(() => {
    // Filter appointments based on selected date
    setFilteredAppointments(
      appointments.filter(
        (appointment) => appointment.AppointmentDate.toString() === selectValue
      )
    );
  }, [appointments, selectValue]);

  const navigate = useNavigate();

  // Function to navigate to the specified route
  const navigateTo = (route) => {
    navigate(route);
  };

  // Define the headers to include in the table
  const headersToInclude = [
    "AppointmentRef",
    "AppointmentDate",
    "AppointmentTime",
    "TypeOfAppointment",
    "PatientID",
  ];

  return (
    <div className="loginPage">
      {/* Render select dropdown to choose a date */}
      {appointments && appointments.length > 0 ? (
        <>
          <Select
            input={selectDate}
            className="view"
            label="Select a Date"
            onChange={(e) => setSelectValue(e.target.value)}
            value={selectValue}
          >
            {/* Render options for each unique date */}
            {selectDate.map((date) => (
              <option key={date} value={date}>{`${date.substr(
                0,
                4
              )}/${date.substr(4, 2)}/${date.substr(6, 2)}`}</option>
            ))}
          </Select>

          {/* Render appointments table */}
          <Table className="tab">
            <Table.Row>
              {/* Render table headers */}
              {Object.keys(appointments[0])
                .filter((key) => headersToInclude.includes(key))
                .map((key) => (
                  <Table.CellHeader key={key}>{key}</Table.CellHeader>
                ))}
            </Table.Row>
            {/* Render table rows for filtered appointments */}
            {filteredAppointments.map((appointment) => (
              <Table.Row key={appointment.AppointmentRef}>
                {Object.keys(appointment)
                  .filter((key) => headersToInclude.includes(key))
                  .map((key) => (
                    <Table.Cell key={key}>{appointment[key]}</Table.Cell>
                  ))}
              </Table.Row>
            ))}
          </Table>
        </>
      ) : null}

      {/* Button to navigate back to the previous page */}
      <Button onClick={() => navigateTo(-1)}>Back</Button>
    </div>
  );
}

export default View;
