import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faHeart,faBell, faUserEdit, faSignOutAlt, faUserPlus, faDove } from '@fortawesome/free-solid-svg-icons'
import Modal from '../Pages/NotificationsPage.js';
import NotificationsModal from '../Pages/NotificationsPage.js';
import {Col} from "react-bootstrap"
import {Row} from "react-bootstrap"
import UserToken from "./UserToken"



class BearHugsNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.handleModalState = this.handleModalState.bind(this);
  }

  handleModalState() {
    let currentState = this.state.open
    currentState = !currentState
    this.setState({
      open: currentState
    })
  }
  render() {
    return (
      <div>
        <Navbar bg="light" expand="lg" className="fixed-top">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="container-fluid">
              <Row>
                <Nav.Item className="margin-left-right-1" ><Link to="/viewmatches" className="navbarItem" alt="Matches page"><FontAwesomeIcon icon={faHome} /></Link></Nav.Item>
                <Nav.Item className="margin-left-right-1"><Link to="/notifications" className="navbarItem"><FontAwesomeIcon icon={faBell} /></Link></Nav.Item>
                <Nav.Item className="margin-left-right-1"> <Link to="/friends" className="navbarItem"><FontAwesomeIcon icon={faUserPlus} /></Link></Nav.Item>
                <Nav.Item className="margin-left-right-1"><Link to ="/mymatches" className="navbarItem"><FontAwesomeIcon icon={faHeart}/></Link> </Nav.Item>
                <Nav.Item className="margin-left-right-1"><Link to ="/wingman" className="navbarItem"><FontAwesomeIcon icon={faDove}/></Link> </Nav.Item>
              </Row>
              <Row>
                
              <Nav.Item className="margin-left-right-1"> <Link to="/editsettings" className="navbarItem"><FontAwesomeIcon icon={faUserEdit} /></Link></Nav.Item>
                <Nav.Item className="margin-left-right-1" onClick={UserToken.logout}> <Link to="/" className="navbarItem"><FontAwesomeIcon icon={faSignOutAlt} /></Link></Nav.Item>
              </Row>
        
    
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="navbar-padding-top"></div>
      </div>
    );
  }
}
export default BearHugsNavbar;
