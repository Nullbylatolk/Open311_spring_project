import React, { useEffect, useState } from 'react';
import { Table } from 'reactstrap';


function ListService(){
	const [services, setServices] = useState([]);
useEffect(function() {	
	fetch("api/v2/services/")
	.then(response => response.json())
	.then(response => setServices(response));
	},[]);
	return(
		
		<>
		<h1>Service</h1>
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
			</tr>
			
		))}
		
		</tbody>
		
		</Table>
		
		</>
		
		
	);
	
	
	
}

export default ListService;