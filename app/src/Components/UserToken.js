//https://stackoverflow.com/questions/42420531/what-is-the-best-way-to-manage-a-users-session-in-react
import React, { Component } from 'react';
var UserToken = (function() {
    var userId ="";
    var userName=""
  
    var getUserId = function() {
      return userId;    // Or pull this from cookie/localStorage
    };
  
    var setUserId = function(newId) {
      userId= newId;     
      // Also set this in cookie/localStorage
    };
    var getUserName = function() {
      return userName;    // Or pull this from cookie/localStorage
    };
  
    var setUserName = function(newName) {
      userName= newName;     
      // Also set this in cookie/localStorage
    };
  
  
    return {
      setUserId: setUserId,
      getUserId: getUserId,
      getUserName: getUserName,
      setUserName: setUserName
    }
  
  })();
  
  export default UserToken;
