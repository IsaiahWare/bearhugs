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
import FriendsPage from './Pages/FriendsPage';
import ForgotPassword from './Pages/ForgotPassword'
import NotificationsPage from './Pages/NotificationsPage.js';
import ViewMatchesPage from './Pages/ViewMatches';
import ViewPastMatches from "./Pages/ViewPastMatches"
import WingManPage from './Pages/WingmanPage';



function App() {
  return (
  <Router basename={process.env.PUBLIC_URL}>
    <Switch>
        <Route exact path='/' component={LoginPage} />
        <Route exact path="/register" component={RegisterPage}></Route>
        <Route exact path="/viewmatches" component={ViewProfilePage}></Route>
        <Route exact path="/editsettings" component={EditSettingsPage}></Route>
        <Route exact path="/friends" component={FriendsPage}></Route>
        <Route exact path="/notifications" component={NotificationsPage}></Route>
        <Route exact path="/mymatches" component={ViewPastMatches}></Route>
        <Route exact path="/wingman" component={WingManPage}></Route>
        <Route exact path="/forgotpassword" component={ForgotPassword}></Route>
    </Switch>
</Router>
  
  );
}

export default App;
