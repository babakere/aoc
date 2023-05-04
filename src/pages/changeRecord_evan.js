import { H2, Button, Table, formData, FormGroup, InputField, Link } from "govuk-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Edit1() {
  const navigate = useNavigate();
  const nav = (a) => {
  navigate(a);

}

  
const testData = {
    names: "S.Phillips",
    date: "2023/04/05",
    address: "72 Guild Street",
    number: "07700 900457",
    email: "sarah.phillips@example.com"
  };

  const [formData, setFormData] = useState(testData);
  const [editName, setEditName] = useState(false);
  const [nameInputValue, setNameInputValue] = useState(formData.names);



  const handleNameEditClick = () => {
    setEditName(true);
  }

  const handleNameSaveClick = () => {
    setFormData({ ...formData, names: nameInputValue });
    setEditName(false);
  
  }

  const handleNameCancelClick = () => {
    setNameInputValue(formData.names);
    setEditName(false);
  }


  return (
    <div className="loginPage">
          <H2> Change your details here </H2><FormGroup>
          <Table className="tab">
              <Table.Row className="tab">
                  <Table.Cell>Name:</Table.Cell>
                  
                      {editName ? (
                        <>
                          <Table.Cell>
                              <InputField type="text" name="names" value={nameInputValue} onChange={(e) => setNameInputValue(e.target.value)} ></InputField><br></br>
                            </Table.Cell>
                            <Table.Cell>

                              <Link onClick={handleNameSaveClick} >Save</Link>
                            </Table.Cell>
                            <Table.Cell>

                              <Link onClick={handleNameCancelClick}>Cancel</Link>
                            </Table.Cell>
                          </>
                      ) : (
                        <>
                        <Table.Cell>
                              <span>{formData.names}</span>
                              
                              </Table.Cell>
                              <Table.Cell>
                              <Link onClick={handleNameEditClick}>Edit</Link>
                              </Table.Cell>
                              </>
                      )}
                  
                  
              </Table.Row>

              <Table.Row>
                  <Table.Cell>Date of birth:</Table.Cell>
                  <Table.Cell>
                      <Link>{formData.date}</Link>
                  </Table.Cell>
                  <Table.Cell> <Button onClick={handleNameEditClick}>Edit</Button></Table.Cell>
              </Table.Row>

              <Table.Row>
                  <Table.Cell>Address:</Table.Cell>
                  <Table.Cell>
                      <Link>{formData.address}</Link>
                      <Button onClick={handleNameEditClick}>Edit</Button>
                  </Table.Cell>
              </Table.Row>

              <Table.Row>
                  <Table.Cell>Contact details:</Table.Cell>
                  <Table.Cell>
                      <span>{formData.number}, DR {formData.email}</span>
                      <Button onClick={handleNameEditClick}>Edit</Button>
                  </Table.Cell>
              </Table.Row>

          </Table>
      </FormGroup>
      <Button onClick={() => nav(-1)}> Back</Button>
        </div>

        
    
      ) 
      
    }
    
    export default Edit1;