import logo from './logo.svg';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import {IndexRoute} from 'react-router-dom';
import './App.css';
import LoginPage from './Pages/Loginpage'
import RegisterPage from './Pages/Registerpage'
import ViewProfilePage from './Pages/ViewProfilesPage';
import MatchProfile from './Components/MatchProfile.js'
import EditSettingsPage from './Pages/EditSettingsPage';
import EditProfile from './Components/EditProfile.js'
import EditSecurity from './Components/EditSecurity.js'



function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
    <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path="/register" component={RegisterPage}></Route>
        <Route exact path="/viewmatches" component={ViewProfilePage}></Route>
       <Route exact path="/editsettings" component={EditSettingsPage}></Route>

 
    </Switch>
</Router>
  
  );
}

export default App;
