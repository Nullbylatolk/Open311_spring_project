import React ,{Container, Form, FormGroup, Label, Col, Input, FormText, Button, Row} from "reactstrap";


function  ViewForm (){
	return(
	<Container className="bg-light border mt-5"    fluid = "md"    xs="auto">
	
	  <Row xs="2">
  <Col className="bg-light border">
<Form>
  <FormGroup>
    <Label for="exampleEmail">
      Notice
    </Label>
    <Input
      id="exampleEmail"
      name="email"
      placeholder="with a placeholder"
      type="email"
    />
  </FormGroup>
  
 
  
  <FormGroup>
    <Label for="exampleSelect">
      Service
    </Label>
    <Input
      id="exampleSelect"
      name="select"
      type="select"
    >
      <option>
        1
      </option>
      <option>
        2
      </option>
      <option>
        3
      </option>
      <option>
        4
      </option>
      <option>
        5
      </option>
    </Input>
  </FormGroup>
  
  <FormGroup>
    <Label for="exampleEmail">
      Address
    </Label>
    <Input
      id="exampleEmail"
      name="email"
      placeholder="with a placeholder"
      type="email"
    />
  </FormGroup>
  
 
  
  <FormGroup>
    <Label for="exampleText">
      Description
    </Label>
    <Input
      id="exampleText"
      name="text"
      type="textarea"
    />
  </FormGroup>
 
   <FormGroup>
    <Label for="exampleEmail">
      URL
    </Label>
    <Input
      id="exampleEmail"
      name="email"
      placeholder="with a placeholder"
      type="email"
    />
  </FormGroup>
  
 
 
  <Button>
    Submit
  </Button>
</Form>
</Col>
</Row>
</Container>
	);
}

export default ViewForm;


