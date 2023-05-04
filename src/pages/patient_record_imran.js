import React from "react";
import { Button, Heading, Table, InsetText } from "govuk-react";
function PatientRecord() {
  return (
    <div className="patient-record-page">
      <Heading>Patient Record</Heading>
      <div className="p-details">
        <Table caption="Patient Details">
          <Table.Row>
            <Table.CellHeader>Name</Table.CellHeader>
            <Table.Cell>James Paul McCartney</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>DOB</Table.CellHeader>
            <Table.Cell>12/07/1954</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>Address</Table.CellHeader>
            <Table.Cell>42 Penny Lane</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.CellHeader>Tel No</Table.CellHeader>
            <Table.Cell>072372323</Table.Cell>
          </Table.Row>
        </Table>
        <div className="p-record-cotainer">
          <div className="p-vacc-record">
            <Table caption="Vaccine Records">
              <Table.Row>
                <Table.CellHeader>Name</Table.CellHeader>
                <Table.Cell>James Paul McCartney</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.CellHeader>DOB</Table.CellHeader>
                <Table.Cell>12/07/1954</Table.Cell>
              </Table.Row>
            </Table>
          </div>
          <div className="p-doc-notes">
            <Heading size={"SMALL"}>Doctor Notes</Heading>
            <InsetText>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque
              sit distinctio cum, aliquam quod vel maiores quas perferendis
              voluptates! A itaque repudiandae architecto quo minima laboriosam
              quos quidem expedita eius!
            </InsetText>
          </div>
        </div>
      </div>

      <Button>Update Records</Button>
    </div>
  );
}
export default PatientRecord;
