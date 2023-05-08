import {React, useEffect} from "react";
import { Button, InputField, TextArea, Checkbox,Footer, Label, Table, H1,Link, H3, DateField } from "govuk-react";

import { useState } from "react";


function Patient(){

  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setApointmentTime] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [appointmentLocation, setAppointmentLocation] = useState("");
    
  
  

  const [dateInput, setDateInput] = useState({ day: "", month: "", year: "" });

  useEffect(() => {
    const { day, month, year } = dateInput;
    if (day && month && year) {
        setAppointmentDate(`${day}-${month}-${year}`);
    } else {
        setAppointmentDate("");
    }
  }, [dateInput]);

  const handleDateFieldChange = (date) => {
    setDateInput(date);
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            appointmentDate,
            appointmentTime,
            appointmentType,
            appointmentLocation
          
        };

        const { day, month, year } = dateInput;
        
        if (appointmentDate) {
        if (
            isNaN(day) ||
            isNaN(month) ||
            isNaN(year) ||
            day < 1 ||
            day > 31 ||
            month < 1 ||
            month > 12 ||
            year < 1900 ||
            year > new Date().getFullYear()
        ) {
            newErrors.appointmentDate = "Invalid appointment date";
        }
        }
    
        console.log("Form Data:", formData);
        try {
            
            const response = await fetch("http://localhost:8000/appointmentsPatients.php", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(formData),
            });
      
            const result = await response.json();
            alert(result.message);
      
            setIsPanelVisible(true);
            
      
            setTimeout(() => {
              setIsPanelVisible(false);
              navigate("/main");
            }, 2000);
          } catch (error) {
            console.error("Error:", error);
            
          }
      };

      
    return(
        <div>
            <H1> Patient page</H1>
            
            <div className="grid">
                
                <div classname = "parientInfo" >
                    
                    <H3 classname = "parientInfo"> Patient info </H3>

                    <Table classname = "parientInfo">
                        
                        <Table.Row>
                            <Table.Cell>
                                Name
                            </Table.Cell>
                            <Table.Cell>
                                <Button>Cancel Booking</Button>
                            </Table.Cell>

                        </Table.Row>

        
                    </Table>    


                </div>
                
                <div className="requestApointment" >
                    
                    <H3 className="requestApointment"> Request Appointment </H3>
                    <DateField 
                    input={{
                        value: appointmentDate,
                        onChange: handleDateFieldChange,
                      }}
                       className="requestApointment">Appointment date</DateField>


                    <InputField 
                    value={appointmentTime}
                    onChange={(e) => setApointmentTime(e.target.value)}
                     className="requestApointment">  time: </InputField>

                    
                    <InputField 
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value)}
                     className="requestApointment">  type of appointment: </InputField>
                    
                    <InputField 
                    value={appointmentLocation}
                    onChange={(e) => setAppointmentLocation(e.target.value)}
                     className="requestApointment">  location for appointment: </InputField>

                    <Button className="requestApointment" onClick={handleSubmit}>confirm</Button>

                </div>

                <div classname = "SymptomsChecker2" >
                    <H3> Symptom Checker </H3>
                    <Checkbox className="symptoms">Coughing</Checkbox>
                    <Checkbox className="symptoms">Shortness of breath or difficulty breathing</Checkbox>
                    <Checkbox className="symptoms">Fever or chills</Checkbox>
                    <Checkbox className="symptoms">Fatigue</Checkbox>
                    <Checkbox className="symptoms">Muscle or body aches</Checkbox>
                    <Checkbox className="symptoms">Headache</Checkbox>
                    <Checkbox className="symptoms">New loss of taste or smell</Checkbox>
                    <Checkbox className="symptoms">Sore throat</Checkbox>
                    <Checkbox className="symptoms">Nausea or vomiting</Checkbox>
                    <Checkbox className="symptoms">Congestion or runny nose</Checkbox>
                    <Checkbox className="symptoms">Diarrhea</Checkbox>
                    


                </div>
                
               
            </div>

               

            
                
        </div>
            
      

        

    );
}

export default Patient;