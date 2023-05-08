import React from "react";
import { Button, InputField, TextArea, Checkbox,Footer, Label, Table, H1,Link, H3 } from "govuk-react";
import DateField from '@govuk-react/date-field';

function Patient2(){
    return(
        
            <div classname = "infocontainer">
                
                <div classname = "RequestPrescription2" >

                    <h1> Request Prescription </h1>
                    <InputField id = "patientname" className ="Pinfo" > Name: </InputField>
                    <InputField id = "patientEmail" className ="Pinfo">Email:</InputField>
                    <InputField id = "patientSubject" className ="Pinfo">Subject:</InputField>
                    <InputField id = "patientMessage" className ="Pinfo">Message:</InputField>
                    <Button className ="Pinfo">Request</Button>
                
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
            
    );


    
}

export default Patient2;