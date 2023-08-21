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

function NavBar(args) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    
   <div>
      <Navbar 
       color="dark"
       dark
       >
        <NavbarBrand href="/">Open311</NavbarBrand>

      
          <Nav 
          fill>
		 <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap" navbar dark >
                GitHub
              </NavLink>
            </NavItem>
          </Nav>
          <NavbarText>Tlatolk</NavbarText>
   
      </Navbar>
    </div>
  );
}

export default NavBar;