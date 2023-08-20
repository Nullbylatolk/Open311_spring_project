package com.tlatolk.open311;


//modelo del servicio 
public class Services {
	
	//Variables en los cuales guardare los campos del servicio
	private int service_id;
	private String service_code;
	private String service_name;
	private String description;
	private String group;
	private String keywords;
	
	





	public Services( String service_code, String service_name, String description, 
			String group, String keywords) {
		super();
		this.service_code = service_code;
		this.service_name = service_name;
		this.description = description;
		this.group = group;
		this.keywords = keywords;
	}
	
	
	
	

	public int getService_id() {
		return service_id;
	}


	public void setService_id(int service_id) {
		this.service_id = service_id;
	}



	public String getService_code() {
		return service_code;
	}




	public void setService_code(String service_code) {
		this.service_code = service_code;
	}




	public String getService_name() {
		return service_name;
	}




	public void setService_name(String service_name) {
		this.service_name = service_name;
	}




	public String getDescription() {
		return description;
	}




	public void setDescription(String description) {
		this.description = description;
	}



	public String getGroup() {
		return group;
	}



	public void setGroup(String group) {
		this.group = group;
	}
	
	
	
	public String getKeywords() {
		return keywords;
	}


	public void setKeywords(String keywords) {
		this.keywords = keywords;
	}

	
	
}
	
	