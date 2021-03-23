import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"
import MatchProfile from '../Components/MatchProfile';
import BearHugsNavbar from "../Components/BearHugsNavbar"
import UserToken from "../Components/UserToken"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'

let baseDomain = "http://ec2-54-146-61-111.compute-1.amazonaws.com:3000"
class ViewMatchesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: [],
            numProfiles:0
        }
    
    }
    componentDidMount() {
        let url = baseDomain + '/user/random'
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

    onClickAccept(userId) {
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
        return (
            <div className="page">
                <BearHugsNavbar></BearHugsNavbar>
                <div className="row center-row">
                    <div className="col center-col">
                        {
                            this.state.profiles.map((profile) =>
                            <div className="row center-row match-container" key = {"row0" + profile.userId}>
                                <MatchProfile key={profile.userId} userId={profile.userId} imgsrc="mail-order-wife.png" firstName={profile.firstName} lastName={profile.lastName} age={profile.age} descrip={profile.description}></MatchProfile>
                                <div key ={"row-" + profile.userId} className="row center-row fit-container-width red">
                                <div key ={"col1-" + profile.userId} className="col center-col padding-left-right-2"  onClick={() => this.onClickAccept(profile.userId)}>
                                    <div key ={"red1-" + profile.userId}  className="red">
                                        <FontAwesomeIcon key ={"heart-" + profile.userId}  icon={faHeart}
                                            color="#ffffff"
                                            size="4x"
                                        />
                                    </div>
                                </div>
                                <div key ={"col2-" + profile.userId}  className="col center-col padding-left-right-2 margin-left-right-1 " onClick={() => this.onClickReject(profile.userId)}>
                                    <div key ={"red2-" + profile.userId} className="red">
                                        <FontAwesomeIcon icon={faHeartBroken}
                                          key ={"heartbroken-" + profile.userId} 
                                            color="#ffffff"
                                            size="4x"
                                        />
                                    </div>
                                </div>
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

export default ViewProfilePage;
