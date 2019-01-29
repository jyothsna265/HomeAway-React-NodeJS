import React, { Component } from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Router from './components/Router';

class App extends Component {
  render() {
    return (
      //Use Browser Router to route to different pages
      <BrowserRouter>
        <div>
          {/* App Component Has a Child Component called Main*/}
          <Router/>
        </div>
       </BrowserRouter>
        );
      }
    }
export default App;


