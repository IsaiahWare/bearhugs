import React, { Component } from 'react';
import "../App.css"
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken, faHandPointUp } from '@fortawesome/free-solid-svg-icons'
import { Swipeable, direction } from 'react-deck-swiper';
import Carousel from 'react-bootstrap/Carousel'
import UserToken from "../Components/UserToken"


let baseDomain = "http://ec2-54-146-61-111.compute-1.amazonaws.com:3000";
class MatchProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            matched: this.props.matched,
            interactedWith: false,
        }
        
        this.handleOnSwipe = this.handleOnSwipe.bind(this);
        this.matchProfile = this.matchProfile.bind(this);
    }

    handleOnSwipe = (swipeDirection) => {
        if (swipeDirection === direction.RIGHT) {
          // handle right swipe
          this.setState({
            matched: true,
            interactedWith:true
        });
          this.props.approveMatch()
          return;
        }
    
        if (swipeDirection === direction.LEFT) {
            this.props.rejectMatch()
            this.setState({
                interactedWith:true
            })
          // handle left swipe
          return;
        }
    }

    matchProfile(){
     
    }



    render() {
        let matchbar;
        {/* displays swiper if not matched yet, if the user is matched, displays a match banner*/}
        if(!this.state.matched && !this.state.interactedWith){
            matchbar =
            <div className="swiper">
                <div className="swiperElement heartbroken">
                    <FontAwesomeIcon icon={faHeartBroken} color="darkred" size="2x"></FontAwesomeIcon>
                </div>
                <div className="swiperElement">
                    <Swipeable onSwipe = {this.handleOnSwipe} swipeThreshold ={60} fadeThreshold={0}>
                        <div className="finger">
                            <FontAwesomeIcon icon={faHandPointUp} color="white" size="2x"></FontAwesomeIcon>
                        </div>
                    </Swipeable>
                    <p>drag to swipe!</p>
                </div>
                <div className="swiperElement heartmade">
                    <FontAwesomeIcon icon={faHeart} color="green" size="2x"></FontAwesomeIcon>
                </div>
            </div>
        }
        else if (!this.state.matched && this.state.interactedWith){
            matchbar =<div className = "itsAMatch">
            <p><b>NO DICE...</b></p>
            <h2>This match has been rejected.</h2>
        </div>
            
        }
        else if (this.state.matched){
            matchbar = 
            <div className = "itsAMatch">
                <p><b>IT'S A MATCH! 😁</b></p>
                <h2>A pending match request has been sent.</h2>
            </div>
        }

        let images;
        if(this.props.photos.length > 0){
            console.log("photos: " + this.props.photos);
            images =
            <Carousel interval={null} wrap={false}>
                {this.props.photos.map((imgsrc, idx) =>  (
                    <Carousel.Item>
                            <img src={imgsrc} key={idx} className="d-block profImage"
                            />
                    </Carousel.Item>
                ))}
            </Carousel>
        }
        else{
            images =
            <img className="match-img" src="default-profile.png"></img>
        }

        return (
            <div className="row center-row margin-5rem">
                <div className="col">
                    <div className="box">
                        <div className="col center-col">
                            <div className="row center-row">
                                <div className="img-container">
                                    {images}
                                </div>
                            </div>
                            <div className="row center-row">
                                <h2 className="display-block">{this.props.firstName} {this.props.lastName}, {this.props.age}</h2>
                                <br></br>
                            </div>
                            <div className="scroll-box margin-1rem">
                                <div className="row center-row wraps">
                                    <div className="text-container">
                                        <p>{this.props.descrip}</p>
                                    </div>
                                </div>
                            </div>
                            
                        {matchbar}
                        
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default MatchProfile;