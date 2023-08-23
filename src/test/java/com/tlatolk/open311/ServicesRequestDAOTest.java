package com.tlatolk.open311;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest
@AutoConfigureTestDatabase
public class ServicesRequestDAOTest {

    @Autowired
    private ServicesRequestDAO servicesRequestDAO;

    @Mock
    private ResultSet resultSet;

    @Before
    public void setup() throws SQLException {
       
        when(resultSet.getString("service_notice")).thenReturn("Notice");
        when(resultSet.getString("service_id")).thenReturn("1");
        when(resultSet.getString("address_string")).thenReturn("Address");
        when(resultSet.getString("request_description")).thenReturn("Description");
        when(resultSet.getString("media_url")).thenReturn("MediaURL");
    }

    @Test
    public void testCargarTodas() throws SQLException {
        // Simulate expected service requests
        List<ServiceRequest> expectedServiceRequests = new ArrayList<>();
        ServiceRequest expectedRequest = new ServiceRequest("Notice", "ServiceName", "Address", "Description", "MediaURL");
        expectedServiceRequests.add(expectedRequest);

        // Mock ResultSet for the query result
        when(resultSet.next()).thenReturn(true, false);
        when(resultSet.getString("service_notice")).thenReturn(expectedRequest.getServiceNotice());
        when(resultSet.getString("service_id")).thenReturn(expectedRequest.getServiceName()); // Corrected column name
        when(resultSet.getString("address_string")).thenReturn(expectedRequest.getAddressString());
        when(resultSet.getString("request_description")).thenReturn(expectedRequest.getRequestDescription());
        when(resultSet.getString("media_url")).thenReturn(expectedRequest.getMediaUrl());

        // Call the method to be tested
        List<ServiceRequest> actualServiceRequests =  servicesRequestDAO.cargarTodas();

        // Assert the size of the lists servicesRequestDAO
        assertEquals(expectedServiceRequests.size(), actualServiceRequests.size());

        // Compare attributes of expected and actual service requests
        for (int i = 0; i < expectedServiceRequests.size(); i++) {
            ServiceRequest expected = expectedServiceRequests.get(i);
            ServiceRequest actual = actualServiceRequests.get(i);

            assertEquals(expected.getServiceNotice(), actual.getServiceNotice());
            assertEquals(expected.getServiceName(), actual.getServiceName());
            assertEquals(expected.getAddressString(), actual.getAddressString());
            assertEquals(expected.getRequestDescription(), actual.getRequestDescription());
            assertEquals(expected.getMediaUrl(), actual.getMediaUrl());
        }
    }
}
