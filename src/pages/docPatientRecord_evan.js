import React from "react";
import { Button, H2, Tabs, Table,Link } from "govuk-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function DoctorPat() {

  let testData = [{
    name: "S.Phillips",
    date: "2023/04/05",
    address: "72 Guild Street",
    number: "07700 900457",
    email: "sarah.phillips@example.com"
  },{
    name: "Evan",
    date: "2023/04/05",
    address: "73 Guild Street",
    number: "07701 900457",
    email: "sfdfsh.phillips@example.com"
  }]



  const navigate = useNavigate();
  const nav = (a,patient) => {
  navigate(a,{state:patient});

}
      return(
        <div className="loginPage">
        <H2>View the Doctors Patients record page</H2>
        <H2>Patients </H2>
        <Table>
       <Table.Row>

        {Object.keys(testData[0]).map((head) =>(
          <Table.CellHeader key={head}>
            {head}
           </Table.CellHeader>))}
             </Table.Row>
             {testData.map((patient, index)=> (
               <Table.Row key={index}>
              {Object.keys(patient).map((data) =>(
                <Table.Cell key={data}>{patient[data]}
                </Table.Cell>
              ))}
                
          <Table.Cell>
          <Link onClick={()=>nav("/edit",patient)} >Edit</Link>
          </Table.Cell>
              </Table.Row>
             ))}
        
          
       
          </Table>
        <Button onClick={()=>nav(-1)}> Back</Button>
        </div>
    
      ) 
      
    }
    
    export default DoctorPat;