import React, { Component } from 'react';
import "../App.css";
import {faUser, faCog} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class EditProfile extends React.Component {
    render() {
        return (
           <div class="col">
               <div class="row">
                   <div class="col">
                       <input type="text" placeholder="First Name"></input>
                   </div>
                   <div class="col">
                       <input type="text" placeholder="Last Name"></input>
                   </div>
               </div>
               <div class="row">
                    <textarea rows="4" cols="50" placeholder="Write what you want people to see when they check your profile"></textarea>
               </div>
           </div>
     
        );
    }
}
export default EditProfile;