import React, { useState, useEffect } from 'react';

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/showAppointments.php')
      .then(response => response.json())
      .then(data => setAppointments(data))
      .catch(error => console.error(error));
  }, []);

  const cancelAppointment = (appointmentRef) => {
    fetch('http://localhost:8000/cancelAppointment.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ appointmentRef })
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
  }

  return (
    <div>
      <h1>Appointments</h1>
      <table>
        <thead>
          <tr>
            <th>Appointment Ref</th>
            <th></th>
            <th>Date</th>
            <th></th>
            <th>Time</th>
            <th></th>
            <th>Type</th>
            <th></th>
            <th>Location</th>
            <th></th>
            <th>Staff ID</th>
            <th></th>
            <th>Patient ID</th>
            <th></th>
            <th>Cancel</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.AppointmentRef}>
              <td>{appointment.AppointmentRef}</td>
              <td></td>
              <td>{appointment.AppointmentDate}</td>
              <td></td>
              <td>{appointment.AppointmentTime}</td>
              <td></td>
              <td>{appointment.TypeOfAppointment}</td>
              <td></td>
              <td>{appointment.AppointmentLocation}</td>
              <td></td>
              <td>{appointment.StaffID}</td>
              <td></td>
              <td>{appointment.PatientID}</td>
              <td></td>
              <td>
                
                <button onClick={() => cancelAppointment(appointment.AppointmentRef)}>Cancel</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;