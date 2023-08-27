package com.tlatolk.open311;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

public class ServicesDAO implements ServicesDAOInterface{
	
	
	
	static final String DB_URL = "jdbc:mysql://localhost/open311_database";
	static final String USER = "root";
	static final String PASS = "root";
	static final String QUERY_CARGARTODAS = "SELECT\r\n"
			+ "    s.service_id,\r\n"
			+ "    s.service_code,\r\n"
			+ "    s.service_name,\r\n"
			+ "    s.service_description,\r\n"
			+ "    g.group_name,\r\n"
			+ "    GROUP_CONCAT(k.keyword_name SEPARATOR ', ') AS keywords\r\n"
			+ "FROM services s\r\n"
			+ "JOIN group_tb g ON s.group_id = g.group_id\r\n"
			+ "LEFT JOIN service_keywords sk ON s.service_id = sk.service_id\r\n"
			+ "LEFT JOIN keywords k ON sk.keyword_id = k.keyword_id\r\n"
			+ "GROUP BY s.service_id;";
	static final String QUERY_INSERTAR = "insert into services (service_code, service_name, service_description, group_id) values (?, ?, ?, ?);";
	

	
	
	
	private Services construirServices(ResultSet resultSetServices) throws SQLException{
		return new Services(
				resultSetServices.getInt("service_id"),
				resultSetServices.getString("service_code"),
				resultSetServices.getString("service_name"),
				resultSetServices.getString("service_description"),
				resultSetServices.getString("group_name"),
				resultSetServices.getString("keywords")
				);
	}
	
