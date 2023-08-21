import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';

function ListRequest(){
	const [requests, setRequests] = useState([]);
useEffect(function() {	
	fetch("api/v2/requests/")
	.then(response => response.json())
	.then(response => setRequests(response));
	},[]);
	return(
		
		<>
		<h1>Request</h1>
		<Table hover>
		<thead>
		<tr>
		<th>Notice</th>
		<th>Service</th>
		<th>Adress</th>
		<th>Description</th>
		<th>URL</th>
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
			</tr>
			
		))}
		
		</tbody>
		
		</Table>
		
		</>
		
		
	);
	
	
	
}


export default ListRequest;