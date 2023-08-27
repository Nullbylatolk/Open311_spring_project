import React, { useEffect, useState } from 'react';
import { Table, Button, ButtonGroup, Col, Row, Container } from 'reactstrap';
import DeleteRequest from './DeleteRequest';

function ListRequest() {
	const [requests, setRequests] = useState([]);
	useEffect(function () {
		fetch("/api/v2/requests/")
			.then(response => response.json())
			.then(response => setRequests(response));
	}, []);
	return (

		<>

			<div class="container-lg mt-5">
				<Container
					className="border border-dark"
					fluid="xl"
				>
					<Row>
						<Col
							className="bg-dark text-white"
						>
							<h1>Request   <Button
								color="warning"
								href="/request/create"
								tag="a"
							>
								Crear
							</Button></h1>

							<Table hover className='table table-dark table-striped'>
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
									{requests.map(request => (

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

												<DeleteRequest resourceId={request.serviceRequestId} />


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

export default ListRequest;