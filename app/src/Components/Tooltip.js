import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faCheck} from '@fortawesome/free-solid-svg-icons'
import "../App.css"

class ToolTip extends React.Component{
	constructor(props){
  	super(props);
    }
  render()
  {
    
    return (
    <div className="tooltip">
            <div className="tooltip-inner">ToolTip Component</div>
    </div>
    )
  }
} export default Tooltip;