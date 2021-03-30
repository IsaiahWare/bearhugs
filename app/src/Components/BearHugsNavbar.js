import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faBell, faUserEdit, faSignOutAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Modal from './NotificationsModal.js';

class BearHugsNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal = () => {
    this.setState({open: true});

  };

  closeModal = () => {
    this.setState({open: false})
  };

    render() {
        return (
          <div>
            <div className="navbarCust">                
                <Link to ="/viewmatches" className="navbarItem" alt="Matches page"><FontAwesomeIcon icon={faHome}/></Link> 

                {/*idk what the point of this is but I kept it */}
                <Modal open={this.state.open} handleClose={this.closeModal}>
                  <p>Notifications</p>
                </Modal>
                <button onClick = {this.openModal} className="navbarItem nostyle"><FontAwesomeIcon icon={faBell}/></button>

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
