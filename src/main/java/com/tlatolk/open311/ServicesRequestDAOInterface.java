package com.tlatolk.open311;

import java.util.List;

public interface ServicesRequestDAOInterface {
	public List<ServiceRequest> cargarTodas();

	public int insertarRequest(ServiceRequest request);
	
	
	public void eliminarRequest(int id) ;
	
	public void actualizarRequest(int id, ServiceRequest request);
}
