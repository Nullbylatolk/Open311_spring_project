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
@RequestMapping(path = "api/v2/requests")
public class ServicesRequestController {

	
	
	

private ServicesRequestDAOInterface servicesRequestDAO;
	
	public ServicesRequestController() {
		servicesRequestDAO = new ServicesRequestDAO();
	}
	
	
	public ServicesRequestDAOInterface getServiceRequestDAO(){
		return servicesRequestDAO;
	}
	
	
	@GetMapping(path="/", produces = "application/json")
	public List<ServiceRequest> listRequest(){
		return getServiceRequestDAO().cargarTodas();
	}
	
	
	@PostMapping(path= "/")
	public String createRequest(@RequestBody ServiceRequest request) {
	    getServiceRequestDAO().insertarRequest(request);
	    return "{\"status\": \"success\"}";
	}
	
	
	
	@DeleteMapping(path = "/{id}", produces = "application/json")
	public ResponseEntity<String> deleteRequest(@PathVariable int id) {
	     getServiceRequestDAO().eliminarRequest(id);
	     return ResponseEntity.ok("request eliminado." + id);
	    
	}
	
	
	
	@GetMapping("/{id}")
    public ResponseEntity<ServiceRequest> getService(@PathVariable int id) {
        ServiceRequest request = getServiceRequestDAO().buscarRequestPorId(id);
        
        if (request != null) {
            return ResponseEntity.ok(request);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
	
	
    @PutMapping(path = "/{id}", produces = "application/json")
    public ResponseEntity<Object> updateRequest(@PathVariable int id, @RequestBody ServiceRequest request) {
        getServiceRequestDAO().actualizarRequest(id, request);
        return ResponseEntity.ok().body("{\"message\": \"Request actualizado exitosamente.\"}");
    }
    
	
	
	
}
