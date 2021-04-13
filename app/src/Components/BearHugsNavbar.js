import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBell, faUserEdit, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from '../Pages/NotificationsPage.js';
import NotificationsModal from '../Pages/NotificationsPage.js';


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
            <div className="navbarCust">                
                <Link to ="/viewmatches" className="navbarItem" alt="Matches page"><FontAwesomeIcon icon={faHome}/></Link> 

                {/*idk what the point of this is but I kept it */}
                <Link to ="/notifications" className="navbarItem"><FontAwesomeIcon icon={faBell}/></Link>
                <Link to ="/editsettings" className="navbarItem"><FontAwesomeIcon icon={faUserEdit}/></Link> 
                <Link to ="/friends" className="navbarItem"><FontAwesomeIcon icon={faUserPlus}/></Link>  
                <Link to ="/" className="navbarItem"><FontAwesomeIcon icon={faSignOutAlt}/></Link>
            </div>
            <div className="navbar-padding-top"></div>
          </div>
        );
    }
}
export default BearHugsNavbar;
