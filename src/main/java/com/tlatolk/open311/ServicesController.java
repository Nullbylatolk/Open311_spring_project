package com.tlatolk.open311;



import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = "api/v2/services")
public class ServicesController {

	
	
	private ServicesDAOInterface servicesDAO;
	
	public ServicesController() {
		servicesDAO = new ServicesDAO();
	}
	
	
	public ServicesDAOInterface getServicesDAO(){
		return servicesDAO;
	}
	
	
	@GetMapping(path="/", produces = "application/json")
	public List<Services> listALL(){
		return getServicesDAO().cargarTodas();
	}
	
	
	
	@PostMapping(path= "/",produces = "application/json")
	public int createService(@RequestBody Services service) {
	    return getServicesDAO().insertarService(service);
	}
	
	
	
	@DeleteMapping(path = "/{id}", produces = "application/json")
	public ResponseEntity<String> deleteService(@PathVariable int id) {
	     getServicesDAO().eliminarService(id);
	     return ResponseEntity.ok("Servicio eliminado." + id);
	    
	}
	
	@PutMapping("/{id}")
    public ResponseEntity<String> actualizarService(@PathVariable int id, @RequestBody Services service) {
        getServicesDAO().actualizarService(id, service);
        return ResponseEntity.ok("Servicio actualizado exitosamente.");
    }
	
	
	
	
	
}
