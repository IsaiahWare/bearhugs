import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"
import MatchProfile from '../Components/MatchProfile';
import BearHugsNavbar from "../Components/BearHugsNavbar"
import UserToken from "../Components/UserToken"
let baseDomain = "http://ec2-54-146-61-111.compute-1.amazonaws.com:3000"
class ViewProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            numProfiles:0
        }
    
    }
    componentDidMount() {
        let url = baseDomain + '/users/random'
        let newRequest = {
            count: 5
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
           // TODO: handle case where login is invalid 
           if (responseData.error!=null) {
               let setProfiles = responseData.results
               this.setState({profiles: setProfiles})
           }
       })

    }

    onClickAccept(userId) {
        let temp = this.state.profiles
        let tempProfiles = this.state.numProfiles-1
        let result = temp.filter((obj, userId) => {
            return obj.id != userId
        })
        this.setState({
            result: temp,
            numProfiles:tempProfiles

        })


    }
    onClickReject(userId) {
        let temp = this.state.profiles
        let tempProfiles = this.state.numProfiles-1
        let result = temp.filter((obj, userId) => {
            return obj.id != userId
        })
        this.setState({
            result: temp,
            numProfiles:tempProfiles

        })

    }
    render() {
        return (
            <div className="page">
                <BearHugsNavbar></BearHugsNavbar>
                <div className="row center-row">
                    <div className="col center-col">
                        {
                            this.state.profiles.map((profile) =>
                                <MatchProfile id={profile.userId} userId={profile.userId}  onClickAccept={() => this.onClickAccept(UserToken.getUserId())} onClickReject={() => this.onClickReject(UserToken.getUserId())} imgsrc="mail-order-wife.png" firstName={profile.firstName} lastName={profile.lastName} age={profile.age} descrip={profile.descrip} ></MatchProfile>
                            )
                        }

                    </div>
                </div>
            </div>
        );
    }
}

export default ViewProfilePage;
