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
                                <h2 className="display-block">{this.props.name}, {this.props.age}</h2>
                                <br></br>
                            </div>
                            <div className="scroll-box margin-1rem">
                                <div className="row center-row wraps">
                                    <div className="text-container">
                                    <p>{this.props.descrip}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="row center-row fit-container-width red">
                            <div className="col center-col padding-left-right-2">
                                <div className="red">
                                    <FontAwesomeIcon icon={faHeart}
                                        color="#ffffff"
                                        size="4x"
                                    />
                                </div>
                            </div>
                            <div className="col center-col padding-left-right-2 margin-left-right-1 ">
                                    <div className="red">
                                        <FontAwesomeIcon icon={faHeartBroken}
                                            color="#ffffff"
                                            size="4x"
                                        />
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