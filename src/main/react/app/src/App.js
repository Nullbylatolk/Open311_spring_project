import ListRequest from "./componentes/ListRequest";
import ListService from "./componentes/ListService";
import Carrusel from "./componentes/Carrusel";
import ViewForm from "./componentes/ViewForm";
import React ,{Nav,NavItem, NavLink, Card, CardBody, CardTitle, CardText, CardSubtitle, Button} from "reactstrap";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import ServiceForm from "./componentes/ServiceForm";
import EditRequest from "./componentes/EditRequest";
import EditService from "./componentes/EditService";

export default function App() {
	
	
  return (
<Router>
   <Nav
  fill
  tabs
>
  <NavItem>
    <NavLink
      active
      href="/open311"
    >
      Open311
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink href="/request"  active>
      Request
    </NavLink>
  </NavItem>
  <NavItem>
    <NavLink
      active
      href="/services"
    >
      Service
    </NavLink>
  </NavItem>
  
  
  
  
</Nav>
         <Routes>
         <Route path="/services" element={<Service />} />
          <Route path="/request" element={<Request  />} />
          <Route path="/open311" element={<Home />} />
          <Route path="/request/create" element={<FormCreate />} />
             <Route path="/services/create" element={<ServiceCreate />} />
             <Route path="/request/edit" element={<UpRequest />}/>
                    <Route path="/services/edit" element={<UpService />}/>
        </Routes>
    </Router>
  );
}

function Home() {
  return (
	 <Carrusel/>
  );
}

function Request(){
	
	return(
		<ListRequest/>
	);
}

function Service(){
	return (
		<ListService/>
	);
}

function FormCreate(){
	return (
		
		<ViewForm/>
		
	);
}


function ServiceCreate(){
	return (
		<ServiceForm/>
	);
}


function UpRequest(){
	return(
		<EditRequest/>
	);
}


function UpService(){
	return (
		
		<EditService/>
	);
	
}

