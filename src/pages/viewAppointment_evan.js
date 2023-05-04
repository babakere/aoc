import React, { useEffect, useState } from "react";
import { Button, Select, Table } from "govuk-react";
import { useNavigate } from "react-router-dom";

function View() {
  let testData = [{
    date:"2023/04/05",
    names:["name1","name2","name3"]
  },{
    date:"2023/04/06",
    names:["name4","name5","name6"]
  }]

  const [selectValue,setSelectValue] = useState("2023/04/05")
  const [selectData,setSelectData] = useState(["name1","name2","name3"])

  function handleSelection(event){
    const value = event.target.value;
    setSelectValue(value)
    const selectedBooking = testData.find(booking => booking.date === value);
    if (selectedBooking) {
      setSelectData(selectedBooking.names);
    } else {
      setSelectData([]);
    }
  }



  const navigate = useNavigate();
    const back = (a) => {
    navigate(a);

  }
  
  return(
    <div className="loginPage">
      
        
        <Select input={{onChange: handleSelection}} className="view" label="Select a Date">
          <option value="2023/04/05">2023/04/05</option>
          <option value="2023/04/06">2023/04/06</option>
        </Select>

        <Table className="tab">
        {
           selectData
           .map((name) => (
             <Table.Row key={name}>
               <Table.CellHeader>Booking</Table.CellHeader>
               <Table.Cell>{name}</Table.Cell>
             </Table.Row>
           ))
        }
        </Table>


        <Button onClick={()=>back(-1)}> Back</Button>
      
    </div>

  ) 
  
}

export default View;