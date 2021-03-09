import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "../App.css"
import MatchProfile from '../Components/MatchProfile';
class ViewProfilePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            profiles: []
        }

    }
    render() {
        return (
            <div className="page">
                <div className="row center-row">
                    <div className="col center-col">
                        <MatchProfile imgsrc="possum-on-horse.png" name= "Paul Possum" age="22" descrip ="I love to stand on top of art installations"></MatchProfile>
                        <MatchProfile imgsrc="mail-order-wife.png" name= "Mandy Marsupial" age="20" descrip ="I will literally mail myself to you. You won't find another girl more loyal"></MatchProfile>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewProfilePage;
