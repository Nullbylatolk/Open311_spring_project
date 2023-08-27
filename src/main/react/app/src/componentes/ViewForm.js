import { useState } from "react";
import { useNavigate } from "react-router-dom";
import React, { Container, Form, FormGroup, Label, Col, Input, FormText, Button, Row, Alert } from "reactstrap";


function ViewForm() {

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
      navigate("/request");
    }).catch((err) => {
      setMessage(err.toString());
    });


  }


  return (
    <Container className="bg-dark text-white border border-dark rounded-pill mt-5" fluid="md" xs="auto">

      <Row xs="2">
        <Col className="bg-dark bg-gradient rounded-start">

          {message && <Alert color="danger"> {message}</Alert>}
          <Form action='/api/v2/requests/' method="post" onSubmit={createRequest} className="mt-3" >
            <FormGroup>
              <Label for="inputNotice">
                Notice
              </Label>
              <Input
                id="inputNotice"
                name="serviceNotice"
                placeholder="write Notice"
              />
            </FormGroup>



            <FormGroup>
              <Label for="serviceName">
                Service
              </Label>
              <Input
                id="serviceName"
                name="serviceName"
                type="select"
              >
                <option value={7}>
                  7
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
              <Label for="addressString">
                Address
              </Label>
              <Input
                id="addressString"
                name="addressString"
                placeholder="write address"
              />
            </FormGroup>



            <FormGroup>
              <Label for="requestDescription">
                Description
              </Label>
              <Input
                id="requestDescription"
                name="requestDescription"
                type="textarea"
              />
            </FormGroup>

            <FormGroup>
              <Label for="mediaUrl">
                URL
              </Label>
              <Input
                id="mediaUrl"
                name="mediaUrl"
                placeholder="URL"
              />
            </FormGroup>



            <Button className="mb-3" >
              Create
            </Button>
            <span></span>
          </Form>
        
        </Col>

        <Col className="position-relative">
          <div class="position-absolute top-50 start-50 translate-middle">
            <h1 class="text-center">Create Request</h1>
            <p class="text-center">Lorem ipsum dolor sit amet. Est nulla voluptatem et laborum iste aut rerum explicabo eos voluptas sequi non iste omnis? Qui quae adipisci ut cupiditate veritatis At omnis voluptas aut perferendis amet. </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ViewForm;


