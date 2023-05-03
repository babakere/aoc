import "./App.css";
import { Page, Footer } from "govuk-react";
import Main from "./pages/MainPage_ali";
import Deregister from "./pages/deregister_ali";
import Register from "./pages/register_imran";
import PatientRecord from "./pages/patient_record_imran";
import Info from "./info";
import Login from "./pages/secondLogin_evan";
import { Routes, Route } from "react-router-dom";

import Header from "./header";
import LoginSelection from "./pages/loginpage_evan";
function App() {
  return (
    <div className="App">
      <Page header={<Header></Header>}>
        <Routes>
          {/* Evans code */}
          <Route path="/" element={<Info />} />
          <Route path="/loginselection" element={<LoginSelection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/main" element={<Main />} />
          <Route path="/deregister" element={<Deregister />} />
          <Route path="/register" element={<Register />} />
          <Route path="/patientRecord" element={<PatientRecord />} />
        </Routes>
      </Page>
      <Footer></Footer>
    </div>
  );
}

export default App;

/* import YourComponent from "./path/of/your/component";

<Router>
  <Route exact path="/insert/your/path/here" component={YourComponent} />
</Router> */
