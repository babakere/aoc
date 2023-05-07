import React from "react";
import { Button, InputField, TextArea, Checkbox,Footer, Label, Table, H1,Link, H3 } from "govuk-react";
import DateField from '@govuk-react/date-field';

function Patient(){
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
          firstName,
          lastName,
          //concat the birthdate
          birthDate,
          telNo,
          nhsNumber,
          address,
          gender,
          email,
          password,
        };
    
        console.log("Form Data:", formData);
        try {
          const response = await fetch("http://localhost:8000/appointments.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          const result = await response.json();
          alert(result.message);
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
                        <Table.Row>
                            <Table.Cell>
                                Name
                            </Table.Cell>
                            <Table.Cell>
                                <Button>Cancel Booking</Button>
                            </Table.Cell>

                            </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                Name
                            </Table.Cell>
                            <Table.Cell>
                                <Button>Cancel Booking</Button>
                            </Table.Cell>

                            </Table.Row>
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
                    <DateField className="requestApointment">Appointment Time</DateField>
                    <InputField className="requestApointment">  time: </InputField>
                    <InputField className="requestApointment">  type of appointment: </InputField>
                    <InputField className="requestApointment">  location for appointment: </InputField>

                    <Button className="requestApointment" onClick={handleSubmit}>confirm</Button>

                </div>

                <div classname = "SymptomsChecker2" >
                    <h1> Symptom Checker </h1>
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