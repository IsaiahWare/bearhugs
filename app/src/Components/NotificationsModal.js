import React, { Component } from 'react';
import "../App.css"
import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faHeartBroken } from '@fortawesome/free-solid-svg-icons'
import './NotificationsModal.css';

   const Modal = ({handleClose, open, children}) => {
       const showHideClassName = open ? "modal display-modal" : "modal display-none";

    // render() {
        return (
            <div className={showHideClassName}>
                <section className = "modal-main">
                    {children}
                    <button type="button" onClick={handleClose}>
                        X
                    </button>
                </section>
            </div>


        );
    };

export default Modal;