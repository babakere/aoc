import React, { useState, useEffect } from "react";

import { Button, InputField, Checkbox,Table, H1, H3, DateField } from "govuk-react";
import {Heading,Panel,LoadingBox,} from "govuk-react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [appointmentType, setAppointmentType] = useState("");
  const [AppointmentLocation, setAppointmentLocation] = useState("");
  const [AppointmentDate, setAppointmentDate] = useState("");
  const [AppointmentTime, setAppointmenTime] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [isPanelVisible, setIsPanelVisible] = useState(false);
  const navigate = useNavigate();

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

    if (!appointmentType) newErrors.appointmentType = "Complete First Name";
    if (!AppointmentLocation) newErrors.AppointmentLocation = "Complete Last Name";
    if (!AppointmentDate) newErrors.AppointmentDate = "Complete Birth Date";
    if (!AppointmentTime) newErrors.AppointmentTime = "Complete Tel No";
    
    // Check if date inputs are numbers and within the correct ranges
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
        newErrors.AppointmentDate = "Invalid Birth Date";
      }
    }
    // Check if telNo and nhsNumber inputs are numbers only
    if (AppointmentTime && isNaN(AppointmentTime)) newErrors.AppointmentTime = "Invalid Tel No";
    

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
        navigate("/main");
      }, 2000);
    } catch (error) {
      
      setLoading(false);
    }
  };

  return (
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

export default Register;

























// import {React, useEffect} from "react";
// import { Button, InputField, Checkbox,Table, H1, H3, DateField } from "govuk-react";

// import { useState } from "react";


// function Patient(){

//   const [appointmentDate, setAppointmentDate] = useState();
//   const [appointmentTime, setApointmentTime] = useState("");
//   const [appointmentType, setAppointmentType] = useState("");
//   const [appointmentLocation, setAppointmentLocation] = useState("");
//   const [isPanelVisible, setIsPanelVisible] = useState(false); // Define setIsPanelVisible
//   const [errors, setErrors] = useState({});
  

  
  

//   const [dateInput, setDateInput] = useState({ day: "", month: "", year: "" });

//   useEffect(() => {
//     const { day, month, year } = dateInput;
//     if (day !== undefined && month !== undefined && year !== undefined) {
//       setAppointmentDate(`${day}/${month}/${year}`);
//     } else {
//       setAppointmentDate(undefined);
//     }
//   }, [dateInput]);

//   const handleDateFieldChange = (date) => {
//     setDateInput(date);
//   };




  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = {
//       appointmentDate,
//       appointmentTime,
//       appointmentType,
//       appointmentLocation
//     };
  
//     const { day, month, year } = dateInput;
  
//     const newErrors = {};
  
//     if (appointmentDate) {
//       if (
//         isNaN(day) ||
//         isNaN(month) ||
//         isNaN(year) ||
//         day < 1 ||
//         day > 31 ||
//         month < 1 ||
//         month > 12 ||
//         year < 1900 ||
//         year > new Date().getFullYear()
//       ) {
//         newErrors.appointmentDate = "Invalid appointment date";
//       }
//     } else {
//       newErrors.appointmentDate = "Appointment date is required";
//     }
  
//     console.log("Form Data:", formData);
//     try {
//       const response = await fetch("http://localhost:8000/appointmentsPatients.php", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });
  
//       const result = await response.json();
//       console.log(result)
//     //   alert(result);
  
  
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
  
  

      
//     return(
//         <div>
//             <H1> Patient page</H1>
            
//             <div className="grid">
                
//                 <div className = "parientInfo" >
                    
//                     <H3 className = "parientInfo"> Patient info </H3>

//                     <Table className = "parientInfo">
                        
//                         <Table.Row>
//                             <Table.Cell>
//                                 Name
//                             </Table.Cell>
//                             <Table.Cell>
//                                 <Button>Cancel Booking</Button>
//                             </Table.Cell>

//                         </Table.Row>

        
//                     </Table>    


//                 </div>
                
//                 <div className="requestApointment" >
                    
//                     <H3 className="requestApointment"> Request Appointment </H3>
//                     <DateField 
//                     input={{
//                         value: dateInput,
//                         onChange: handleDateFieldChange,
//                       }}
//                        className="requestApointment">Appointment date</DateField>

                        
//                     <InputField 
//                     value={appointmentTime}
//                     onChange={(e) => setApointmentTime(e.target.value)}
//                      className="requestApointment">  time: </InputField>

                    
//                     <InputField 
//                     value={appointmentType}
//                     onChange={(e) => setAppointmentType(e.target.value)}
//                      className="requestApointment">  type of appointment: </InputField>
                    
//                     <InputField 
//                     value={appointmentLocation}
//                     onChange={(e) => setAppointmentLocation(e.target.value)}
//                      className="requestApointment">  location for appointment: </InputField>

//                     <Button className="requestApointment" onClick={handleSubmit}>confirm</Button>

//                 </div>

//                 <div className = "reg-right" >
//                     <H3> Symptom Checker </H3>
//                     <Checkbox className="symptoms">Coughing</Checkbox>
//                     <Checkbox className="symptoms">Shortness of breath or difficulty breathing</Checkbox>
//                     <Checkbox className="symptoms">Fever or chills</Checkbox>
//                     <Checkbox className="symptoms">Fatigue</Checkbox>
//                     <Checkbox className="symptoms">Muscle or body aches</Checkbox>
//                     <Checkbox className="symptoms">Headache</Checkbox>
//                     <Checkbox className="symptoms">New loss of taste or smell</Checkbox>
//                     <Checkbox className="symptoms">Sore throat</Checkbox>
//                     <Checkbox className="symptoms">Nausea or vomiting</Checkbox>
//                     <Checkbox className="symptoms">Congestion or runny nose</Checkbox>
//                     <Checkbox className="symptoms">Diarrhea</Checkbox>
                    


//                 </div>
                
               
//             </div>


                
//         </div>
            
//     );
// }

// export default Patient;