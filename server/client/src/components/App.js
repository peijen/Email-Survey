import React, { Component } from "react";
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from '../actions';
import Header from "./Header";
import Landing from "./Landing";

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>

class App extends Component {
  componentDidMount(){
    /*
    The componentDidMount() method allows us 
    to execute the React code when the component 
    is already placed in the DOM (Document Object Model). 
    This method is called during the Mounting phase of the 
    React Life-cycle i.e after the component is rendered.
    */

    //call the action to verify user login status
    this.props.fetchUser();

  }

  render() {
    return(
        <div className="container">
          <BrowserRouter>
            <div>
              <Header />
              <Route exact={true} path="/" component={Landing}/>
              <Route exact={true} path="/surveys" component={Dashboard}/>
              <Route path="/surveys/new" component={SurveyNew}/>
            </div>
          </BrowserRouter>
        </div>
    )
  }
};

// connect function for giving components the ability to call action creators
export default connect(null, actions)(App);