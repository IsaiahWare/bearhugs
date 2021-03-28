import React, { Component } from 'react';
import "../App.css"
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'


   const Modal = ({handleClose, open, children}) => {
       const showHideClassName = open ? "modal display-modal" : "modal display-none";

    // render() {
        return (
            <div className={showHideClassName}>
                <section className = "notificationsModal">
                    {children}
                    <button type="button" onClick={handleClose}>
                        X
                    </button>
                </section>
            </div>


        );
    };

export default NotificationsModal;