import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { logOutUser, setCurrentLocation } from '../actions/index';

class Navigation extends React.Component {

  logOut = () => {
    this.props.dispatch(logOutUser());
  };

  render() {
    return (
      <div id='navigation'>
        <div id='nav-logo'>logo</div>
        <Link to='/' onClick={() => this.props.dispatch(setCurrentLocation('/'))} >Home</Link>
        <Link to='/create-event' onClick={() => this.props.dispatch(setCurrentLocation('/create-event'))} >Create Event</Link>
        <Link to='/' onClick={this.logOut} >Log Out</Link>
        <form>
          <input type='text' name='search_events' placeholder='Search Events' />
        </form>
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