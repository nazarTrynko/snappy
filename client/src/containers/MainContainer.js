import React from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import '../index.css';

export default function ({children}) {
  return (
    <div>
      <Navbar collapseOnSelect>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/">
              <NavItem eventKey={1}>Apply shipping information</NavItem>
            </LinkContainer>
            <LinkContainer to="/shippings">
              <NavItem eventKey={2}>List of records</NavItem>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {children}
    </div>

  )
}
