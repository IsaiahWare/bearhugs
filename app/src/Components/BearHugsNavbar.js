import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBell, faUserEdit, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
class BearHugsNavbar extends React.Component {
    //
    render() {
        return (
          
            <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link to ="/viewmatches" className="nav-item nav-link mx-5" alt="Matches page"><FontAwesomeIcon icon={faHome}/></Link>
                <Link to = "/notifications" className="nav-item nav-link mx-5"><FontAwesomeIcon icon={faBell}/></Link>
                <Link to ="/editsettings" className="nav-item nav-link mx-5"><FontAwesomeIcon icon={faUserEdit}/></Link>
              </Nav>
              <Nav>
                <Link to ="/" className="nav-item nav-link"><FontAwesomeIcon icon={faSignOutAlt}/></Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}
export default BearHugsNavbar;
