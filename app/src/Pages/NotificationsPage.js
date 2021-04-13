import React, { Component } from 'react';
import "../App.css"
import ReactDOM from 'react-dom'
import BearHugsNavbar from "../Components/BearHugsNavbar"
import UserToken from "../Components/UserToken"
import { Redirect } from 'react-router-dom';

let baseDomain = "http://ec2-100-24-237-42.compute-1.amazonaws.com:3000"

class NotificationsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            redirect: false

        }
        this.checkUserLogIn = this.checkUserLogIn.bind(this)

    }
    componentDidMount() {
        this.checkUserLogIn();
    }

    checkUserLogIn() {
        let token = UserToken.getUserId()
        if (token == null || token == undefined || token == "") {
            this.setState({
                redirect: true
            })
        }

    }

    render() {
        const redirect = this.state.redirect
        if (redirect) {
            return <Redirect
                to="/"
            />
        }

        return (
            <div className="page">
                <BearHugsNavbar></BearHugsNavbar>
                <div className="friendsContainer">
                    <div className="row center-row">
                    <h1 className="pageTitle">Notifications</h1>
                    </div>
                
                    <div>
                        {
                            this.state.notifications.map((notification) =>
                                <div className="row center-row match-container" key={"row" + notification.id}>
                                    <div key={"col-"+ notification.id} className="col">
                                        <p>{notification.message}</p>
                                    </div>
                                </div>
                            )
                        }

                    </div>
                </div>
            </div>

        );
    }
}
export default NotificationsPage;