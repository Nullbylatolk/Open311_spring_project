package com.tlatolk.open311;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ServicesRequestDAO implements ServicesRequestDAOInterface {
	
	static final String DB_URL = "jdbc:mysql://localhost/open311_database";
	static final String USER = "root";
	static final String PASS = "root";
	static final String QUERY_CARGARTODAS = "SELECT\r\n"
			+ "    rs.service_request_id,\r\n"
			+ "    rs.service_notice,\r\n"
			+ "    s.service_name,\r\n"
			+ "    s.service_code,\r\n"
			+ "    rs.address_string,\r\n"
			+ "    rs.request_description,\r\n"
			+ "    rs.media_url\r\n"
			+ "FROM request_services rs\r\n"
			+ "JOIN services s ON rs.service_id = s.service_id;";
	
	static final String QUERY_INSERTAR = "insert into request_services (service_notice, service_id, address_string, request_description, media_url) values (?, ?, ?, ?, ?);";
	

	
	
	
	private ServiceRequest construirServicesRequest(ResultSet resultSetServicesRequest) throws SQLException{
		return new ServiceRequest(
				resultSetServicesRequest.getString("service_notice"),
				resultSetServicesRequest.getString("service_name"),
				resultSetServicesRequest.getString("address_string"),
				resultSetServicesRequest.getString("request_description"),
				resultSetServicesRequest.getString("media_url")
				);
	}
	
	//listamos lo que tenemos en la baser de datos
	public List<ServiceRequest> cargarTodas() {
		try {
			Connection conn = obtenerConexion();
			PreparedStatement sentencia = conn.prepareStatement(QUERY_CARGARTODAS);
			
			ResultSet resultSetPersonas = sentencia.executeQuery();
			
			List<ServiceRequest> todasPersonas = new ArrayList<ServiceRequest>();
			
			while(resultSetPersonas.next()) {
				todasPersonas.add(construirServicesRequest(resultSetPersonas));
			}
			
			conn.close();
			
			return todasPersonas;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	
	//insertamos un request en nuestra base de datos 
	public int insertarRequest(ServiceRequest request) {
	    try {
	        Connection conn = obtenerConexion();
	        
	        // Insertar en la primera tabla
	        PreparedStatement sentencia = conn.prepareStatement(QUERY_INSERTAR, Statement.RETURN_GENERATED_KEYS);
	        sentencia.setString(1, request.getServiceNotice());
	        sentencia.setString(2, request.getServiceName());
	        sentencia.setString(3, request.getAddressString());
	        sentencia.setString(4, request.getRequestDescription());
	        sentencia.setString(5, request.getMediaUrl());
	        System.out.println(sentencia.toString());
	        sentencia.execute();
	        ResultSet generatedKeys = sentencia.getGeneratedKeys();
	        generatedKeys.next();
	        int serviceId = generatedKeys.getInt(1); // Obtener el id generado

	        conn.close();

	        return serviceId;
	    } catch (SQLException e) {
	        e.printStackTrace();
	        return 0;
	    }
	}
	
	//eliminamis el request
	public void eliminarRequest(int id) {
	    Connection conn = null;
	    try {
	        conn = obtenerConexion();
	        conn.setAutoCommit(false); // Iniciar una transacción



	        // Eliminar de la tabla service
	        String deleteServiceQuery = "DELETE FROM  request_services WHERE service_request_id = ?";
	        PreparedStatement deleteServiceStatement = conn.prepareStatement(deleteServiceQuery);
	        deleteServiceStatement.setInt(1, id);
	        deleteServiceStatement.executeUpdate();

	        conn.commit(); // Confirmar la transacción
	    } catch (SQLException e) {
	        if (conn != null) {
	            try {
	                conn.rollback(); // Deshacer la transacción en caso de error
	            } catch (SQLException ex) {
	                ex.printStackTrace();
	            }
	        }
	        e.printStackTrace();
	    } finally {
	        if (conn != null) {
	            try {
	                conn.close();
	            } catch (SQLException e) {
	                e.printStackTrace();
	            }
	        }
	    }
	}
	
	
	//actualizar request
	
	public void actualizarRequest(int id, ServiceRequest request) {
	    Connection conn = null;
	    try {
	        conn = obtenerConexion();
	        conn.setAutoCommit(false); // Iniciar una transacción

	        // Actualizar la fila en la tabla services
	        String updateServiceQuery = "UPDATE request_services SET service_notice = ?, service_id = ?, address_string = ?, request_description = ?, media_url = ? WHERE service_request_id = ?;";
	        PreparedStatement updateServiceStatement = conn.prepareStatement(updateServiceQuery);
	        updateServiceStatement.setString(1, request.getServiceNotice());
	        updateServiceStatement.setString(2, request.getServiceName());
	        updateServiceStatement.setString(3, request.getAddressString());
	        updateServiceStatement.setString(4, request.getRequestDescription());
	        updateServiceStatement.setString(5, request.getMediaUrl());
	        updateServiceStatement.setInt(6, id); // Usar el ID proporcionado en la URL
	        updateServiceStatement.executeUpdate();

	      

	        conn.commit(); // Confirmar la transacción
	    } catch (SQLException e) {
	        if (conn != null) {
	            try {
	                conn.rollback(); // Deshacer la transacción en caso de error
	            } catch (SQLException ex) {
	                ex.printStackTrace();
	            }
	        }
	        e.printStackTrace();
	    } finally {
	        if (conn != null) {
	            try {
	                conn.close();
	            } catch (SQLException e) {
	                e.printStackTrace();
	            }
	        }
	    }
	}

	
	
	
	
	

	
	private Connection obtenerConexion() throws SQLException {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		return DriverManager.getConnection(DB_URL, USER, PASS);
	}
	

}
