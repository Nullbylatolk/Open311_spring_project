import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { Container, Form, FormGroup, Label, Col, Input, FormText, Button, Row, Alert, ButtonGroup } from "reactstrap";


function ServiceForm() {

  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  function createRequest(event) {
    event.preventDefault();

    console.log(event);

    const endPoint = event.target.action;
    const data = Array.from(event.target.elements)
      .filter((input) => input.name)
      .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});

    fetch(endPoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then((response) => {

      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      return response.json();
    }).then(() => {
      navigate("/services");
    }).catch((err) => {
      setMessage(err.toString());
    });


  }


  return (
    <Container className="bg-dark text-white border border-dark rounded-pill mt-5" fluid="md" xs="auto">

      <Row xs="2">
        <Col className="bg-dark bg-gradient rounded-start">

          {message && <Alert color="danger"> {message}</Alert>}
          <Form action='/api/v2/services/' method="post" onSubmit={createRequest} className="mt-3">
            <FormGroup>
              <Label for="service_code">
                Service Code
              </Label>
              <Input
                id="service_code"
                name="service_code"
                placeholder="write service code"
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
              />
            </FormGroup>


            <FormGroup>
              <Label for="group">
                Service
              </Label>
              <Input
                id="group"
                name="group"
                type="select"
              >
                <option value={1}>
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
              <Label for="keywords">
                Keywords
              </Label>
              <Input
                id="keywords"
                name="keywords"
                placeholder="word 1, word 2, word 3"
              />
            </FormGroup>


      
              <Button
              className="mb-3"

              >


                Create
              </Button>

        
          </Form>
        </Col>


        <Col className="position-relative">
          <div class="position-absolute top-50 start-50 translate-middle">
            <h1 class="text-center">Create Service</h1>
            <p class="text-center">Lorem ipsum dolor sit amet. Est nulla voluptatem et laborum iste aut rerum explicabo eos voluptas sequi non iste omnis? Qui quae adipisci ut cupiditate veritatis At omnis voluptas aut perferendis amet. </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ServiceForm;