	//listamos lo que tenemos en la baser de datos
	public List<Services> cargarTodas() {
		try {
			Connection conn = obtenerConexion();
			PreparedStatement sentencia = conn.prepareStatement(QUERY_CARGARTODAS);
			
			ResultSet resultSetServices = sentencia.executeQuery();
			
			List<Services> allServices = new ArrayList<Services>();
			
			while(resultSetServices.next()) {
				allServices.add(construirServices(resultSetServices));
			}
			
			conn.close();
			
			return allServices;
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
	
	
	
	//crear un servicio
	
	public int insertarService(Services service) {
	    try {
	        Connection conn = obtenerConexion();
	        
	        // Insertar en la primera tabla
	        PreparedStatement sentencia = conn.prepareStatement(QUERY_INSERTAR, Statement.RETURN_GENERATED_KEYS);
	        sentencia.setString(1, service.getService_code());
	        sentencia.setString(2, service.getService_name());
	        sentencia.setString(3, service.getDescription());
	        sentencia.setString(4, service.getGroup());
	        System.out.println(sentencia.toString());
	        sentencia.execute();
	        ResultSet generatedKeys = sentencia.getGeneratedKeys();
	        generatedKeys.next();
	        int serviceId = generatedKeys.getInt(1); // Obtener el id generado
	        
	        // Insertar en la segunda tabla (Keywords) y la tabla de relación
	        String keywords = service.getKeywords();
	        if (keywords != null && !keywords.isEmpty()) {
	            String[] keywordArray = keywords.split(", ");
	            String insertKeywordsQuery = "INSERT INTO Keywords (keyword_name) VALUES (?)";
	            String insertServiceKeywordsQuery = "INSERT INTO service_keywords (service_id, keyword_id) VALUES (?, ?)";
	            
	            for (String keyword : keywordArray) {
	                // Insertar en la tabla Keywords
	                PreparedStatement keywordsStatement = conn.prepareStatement(insertKeywordsQuery, Statement.RETURN_GENERATED_KEYS);
	                keywordsStatement.setString(1, keyword.trim());
	                keywordsStatement.execute();
	                
	                // Obtener el id generado de Keywords
	                ResultSet keywordGeneratedKeys = keywordsStatement.getGeneratedKeys();
	                keywordGeneratedKeys.next();
	                int keywordId = keywordGeneratedKeys.getInt(1);
	                
	                // Insertar en la tabla de relación
	                PreparedStatement serviceKeywordsStatement = conn.prepareStatement(insertServiceKeywordsQuery);
	                serviceKeywordsStatement.setInt(1, serviceId);
	                serviceKeywordsStatement.setInt(2, keywordId);
	                serviceKeywordsStatement.execute();
	            }
	        }

	        conn.close();

	        return serviceId;
	    } catch (SQLException e) {
	        e.printStackTrace();
	        return 0;
	    }
	}
	
	
	//eliminar un servicio
	
	public void eliminarService(int id) {
	    Connection conn = null;
	    try {
	        conn = obtenerConexion();
	        conn.setAutoCommit(false); // Iniciar una transacción

	        // Verificar si hay palabras clave antes de eliminar la relación en service_keywords
	        boolean hasKeywords = tienePalabrasClave(conn, id);

	        if (hasKeywords) {
	            // Eliminar de la tabla service_keywords
	            String deleteServiceKeywordsQuery = "DELETE FROM service_keywords WHERE service_id = ?";
	            PreparedStatement deleteServiceKeywordsStatement = conn.prepareStatement(deleteServiceKeywordsQuery);
	            deleteServiceKeywordsStatement.setInt(1, id);
	            deleteServiceKeywordsStatement.executeUpdate();
	        }

	        // Eliminar de la tabla service
	        String deleteServiceQuery = "DELETE FROM services WHERE service_id = ?";
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

	private boolean tienePalabrasClave(Connection conn, int serviceId) throws SQLException {
	    String query = "SELECT COUNT(*) FROM service_keywords WHERE service_id = ?";
	    try (PreparedStatement statement = conn.prepareStatement(query)) {
	        statement.setInt(1, serviceId);
	        try (ResultSet resultSet = statement.executeQuery()) {
	            resultSet.next();
	            int rowCount = resultSet.getInt(1);
	            return rowCount > 0;
	        }
	    }
	}
	
	
	
	//Actualizar 
	
	public void actualizarService(int id, Services service) {
	    Connection conn = null;
	    try {
	        conn = obtenerConexion();
	        conn.setAutoCommit(false); // Iniciar una transacción

	        // Actualizar la fila en la tabla services
	        String updateServiceQuery = "UPDATE services SET service_code = ?, service_name = ?, service_description = ?, group_id = ? WHERE service_id = ?";
	        PreparedStatement updateServiceStatement = conn.prepareStatement(updateServiceQuery);
	        updateServiceStatement.setString(1, service.getService_code());
	        updateServiceStatement.setString(2, service.getService_name());
	        updateServiceStatement.setString(3, service.getDescription());
	        updateServiceStatement.setString(4, service.getGroup());
	        updateServiceStatement.setInt(5, id); // Usar el ID proporcionado en la URL
	        updateServiceStatement.executeUpdate();

	        // Eliminar relaciones anteriores en la tabla service_keywords
	        String deleteServiceKeywordsQuery = "DELETE FROM service_keywords WHERE service_id = ?";
	        PreparedStatement deleteServiceKeywordsStatement = conn.prepareStatement(deleteServiceKeywordsQuery);
	        deleteServiceKeywordsStatement.setInt(1, id); // Usar el ID proporcionado en la URL
	        deleteServiceKeywordsStatement.executeUpdate();

	        // Insertar nuevas palabras clave en la tabla Keywords y relaciones en service_keywords
	        String insertKeywordsQuery = "INSERT INTO Keywords (keyword_name) VALUES (?)";
	        String insertServiceKeywordsQuery = "INSERT INTO service_keywords (service_id, keyword_id) VALUES (?, ?)";

	        String[] keywordArray = service.getKeywords().split(", ");
	        for (String keyword : keywordArray) {
	            PreparedStatement keywordsStatement = conn.prepareStatement(insertKeywordsQuery, Statement.RETURN_GENERATED_KEYS);
	            keywordsStatement.setString(1, keyword.trim());
	            keywordsStatement.execute();

	            ResultSet keywordGeneratedKeys = keywordsStatement.getGeneratedKeys();
	            if (keywordGeneratedKeys.next()) {
	                int keywordId = keywordGeneratedKeys.getInt(1);

	                PreparedStatement serviceKeywordsStatement = conn.prepareStatement(insertServiceKeywordsQuery);
	                serviceKeywordsStatement.setInt(1, id); // Usar el ID proporcionado en la URL
	                serviceKeywordsStatement.setInt(2, keywordId);
	                serviceKeywordsStatement.execute();
	            }
	        }

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

	
	
	
	
	//Buscar un servicio 
	 public Services buscarServicePorId(int id) {
	        Connection conn = null;
	        try {
	            conn = obtenerConexion();
	            String query = "SELECT s.*, g.group_name, GROUP_CONCAT(k.keyword_name SEPARATOR ', ') as keywords " +
	                           "FROM services s " +
	                           "LEFT JOIN group_tb g ON s.group_id = g.group_id " +
	                           "LEFT JOIN service_keywords sk ON s.service_id = sk.service_id " +
	                           "LEFT JOIN Keywords k ON sk.keyword_id = k.keyword_id " +
	                           "WHERE s.service_id = ? " +
	                           "GROUP BY s.service_id";
	            PreparedStatement statement = conn.prepareStatement(query);
	            statement.setInt(1, id);
	            ResultSet resultSet = statement.executeQuery();

	            if (resultSet.next()) {
	                Services service = construirServices(resultSet);
	                return service;
	            }
	        } catch (SQLException e) {
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

	        return null; // Si no se encuentra el servicio, devuelve null
	    }
	
	//obeter conexion
	private Connection obtenerConexion() throws SQLException {
		try {
			Class.forName("com.mysql.cj.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}

		return DriverManager.getConnection(DB_URL, USER, PASS);
	}
	
	
	

}
