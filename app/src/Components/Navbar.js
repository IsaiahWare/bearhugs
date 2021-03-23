import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
class Navbar extends React.Component {
    //
    render() {
        return (
            <Navbar bg="light" expand="lg">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                <Link to ="/viewmatches" className="nav-link">Matches</Link>
                <Link to ="/usersettings" className="nav-link">User Settings</Link>
                <Link to ="/" className="nav-link">Logout</Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        );
    }
}
export default Navbar;