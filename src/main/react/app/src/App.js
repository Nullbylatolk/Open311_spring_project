import ListRequest from "./componentes/ListRequest";
import ListService from "./componentes/ListService";
import Carrusel from "./componentes/Carrusel";
import ViewForm from "./componentes/ViewForm";

import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import ServiceForm from "./componentes/ServiceForm";
import EditRequest from "./componentes/EditRequest";
import EditService from "./componentes/EditService";

export default function App(args) {

  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  return (



    <Router>


      {/* <Nav
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
          <NavLink href="/request" active>
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
      </Nav> */}



      <div>
        <Navbar {...args}
        
          color="dark"
          dark
        >
          <NavbarBrand href="/">Open311</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="me-auto" navbar>
              <NavItem>
                <NavLink href="/request">Request</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/services">
                  Services
                </NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Options
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>Option 1</DropdownItem>
                  <DropdownItem>Option 2</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>Reset</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
            <NavbarText>Simple Text</NavbarText>
          </Collapse>
        </Navbar>
      </div>



      <Routes>
        <Route path="/services" element={<Service />} />
        <Route path="/request" element={<Request />} />
        <Route path="/" element={<Home />} />
        <Route path="/request/create" element={<FormCreate />} />
        <Route path="/services/create" element={<ServiceCreate />} />
        <Route path="/request/edit" element={<UpRequest />} />
        <Route path="/services/edit" element={<UpService />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <Carrusel />
  );
}

function Request() {

  return (
    <ListRequest />
  );
}

function Service() {
  return (
    <ListService />
  );
}

function FormCreate() {
  return (

    <ViewForm />

  );
}


function ServiceCreate() {
  return (
    <ServiceForm />
  );
}


function UpRequest() {
  return (
    <EditRequest />
  );
}


function UpService() {
  return (

    <EditService />
  );

}

