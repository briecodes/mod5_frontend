import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import EventSearch from '../components/EventSearch';
import { logOutUser, setCurrentLocation, resetStore } from '../actions/index';

class Navigation extends React.Component {

  logOut = () => {
    this.props.dispatch(logOutUser());
    this.props.dispatch(resetStore());
  };

  routingMethod = (arg) => {
    this.props.dispatch(resetStore());
    if (arg === '/'){
      this.props.dispatch(setCurrentLocation('/'));
    }else if (arg === '/create-event'){
      this.props.dispatch(setCurrentLocation('/create-event'));
    }
  };

  render() {
    return (
      <div id='navigation'>
        <div id='nav-logo'>logo</div>
        <Link to='/' onClick={() => this.routingMethod('/')} >Home</Link>
        <Link to='/create-event' onClick={() => this.routingMethod('/create-event')} >Create Event</Link>
        <Link to='/' onClick={this.logOut} >Log Out</Link>
        <EventSearch/>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser,
    currentLocation: state.currentLocation
  };
};

export default connect(mapStateToProps)(Navigation);