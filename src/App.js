import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./App.css";
import { Page, Footer } from "govuk-react";
import Main from "./pages/MainPage_ali";
import Deregister from "./pages/deregister_ali";
import Register from "./pages/register_imran";
import PatientRecord from "./pages/patient_record_imran";

import Login from "./pages/secondLogin_ali";

import Request from "./pages/addAppointment_mo";
import Appointments from "./pages/cancelAndView_mo";



import Vaccine from "./pages/UpdateVaccine_Evan";


import Doctor from "./pages/DoctorPage_evan";
import View from "./pages/viewAppointment_evan";
import DoctorPat from "./pages/docPatientRecord_evan";
import Edit from "./pages/editPatientPage_evan";

import Header from "./header";

import LoginSelection from "./pages/loginpage_ali";

import AddVaccine from "./pages/AddVaccine_Evan";

import { createContext, useState } from "react";
export const useContext = createContext();

function App() {
  const [islogged, setIsLogged] = useState(
    localStorage.getItem("isLogged") || "false"
  );

  return (
    <div className="App">
      <div className="pages">
        <useContext.Provider value={{ islogged, setIsLogged }}>
          <Page header={<Header></Header>}>
            <Routes>
              {/* Evans code */}

              <Route path="/main" element={<Main />} />
              <Route path="/" element={<Navigate to="/main" />} />

              <Route path="/loginselection" element={<LoginSelection />} />
              <Route path="/login" element={<Login />} />

              <Route path="/request" element={<Request />} />

              <Route path="/deregister" element={<Deregister />} />

              <Route path="/register" element={<Register />} />

              <Route path="/patientRecord" element={<PatientRecord />} />
              <Route path="/appointments" element={<Appointments />} />

              <Route path="/doctor" element={<Doctor />} />
              <Route path="/view" element={<View />} />
              <Route path="/doctorPat" element={<DoctorPat />} />
              <Route path="edit" element={<Edit />} />
        

              <Route path="/Vaccine" element={<Vaccine />} />
              <Route path="/AddVaccine" element={<AddVaccine />} />
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

