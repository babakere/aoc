import "./App.css";
import { Page, Footer } from "govuk-react";
import Main from "./pages/MainPage_ali";
import Deregister from "./pages/deregister_ali";
import Register from "./pages/register_imran";
import PatientRecord from "./pages/patient_record_imran";
import Info from "./info";
import Login from "./pages/secondLogin_evan";
import Patient from "./pages/addAppointment_mo";
import Appointments from "./pages/cancelAndView_mo";


import {Routes,Route, useNavigate} from "react-router-dom";
import Doctor from "./pages/DoctorPage_evan";
import View from "./pages/viewAppointment_evan";

import DoctorPat from "./pages/docPatientRecord_evan";
import Edit from "./pages/editPatientPage_evan";
import RequestAppointment from "./pages/addAppointment_mo";


import Header from "./header";

import LoginSelection from "./pages/loginpage_evan";

import MainPage from "./pages/MainPage_ali";

import { createContext, useState } from "react";
export const useContext = createContext();



function App() {
const [islogged, setIsLogged] = useState(
  localStorage.getItem("isLogged") || "false"
)



  return (
    <div className="App">

<div className="pages">
      <useContext.Provider value={{islogged, setIsLogged}}>

      <Page  header={<Header></Header>}>
        <Routes>
          {/* Evans code */}
          <Route path="/" element={<Info />} />
          <Route path="/loginselection" element={<LoginSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/requestAppointment" element={<RequestAppointment />} />
          {/* cancelAndView */}
          <Route path="/appointments" element={<Appointments />} />  
          
          <Route path="/deregister" element={<Deregister />} />
          <Route path="/mainpage" element={< MainPage/>} />
          <Route path="/register" element={<Register />} />

          <Route path="/patientRecord" element={<PatientRecord />} />

          <Route path="/doctor" element={<Doctor/>} />
          <Route path="/view" element={<View/>}/>

          <Route path="/doctorPat" element={<DoctorPat/>}/>
          <Route path="edit" element={<Edit />}/>


        </Routes>

      </Page>
      </useContext.Provider>
</div>
      <Footer className="footer"></Footer>

    </div>
  );
}

export default App;

/* import YourComponent from "./path/of/your/component";

<Router>
  <Route exact path="/insert/your/path/here" component={YourComponent} />
</Router> */
