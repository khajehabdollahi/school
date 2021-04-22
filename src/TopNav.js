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
  NavbarText
} from 'reactstrap';



const Navb = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (    
    <div>
      <Navbar color="light" light expand="md" align>
        <NavbarBrand href="/about">About us</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/logIn">Log In</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/Register">Create Account</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/schoolform">Write School Information</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/search">Search Schools</NavLink>
            </NavItem>
          </Nav>
         
        </Collapse>
      </Navbar>
    </div>
  );
}

export default Navb;