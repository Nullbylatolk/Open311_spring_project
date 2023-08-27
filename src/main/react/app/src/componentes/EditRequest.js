import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form, FormGroup, Label, Col, Input, Button, Row, Alert } from "reactstrap";

function EditRequest() {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [requestData, setRequestData] = useState({
    serviceNotice: "",
    serviceName: "",
    addressString: "",
    requestDescription: "",
    mediaUrl: ""
  });

  useEffect(() => {
    const { data } = location.state || {};
    if (data) {
      setRequestData(data);
    }
  }, [location.state]);
  
  
  
  
   const handleInputChange = event => {
    const { name, value } = event.target;
    setRequestData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  
  

  function saveRequest(event) {
    event.preventDefault();

    const serviceRequestId = location.state?.data?.serviceRequestId; // Obtén el ID del recurso
    if (!serviceRequestId) {
      console.error('No se pudo obtener el ID del recurso');
      return;
    }

    const endPoint = `/api/v2/requests/${serviceRequestId}`; // Construye la URL

    fetch(endPoint, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(() => {
        navigate("/request");
      })
      .catch((err) => {
        setMessage(err.toString());
      });
  }

  // Resto del código

  return (
    <Container className="bg-light border mt-5" fluid="md" xs="auto">
      <Row xs="2">
        <Col className="bg-light border">
          {message && <Alert color="danger"> {message}</Alert>}
          <Form onSubmit={saveRequest}>
            <FormGroup>
              <Label for="inputNotice">Notice</Label>
              <Input id="inputNotice" name="serviceNotice" placeholder="write Notice" value={requestData.serviceNotice}
              
               onChange={handleInputChange} // Agrega onChange
                />
            </FormGroup>

            <FormGroup>
              <Label for="serviceName">Service</Label>
              <Input id="serviceName" name="serviceName" value={requestData.serviceName}   onChange={handleInputChange} />
            </FormGroup>

            <FormGroup>
              <Label for="addressString">Address</Label>
              <Input id="addressString" name="addressString" placeholder="write address" value={requestData.addressString}   onChange={handleInputChange} />
            </FormGroup>

            <FormGroup>
              <Label for="requestDescription">Description</Label>
              <Input id="requestDescription" name="requestDescription" type="textarea" value={requestData.requestDescription}   onChange={handleInputChange} />
            </FormGroup>

            <FormGroup>
              <Label for="mediaUrl">URL</Label>
              <Input id="mediaUrl" name="mediaUrl" placeholder="URL" value={requestData.mediaUrl}   onChange={handleInputChange} />
            </FormGroup>

            <Button>Update</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default EditRequest;