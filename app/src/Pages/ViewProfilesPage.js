import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"
import MatchProfile from '../Components/MatchProfile';
import BearHugsNavbar from "../Components/BearHugsNavbar"
import UserToken from "../Components/UserToken"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'

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
               this.setState({profiles: setProfiles})
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
	console.log("click reject")
    }
    render() {
        return (
            <div className="page">
                <BearHugsNavbar></BearHugsNavbar>
                <div className="row center-row">
                    <div className="col center-col">
                        {
                            this.state.profiles.map((profile) =>
                            <div className="row">
                                <MatchProfile key={profile.userId} userId={profile.userId} imgsrc="mail-order-wife.png" firstName={profile.firstName} lastName={profile.lastName} age={profile.age} descrip={profile.descrip}></MatchProfile>
                                <div key={profile.userId} className="row center-row fit-container-width red">
                                <div className="col center-col padding-left-right-2"  onClick={() => this.onClickAccept(profile.userId)}>
                                    <div className="red">
                                        <FontAwesomeIcon icon={faHeart}
                                            color="#ffffff"
                                            size="4x"
                                        />
                                    </div>
                                </div>
                                <div className="col center-col padding-left-right-2 margin-left-right-1 " onClick={() => this.onClickReject(profile.userId)}>
                                    <div className="red">
                                        <FontAwesomeIcon icon={faHeartBroken}
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
