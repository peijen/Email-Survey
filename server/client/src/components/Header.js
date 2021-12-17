import React, { Component } from "react";
import { connect } from 'react-redux';

class Header extends Component {
    renderContent(){
      //helper function for showing content based on user's authentication state
      switch (this.props.auth) {
        case null:
          return;
        case false:
          return <li><a href="/auth/google">Login With Google</a></li>
        default:
          return <li><a href="/api/logout">Logout</a></li>

      }
    }
    
    render() {
        return (
            <nav>
            <div className="nav-wrapper">
              <a href="/" className="left brand-logo">Email-Survey</a>
              <ul className="right">
                  {this.renderContent()}
              </ul>
            </div>
          </nav>
        );
    }
}

function mapStateToProps (state){
  // subscribe to Redux store updates
  // will be called whenever the store state changes, and given the store state
  return ({ auth: state.auth })
}

// Connects header component to the redux store.
export default connect(mapStateToProps)(Header);