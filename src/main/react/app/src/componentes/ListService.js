import React, { useEffect, useState } from 'react';
import { Table, Col, Row, Button, ButtonGroup, Container } from 'reactstrap';
import DeleteService from './DeleteService';


function ListService() {
	const [services, setServices] = useState([]);
	useEffect(function () {
		fetch("api/v2/services/")
			.then(response => response.json())
			.then(response => setServices(response));
	}, []);
	return (

		<>
			<div class="container mt-5">
				<Container
					className="border border-dark"
					fluid="xl"
				>
					<Row>
						<Col
							className="bg-dark text-white"
						>

							<h1>Service  <Button
								color="warning"
								href="/services/create"
								tag="a"
							>
								Crear
							</Button></h1>
							<Table hover className='table table-dark table-striped'>
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
									{services.map(service => (

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

												<DeleteService resourceId={service.service_id} />
											</td>
										</tr>

									))}

								</tbody>

							</Table>
						</Col>
					</Row>
				</Container>
			</div>
		</>


	);



}

export default ListService;