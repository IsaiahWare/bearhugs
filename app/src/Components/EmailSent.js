import React, { Component } from 'react';
import "../App.css";
import {faUser, faCog} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Toast} from 'react-bootstrap';


class EmailSent extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            display: false
            
        };
    }
    render() {
        return (
            <Toast show={this.props.show}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
              <strong className="mr-auto">Bearhugs</strong>
            </Toast.Header>
            <Toast.Body>Email sent!</Toast.Body>
          </Toast>
     
        );
    }
}
export default EmailSent;