import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCog } from '@fortawesome/free-solid-svg-icons'
import "../App.css"


class EditSettingsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    render() {
        return (
        <div className="page">
            <div className="col ">
                <div className="row margin-1rem">
                    <FontAwesomeIcon icon={faUser}
                                    size="2x"
                        />
                    <Link to ="/profile/editprofile">My Profile</Link>
                </div>
                 <div className="row margin-1rem">
                    <FontAwesomeIcon icon={faCog}
                                    size="2x"
                            />
               
                <Link to='/profile/settings'>Settings and Security</Link>
                </div>
            </div>
            <div className="col">
                {this.props.children}
            </div>
        </div>

        );
    }
}

export default EditSettingsPage;
