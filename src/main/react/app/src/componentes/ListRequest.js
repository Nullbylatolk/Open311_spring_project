import React, { useEffect, useState } from 'react';
import { Table, Button } from 'reactstrap';


function ListRequest(){
	const [requests, setRequests] = useState([]);
useEffect(function() {	
	fetch("/api/v2/requests/")
	.then(response => response.json())
	.then(response => setRequests(response));
	},[]);
	return(
		
		<>
		<h1>Request   <Button
   color="warning"
    href="/request/create"
    tag="a"
  >
Crear
  </Button></h1>
		
		<Table hover>
		<thead>
		<tr>
		<th>Notice</th>
		<th>Service</th>
		<th>Adress</th>
		<th>Description</th>
		<th>URL</th>
		<td>Accions</td>
		</tr>
		
		</thead>
		<tbody>
		{requests.map(request=> (
			
			<tr key={request.serviceRequestId}>
			<td>
			{request.serviceNotice}
			</td>
				<td>
			{request.serviceName}
			</td>
				<td>
			{request.addressString}
			</td>
				<td>
			{request.requestDescription}
			</td>
				<td>
			{request.mediaUrl}
			</td>
			<td>
			<div>
			 <Button color="info">
    Editar
  </Button>
  {' '}
   <Button color="danger">
    Eliminar
  </Button>
  </div>
			</td>
			</tr>
			
		))}
		
		</tbody>
		
		</Table>
		
		</>
		
		
	);
	
	
	
}

export default ListRequest;