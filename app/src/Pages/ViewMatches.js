import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"
import MatchProfile from '../Components/MatchProfile';
import BearHugsNavbar from "../Components/BearHugsNavbar"
import UserToken from "../Components/UserToken"
import { Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'

let baseDomain = "http://ec2-34-239-255-127.compute-1.amazonaws.com:3000"
class ViewMatchesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            numProfiles:0,
            redirect:false
        }
        this.checkUserLogIn = this.checkUserLogIn.bind(this)
        this.getMatches = this.getMatches.bind(this)
        
    }

    checkUserLogIn() {
        let token =  UserToken.getUserId()
        if(token==null || token==undefined || token=="") {
            this.setState({
                redirect:true
            })
        }
    }

   //check for pending and completed and if so do not add to the thing
    
    getMatches() {
        let url = baseDomain + '/user/random'
        let newRequest = {
            count: 5
            //userId: UserToken.getUserId()
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
           if (responseData.error!=null) {
               this.setState({
                   profiles: responseData.results
               })
           }
       })
    }

    componentDidMount() {
        this.checkUserLogIn();
        if(!this.state.redirect) {
            this.getMatches()
        }
    }

    

    render() {
        const redirect = this.state.redirect
	    if (redirect) {
            return <Redirect
            to= "/"
            />
        }
        return (
            <div className="page">
                <BearHugsNavbar></BearHugsNavbar>
                <div className="row center-row">
                    <div className="col center-col">
                        {
                            this.state.profiles.map((profile) =>
                                <div className="row center-row match-container" key = {"row0" + profile.userId}>
                                    <MatchProfile key={profile.userId} userId={profile.userId} imgsrc="mail-order-wife.png"
                                     firstName={profile.firstName} lastName={profile.lastName} age={profile.age}
                                      descrip={profile.description} matched={true}></MatchProfile>
                                </div>
                            )
                        }


                    </div>
                </div>
            </div>
        );
    }
}

export default ViewMatchesPage;
