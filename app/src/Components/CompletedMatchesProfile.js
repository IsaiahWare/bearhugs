import React, { Component } from 'react';
import "../App.css"
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken, faHandPointUp } from '@fortawesome/free-solid-svg-icons'
import { Swipeable, direction } from 'react-deck-swiper';
import UserToken from "../Components/UserToken"


class CompletedMatchProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matched: this.props.matched
        }

    }
    render() {
        let matchbar;
        {/* displays swiper if not matched yet, if the user is matched, displays a match banner*/}
        if(!this.state.matched){
            matchbar =
            <div className="swiper">
                <div className="swiperElement heartbroken">
                    <FontAwesomeIcon icon={faHeartBroken} color="darkred" size="2x"></FontAwesomeIcon>
                </div>
                <div className="swiperElement">
                    <Swipeable onSwipe = {this.handleOnSwipe} swipeThreshold ={60} fadeThreshold={0}>
                        <div>
                            <FontAwesomeIcon icon={faHandPointUp} size="2x"></FontAwesomeIcon>
                        </div>
                    </Swipeable>
                </div>
                <div className="swiperElement heartmade">
                    <FontAwesomeIcon icon={faHeart} color="green" size="2x"></FontAwesomeIcon>
                </div>
            </div>
        }
        else{
            matchbar = 
            <div className = "itsAMatch">
                <p><b>IT'S A MATCH! 😁</b></p>
                <h2>Send them an email at {this.props.email}</h2>
            </div>
        }

        return (
            <div className="row center-row margin-5rem">
                <div className="col">
                    <div className="box">
                        <div className="col center-col">
                            <div className="row center-row">
                                <div className="img-container">
                                    <img className="match-img" src={this.props.imgsrc}></img>
                                </div>
                            </div>
                            <div className="row center-row">
                                <h2 className="display-block">{this.props.firstName} {this.props.lastName}, {this.props.age}</h2>
                                <br></br>
                            </div>
                                <div className="row center-row">
                                        <p>{this.props.descrip}</p>
                            </div>
                        {matchbar}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default CompletedMatchProfile;