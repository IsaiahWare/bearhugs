import React, { Component } from 'react';
import "../App.css"
import ReactDOM from 'react-dom'
import BearHugsNavbar from "../Components/BearHugsNavbar"
import UserToken from "../Components/UserToken"
import { Redirect } from 'react-router-dom';

let baseDomain = "http://ec2-34-239-255-127.compute-1.amazonaws.com:3000"

class NotificationsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            redirect: false

        }
        this.checkUserLogIn = this.checkUserLogIn.bind(this)
        this.getUserNotifications = this.getUserNotifications.bind(this)

    }
    componentDidMount() {
        this.checkUserLogIn();
        this.getUserNotifications();
    }

    getUserNotifications() {
        let url = baseDomain + '/notifications/getnotifications'
        let newRequest = {
            userId: UserToken.getUserId()
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRequest)
        })
            .then(res => res.json())
            .then(responseData => {
		    // console.log(responseData)
                if (JSON.stringify(responseData.error) === '{}') {
                    for (let i =0; i < responseData.results.length; ++i) {
                        let date = responseData.results[i].notificationDate
                        let dateObject = new Date(date)
                        let time = dateObject.getHours() + ":" + dateObject.getMinutes();
                        let day = dateObject.toDateString()
                        day = day.substring(0, day.length-5);
                        let dateString = day + " at " + time;
                        responseData.results[i].notificationDate = dateString
                    }
                    this.setState({
                       notifications: responseData.results.reverse()
                    })
                }
            })


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
                <div className="friendsContainer notificationsContainer">
                    <div className="row center-row">
                    <h1 className="pageTitle">Notifications</h1>
                    </div>
                
                    <div>
                        {
                            this.state.notifications.map((notification) =>
                                <div className="row center-row notification-box" key={"row" + notification.id}>
                                    <div key={"col-"+ notification.id} className="notifications-message">
                                        <p>{notification.message}</p>
                                    </div>
                                    <div key={"col-"+ notification.id + " date"} className="notifications-date">
                                        <p>{notification.notificationDate}</p>
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