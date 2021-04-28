//https://stackoverflow.com/questions/42420531/what-is-the-best-way-to-manage-a-users-session-in-react
import React, { Component } from 'react';
var UserToken = (function() {
    var userId ="";
    var userName=""
  
    var getUserId = function() {
      return localStorage.getItem('user');    // Or pull this from cookie/localStorage
    };
  
    var setUserId = function(newId) {
      userId= newId;
      localStorage.setItem('user', newId);
      // Also set this in cookie/localStorage
    };
    var getUserName = function() {
      return localStorage.getItem('userName');    // Or pull this from cookie/localStorage
    };
  
    var setUserName = function(newName) {
      userName= newName;
      localStorage.setItem('userName', newName);  
      // Also set this in cookie/localStorage
    };
    
    var logout = function(){
      localStorage.clear();
    };
  
    return {
      setUserId: setUserId,
      getUserId: getUserId,
      getUserName: getUserName,
      setUserName: setUserName,
      logout: logout
    }
  
  })();
  
  export default UserToken;
