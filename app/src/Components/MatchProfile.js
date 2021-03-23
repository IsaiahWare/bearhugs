import React, { Component } from 'react';
import "../App.css"
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'

class MatchProfile extends React.Component {

    render() {
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
                            <div className="scroll-box margin-1rem">
                                <div className="row center-row wraps">
                                    <div className="text-container">
                                        <p>{this.props.descrip}</p>
                                    </div>
                                </div>
                            </div>
                       
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default MatchProfile;