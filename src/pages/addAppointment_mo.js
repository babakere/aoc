//Authour: mahamed mahamud w1830373

import React, { useState, useEffect } from "react";
import { Button, InputField, Checkbox,Table, H1, H3, DateField } from "govuk-react";
import {Heading,Panel,LoadingBox,} from "govuk-react";
import { useNavigate } from "react-router-dom";


function Request() {
  
  
  const [appointmentType, setAppointmentType] = useState("");
  const [AppointmentLocation, setAppointmentLocation] = useState("");
  const [AppointmentDate, setAppointmentDate] = useState("");
  const [AppointmentTime, setAppointmenTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [isPanelVisible, setIsPanelVisible] = useState(false);
  
  //put date month and year values together
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
      appointmentType,
      AppointmentLocation,
      AppointmentDate,
      AppointmentTime,
    };
    const newErrors = {};

    if (!appointmentType) newErrors.appointmentType = "Complete appointment Type";
    if (!AppointmentLocation) newErrors.AppointmentLocation = "Complete Appointment Location";
    if (!AppointmentDate) newErrors.AppointmentDate = "Complete Appointment Date";
    if (!AppointmentTime) newErrors.AppointmentTime = "Complete Appointment Time";
    
    // Check if date inputs are of valid ranges
    const { day, month, year } = dateInput;
    if (AppointmentDate) {
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
        newErrors.AppointmentDate = "Invalid Appointment Date";
      }
    }
    // Check if Appointment Time inputs are numbers only
    if (AppointmentTime && isNaN(AppointmentTime)) newErrors.AppointmentTime = "Invalid Appointment Time";
    

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("Form Data:", formData);
    try {
      setLoading(true);
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
      setLoading(false);

      setTimeout(() => {
        setIsPanelVisible(false);
        
      }, 2000);
    } catch (error) {
      
      setLoading(false);
    }
  };
  const navigate = useNavigate();
  const goAppointments = (a) => {
      navigate(a);
  };

  return (
    // retrive input and set to the variables that will be sent
    <div>
      <Heading>Request Appointment</Heading>
      <LoadingBox loading={loading} backgroundColorOpacity={0.85}>
        {!isPanelVisible && (
          <form onSubmit={handleSubmit}>
            <div className="input-container">
              <div className="reg-right">
                <InputField
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                  meta={{ error: errors.appointmentType, touched: true }}
                >
                  Appointment Type
                </InputField>
                <InputField
                  value={AppointmentLocation}
                  onChange={(e) => setAppointmentLocation(e.target.value)}
                  meta={{ error: errors.AppointmentLocation, touched: true }}
                >
                  Appointment location 
                </InputField>
                <DateField
                  input={{
                    value: dateInput,
                    onChange: handleDateFieldChange,
                  }}
                  errorText={errors.AppointmentDate}
                >
                  Appointment Date
                </DateField>
                <InputField
                  value={AppointmentTime}
                  onChange={(e) => setAppointmenTime(e.target.value)}
                  meta={{ error: errors.AppointmentTime, touched: true }}
                >
                  Appointment time
                </InputField>
                
              </div>
              
            </div>
            <Button type="submit">Submit</Button>
          </form>
        )}
      </LoadingBox>
      <Button onClick={() => goAppointments("/appointments")}>Veiw Appointments</Button>
      <div className = "reg-right" >
                     <H3> Symptom Checker </H3>
                     <Checkbox className="reg-right">Coughing</Checkbox>
                     <Checkbox className="reg-right">Shortness of breath or difficulty breathing</Checkbox>
                     <Checkbox className="reg-right">Fever or chills</Checkbox>
                     <Checkbox className="reg-right">Fatigue</Checkbox>
                     <Checkbox className="reg-right">Muscle or body aches</Checkbox>
                     <Checkbox className="reg-right">Headache</Checkbox>
                     <Checkbox className="reg-right">New loss of taste or smell</Checkbox>
                     <Checkbox className="reg-right">Sore throat</Checkbox>
                     <Checkbox className="reg-right">Nausea or vomiting</Checkbox>
                     <Checkbox className="reg-right">Congestion or runny nose</Checkbox>
                     <Checkbox className="reg-right">Diarrhea</Checkbox>
                    
     </div>

      
    </div>
  );
}

export default Request;



