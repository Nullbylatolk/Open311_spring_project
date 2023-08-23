import React, { useEffect, useState } from 'react';
import { Table, Col, Row, Button, ButtonGroup } from 'reactstrap';


function ListService(){
	const [services, setServices] = useState([]);
useEffect(function() {	
	fetch("api/v2/services/")
	.then(response => response.json())
	.then(response => setServices(response));
	},[]);
	return(
		
		<>
		<div class="container mt-5">
			
			  <Row>
    <Col
      className="bg-light border"
      sm={{
        offset: 1,
        order: 2,
        size: 10
      }}
    >
		
		<h1>Service  <Button
   color="warning"
    href="/service/create"
    tag="a"
  >
Crear
  </Button></h1>
		<Table hover>
		<thead>
		<tr>
		<th>Service Code</th>
		<th>Name</th>
		<th>Description</th>
		<th>Group</th>
		<th>Keywords</th>
		</tr>
		
		</thead>
		<tbody>
		{services.map(service=> (
			
			<tr key={service.service_id}>
			<td>
			{service.service_code}
			</td>
				<td>
			{service.service_name}
			</td>
				<td>
			{service.description}
			</td>
				<td>
			{service.group}
			</td>
				<td>
			{service.keywords}
			</td>
			<td>
			
<ButtonGroup>
			 <Button color="info">
    Editar
  </Button>
  {' '}
   <Button color="danger">
    Eliminar
  </Button>
  </ButtonGroup>
			</td>
			</tr>
			
		))}
		
		</tbody>
		
		</Table>
			    </Col>
  </Row>

		</div>
		</>
		
		
	);
	
	
	
}

export default ListService;