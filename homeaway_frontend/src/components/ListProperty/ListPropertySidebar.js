import React, { Component } from 'react';
import './ListPropertySidebar.css';
import './ListProperty.css';
import { Link } from 'react-router-dom';

class ListPropertySidebar extends Component {
    render() {
        return (
                <div>
                    <div class="row listproperty-row">
                        <div class="col-sm-1">
                            <span class="glyphicon glyphicon-align-left listglyphicon1"></span>
                        </div>
                        <div class="col-sm-5 listproperty-col1">
                            <Link to="/"><img class="listproperty-img1" height="40" width="175" src={require("../Images/Homeaway_logo.png")}/></Link>
                        </div>
                        <div class="col-sm-2 listpropertydash">
                            <Link to="/OwnersDashboard" class="listproperty-link1">Dashboard</Link>
                        </div>
                        <div class="col-sm-2 listglyphicon3">
                            <Link to="/ListPropertySidebar" class="listglyphicon3">Add new property</Link>
                        </div>
                        <div class="col-sm-1">
                            <Link to="/" class="listglyphiconlogout"><span class="glyphicon glyphicon-log-out listglyphiconlogout"></span> Sign Out</Link>
                        </div>
                        <div class="col-sm-1">
                            <span class="glyphicon glyphicon-th listglyphicon1"></span>
                        </div>
                    </div>
                    <div class="sidenav">
                        <Link to="/ListpropertyWelcome" class="active">Location</Link>
                        <Link to="/ListPropertyDescribe">Details</Link>
                        <Link to="/ListPropertyAvailability">Availability</Link>
                        <Link to="/ListPropertyCharges">Pricing</Link>
                    </div>
                </div>
        );
    }
}

export default ListPropertySidebar;