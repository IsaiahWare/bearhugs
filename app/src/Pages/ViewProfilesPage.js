import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"
import MatchProfile from '../Components/MatchProfile';
import BearHugsNavbar from "../Components/BearHugsNavbar"
import UserToken from "../Components/UserToken"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Redirect } from 'react-router-dom';
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'

let baseDomain = "http://ec2-100-24-237-42.compute-1.amazonaws.com:3000"
class ViewProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            numProfiles:0,
            redirect:false
        }
        this.checkUserLogIn = this.checkUserLogIn.bind(this)
        this.getProfiles = this.getProfiles.bind(this)
    }

   checkUserLogIn() {
        let token =  UserToken.getUserId()
        console.log("token in edit settings " + token)
        if(token==null || token==undefined || token=="") {
            this.setState({
                redirect:true
            })
        }
    }

    getProfiles() {
        let url = baseDomain + '/user/random'
        let newRequest = {
            count: 10
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
               let userToken = UserToken.getUserId()
               let tempProfiles = setProfiles.filter((obj) => {
                return obj.userId !== userToken
                })
                this.setState({
                    profiles: tempProfiles
                })
           }
       })

    }

    componentDidMount() {
        this.checkUserLogIn()
            if(!this.state.redirect) {
                this.getProfiles()
            }
    }

    onClickAccept(userId) {
        let url = baseDomain + '/match/send'
        let newRequest = {
            requesterId: UserToken.getUserId(),
            requesteeId: userId
        }
        alert("matched " + UserToken.getUserId());
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newRequest)
        })
        .then(res => res.json())
        .then(responseData => {
              if (JSON.stringify(responseData.error) === '{}') {
                  console.log(responseData)
                let temp = this.state.profiles
                let tempProfiles = this.state.numProfiles-1
                let tempResult = temp.filter((obj) => {
                console.log(obj)
                return obj.userId != userId
                })
                this.setState({
                    profiles: tempResult,
                    numProfiles:tempProfiles
        
                })
               console.log("was match successful? " + responseData.matched);
           }
       })
                  
    }
    onClickReject(userId) {
        let temp = this.state.profiles
        let tempProfiles = this.state.numProfiles-1
        let tempResult = temp.filter((obj) => {
		console.log(obj)
		console.log(userId)
        if (obj.userId === userId) {
            console.log("remove " + JSON.stringify(obj))
        }
            return obj.userId !== userId
        })
	    console.log("tempresult"+ JSON.stringify(tempResult))
        this.setState({
            profiles: tempResult,
            numProfiles:tempProfiles
        })
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
                                firstName={profile.firstName} lastName={profile.lastName} age={profile.age} descrip={profile.description}
                                 matched={false}
                                 approveMatch={() => this.onClickAccept(profile.userId)} rejectMatch={() => this.onClickReject(profile.userId)}
                                 
                                 ></MatchProfile>
                                 
                            </div>
                            )
                        }

                        {/* for frontend testing */}


                    </div>
                </div>
            </div>
        );
    }
}

export default ViewProfilePage;
