package com.tlatolk.open311;

public class ServiceRequest {
	
	
	
//	service_request_id int PK 
//	service_notice varchar(100) 
//	service_id int 
//	address_string varchar(4000) 
//	request_description varchar(4000) 
//	media_url varchar(4000)

	private int serviceRequestId;
	private String serviceNotice;
	private String serviceName;
	private String addressString;
	private String requestDescription;
	private String mediaUrl;
	
	
	
	public ServiceRequest(int serviceRequestId, String serviceNotice, String serviceName, String addressString,
			String requestDescription, String mediaUrl) {
		super();
		this.serviceRequestId = serviceRequestId;
		this.serviceNotice = serviceNotice;
		this.serviceName = serviceName;
		this.addressString = addressString;
		this.requestDescription = requestDescription;
		this.mediaUrl = mediaUrl;
	}



	public int getServiceRequestId() {
		return serviceRequestId;
	}



	public void setServiceRequestId(int serviceRequestId) {
		this.serviceRequestId = serviceRequestId;
	}



	public String getServiceNotice() {
		return serviceNotice;
	}



	public void setServiceNotice(String serviceNotice) {
		this.serviceNotice = serviceNotice;
	}



	public String getServiceName() {
		return serviceName;
	}



	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}



	public String getAddressString() {
		return addressString;
	}



	public void setAddressString(String addressString) {
		this.addressString = addressString;
	}



	public String getRequestDescription() {
		return requestDescription;
	}



	public void setRequestDescription(String requestDescription) {
		this.requestDescription = requestDescription;
	}



	public String getMediaUrl() {
		return mediaUrl;
	}



	public void setMediaUrl(String mediaUrl) {
		this.mediaUrl = mediaUrl;
	}
	
	
}
