import React,{Component} from 'react';
import './Homepage.css';
import {Link} from 'react-router-dom';
import cookie from 'react-cookies';
import {Redirect} from 'react-router';
import { MenuItem, DropdownButton} from 'react-bootstrap';


class Homepage extends Component {  
    render(){ 
        return(
            <div class="homepage-first-div">
                <div class="row homepage-row1">
                    <div class="col-sm-5 homepage-logo-col">
                       <label>HomeAway</label>
                    </div>
                    <div class="col-sm-2 homepage-tripboard">
                        <DropdownButton bsStyle="link"  title="Trip Boards">
                            <MenuItem eventKey="1"><Link to="/TravlerDashboard">Travelers Dashboard</Link></MenuItem>
                            <MenuItem eventKey="2"><Link to="/OwnersDashboard">Owners Dashboard</Link></MenuItem>
                        </DropdownButton>
                    </div>
                    <div class="col-sm-1 homepage-dropdown1">
                        <DropdownButton bsStyle="link"  title="Login">
                            <MenuItem eventKey="1"><Link to="/SignIn">Travelers Login</Link></MenuItem>
                            <MenuItem eventKey="2"><Link to="/OwnersSignIn">Owners Login</Link></MenuItem>
                        </DropdownButton>
                    </div>
                    <div class="col-sm-1 homepage-dropdown2">
                        <DropdownButton bsStyle="link"  title="Help" >
                            <MenuItem eventKey="1">Visit help center</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="2">Travelers</MenuItem>
                            <MenuItem eventKey="3">How it works</MenuItem>
                            <MenuItem eventKey="4">Security Center</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="5">Homeowners</MenuItem>
                            <MenuItem eventKey="6">How it works</MenuItem>
                            <MenuItem eventKey="7">List your property</MenuItem>
                            <MenuItem eventKey="8">Community</MenuItem>
                            <MenuItem eventKey="9">Discovery Hub</MenuItem>
                            <MenuItem divider />
                            <MenuItem eventKey="10">Property managers</MenuItem>
                            <MenuItem eventKey="11">List your properties</MenuItem>
                        </DropdownButton>
                    </div>
                    <div class="col-sm-2">
                        <button class="homepage-nav-btn"><Link to="./ListProperty">List your property</Link></button>
                    </div>
                    <div class="col-sm-1 homepage-logo-col2">
                        <img height="50" width="50" src={require("../Images/logo10.png")}/>
                    </div>
                </div>
                <div class="homepage-form">
                    <div class="homepage-div">
                        <h1 class="homepage-h1">Book beach houses, cabins,</h1>
                        <h1 class="homepage-h1">condos and more, worldwide</h1>
                        <div class="row homepage-row2">
                            <div class="col-sm-4 homepage-col1">
                                <div class="form-group">
                                    <input type="text" name="input1" class="form-control" placeholder="Where do you want to go?"/>
                                </div>
                            </div>
                            <div class="col-sm-1 homepage-col2">
                                <div class="form-group">
                                    <input type="text" name="input2" class="form-control" placeholder="Arrive"/>
                                </div>   
                            </div>
                            <div class="col-sm-1 homepage-col3">
                                <div class="form-group">
                                    <input type="text" name="input3" class="form-control" placeholder="Depart"/>
                                </div>
                            </div>
                            <div class="col-sm-1 homepage-col4">
                                <div class="form-group">
                                    <input type="text" name="input4" class="form-control" placeholder="Guests"/>
                                </div>
                            </div>
                            <div class="col-sm-2 homepage-col5">
                                <div class="form-group">
                                    <button class="homepage-btn">SEARCH</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row homepage-row3">
                    <div class="col-sm-4">
                        <h2>Your whole vacation starts here</h2>
                        <h5>Choose a rental from the world's best selection</h5>
                    </div>
                    <div class="col-sm-4">
                        <h2>Book and stay with confidence</h2>
                        <h5>Secure payments, peace of mind</h5>
                    </div>
                    <div class="col-sm-4">
                        <h2>Your vacation your way</h2>
                        <h5>More space, more privacy, no compromises</h5>
                    </div>                        
                </div>
            </div>
        )
    }
}

export default Homepage;