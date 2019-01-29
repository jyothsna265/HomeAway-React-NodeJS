import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import SignIn from './SignIn/SignIn';
import SignUp from './SignUp/SignUp';
import SignUpEmail from './SignUpEmail/SignUpEmail';
import OwnersSignIn from './OwnersSignIn/OwnersSignIn';
import Homepage from './Homepage/Homepage';
import UserProfile from './UserProfile/UserProfile';
import ThankYou from './ThankYou/Thankyoupage';
import TravelLogin from './TravLogin/TravLoginPage';
import ListPropertySidebar from './ListProperty/ListPropertySidebar';
import ListPropertyWelcome from './ListProperty/ListPropertyWelcome';
import ListPropertyDescribe from './ListProperty/ListPropertyDescribe';
import ListPropertyAvailability from './ListProperty/ListPropertyAvailability';
import ListPropertyCharges from './ListProperty/ListPropertyCharges';
import DetailsView from './DetailsView/DetailsView';
import DetailsMainView from './DetailsView/DetailsMainView';
import TravelerDashboard from './TravlerDashboard/TravelerDashboard';
import OwnersDashboard from './OwnersDashboard/OwnersDashboard';
import OwnersDashboardAll from './OwnersDashboard/OwnersDashboardAll';
import OwnersDashboardBooked from './OwnersDashboard/OwnersDashboardBooked';

//Create a Main Component
class Router extends Component {
    render(){
        return(
            <div>
                {/*Render Different Component based on Route
                */}
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/SignIn" component={SignIn}/>
                <Route exact path="/SignUp" component={SignUp}/>
                <Route exact path="/SignUpEmail" component={SignUpEmail}/>
                <Route exact path="/OwnersSignIn" component={OwnersSignIn}/>
                <Route exact path="/UserProfile" component={UserProfile}/>
                <Route exact path="/ThankYou" component={ThankYou}/>
                <Route exact path="/TravelLogin" component={TravelLogin}/>
                <Route exact path="/ListPropertySidebar" component={ListPropertySidebar}/>
                <Route exact path="/ListPropertyWelcome" component={ListPropertyWelcome}/>
                <Route exact path="/ListPropertyDescribe" component={ListPropertyDescribe}/>
                <Route exact path="/ListPropertyAvailability" component={ListPropertyAvailability}/>
                <Route exact path="/ListPropertyCharges" component={ListPropertyCharges}/>
                <Route exact path="/DetailsView" component={DetailsView}/>
                <Route exact path="/DetailsMainView" component={DetailsMainView}/>
                <Route exact path="/TravelerDashboard" component={TravelerDashboard}/>
                <Route exact path="/OwnersDashboard" component={OwnersDashboard}/>
                <Route exact path="/OwnersDashboardAll" component={OwnersDashboardAll}/>
                <Route exact path="/OwnersDashboardBooked" component={OwnersDashboardBooked}/>
             </div>
        )
    }
}
//Export The Main Component
export default Router;