import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, FormGroup, Label, Col, Input, Button, Row, Alert } from "reactstrap";



function EditService() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
   const location = useLocation();
  
  
  const [serviceData, setServiceData] = useState({

    service_code: "",
    service_name: "",
    description: "",
    group: "",
    keywords: "",
  });

  useEffect(() => {
    const { data } = location.state || {};
    if (data) {
      setServiceData(data);
    }
  }, [location.state]);
  

  const handleInputChange = event => {
    const { name, value } = event.target;
    setServiceData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  function updateService(event) {
       event.preventDefault();

    const serviceId = location.state?.data?.service_id; // Obtén el ID del recurso
    if (!serviceId) {
      console.error('No se pudo obtener el ID del recurso');
      return;
    }

    const endPoint = `/api/v2/services/${serviceId}`; // Construye la URL

    fetch(endPoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceData),
    })
      .then(response => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(() => {
        navigate("/services");
      })
      .catch(err => {
        setMessage(err.toString());
      });
  }
	
	return(
	<Container className="bg-light border mt-5"    fluid = "md"    xs="auto">
	
	  <Row xs="2">
  <Col className="bg-light border">
  
  {message && <Alert color="danger"> {message}</Alert>}
<Form Form method="put" onSubmit={updateService}>
  <FormGroup>
    <Label for="service_code">
      Service Code
    </Label>
    <Input
      id="service_code"
      name="service_code"
      placeholder="write service code"
        value={serviceData.service_code}
                onChange={handleInputChange}
    />
  </FormGroup>
  
  
  
    <FormGroup>
    <Label for="service_name">
      Service name
    </Label>
    <Input
      id="service_name"
      name="service_name"
      placeholder="write name"
       value={serviceData.service_name}
                onChange={handleInputChange}
    />
  </FormGroup>
  
   <FormGroup>
    <Label for="description">
      Description
    </Label>
    <Input
      id="description"
      name="description"
      type="textarea"
       value={serviceData.description}
                onChange={handleInputChange}
      
    />
  </FormGroup>
 
  
  <FormGroup>
    <Label for="group">
      Service
    </Label>
    <Input
      id="group"
      name="group"
      
       value={serviceData.group}
                onChange={handleInputChange}
    >
    </Input>
  </FormGroup>
  

  
 
 
   <FormGroup>
    <Label for="keywords">
      Keywords
    </Label>
    <Input
      id="keywords"
      name="keywords"
      placeholder="word 1, word 2, word 3"
       value={serviceData.keywords}
                onChange={handleInputChange}
    />
  </FormGroup>
  
 

  <Button 
  CclassName="mb-5"
   color="success"
   
    
    >
    
    
    Submit
  </Button>

</Form>
</Col>
</Row>
</Container>
	);
}

export default EditService;
