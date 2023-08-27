package com.tlatolk.open311;


import java.util.List;

public interface ServicesDAOInterface {
	public List<Services> cargarTodas();
	
	
	public int insertarService(Services service);
	
	
	public void eliminarService(int id) ;
	
	public void actualizarService(int id,Services service);
	
	
	public Services buscarServicePorId(int id);
}
