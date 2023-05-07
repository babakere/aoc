import React, { useEffect, useState } from "react";
import { Button, Select, Table } from "govuk-react";
import { useNavigate } from "react-router-dom";
import { data } from "jquery";

function View() {
  const [appointments, setAppointments] = useState([]);
  const [selectValue, setSelectValue] = useState("");
  const [selectDate, setSelectDate] = useState([])
  
  useEffect(() => {
const num = +localStorage.getItem("staffid")
console.log(num)
    fetch(`http://localhost:8000/appointment.php?StaffID=${localStorage.getItem("staffid")}`,{
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => {

        setAppointments(data.Appointments)
        let dates = []
        data.Appointments.map((appoinment)=>{
          if(dates.includes(appoinment.AppointmentDate.toString())){
          }else{
            dates.push(appoinment.AppointmentDate.toString())
          }
         })
         
         setSelectDate(dates)
         console.log(data.Appointments)
      })
      .catch((error) => console.error(error));

  }, []);



  const navigate = useNavigate();
    const back = (a) => {
    navigate(a);

  }
  const headersToInclude = ["AppointmentRef", "AppointmentDate", "AppointmentTime", "TypeOfAppointment", "PatientID"];
  
  return(
    <div className="loginPage">
      

      
{appointments && appointments.length >0?(
<>
  <Select input={selectDate} className="view" label="Select a Date">
          {
            selectDate.map((date)=>(
              <option key={date} value={date}>{`${date.substr(0,4)}/${date.substr(4,2)}/${date.substr(6,2)}`}</option>
              
              ))
          }

        </Select>

<Table className="tab">
        

          <Table.Row>
            {Object.keys(appointments[0]).filter((key) => headersToInclude.includes(key)).map((key) => (
              <Table.CellHeader key={key}>{key}</Table.CellHeader>
              ))}
          </Table.Row>
          {appointments.map((appointment) => (
            <Table.Row key={appointment.AppointmentRef}>
              {Object.keys(appointment).filter((key) => headersToInclude.includes(key)).map((key) => (
                <Table.Cell key={key}>{appointment[key]}</Table.Cell>
                ))}
            </Table.Row>
          ))}


        </Table>
        </>

):null}

        <Button onClick={()=>back(-1)}> Back</Button>
      
    </div>

  ) 
  
}

export default View; 
