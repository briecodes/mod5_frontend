import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import EventSearch from '../components/EventSearch';
import { logOutUser, setCurrentLocation, resetStore } from '../actions/index';

class Navigation extends React.Component {

  logOut = () => {
    this.props.dispatch(logOutUser());
    this.props.dispatch(resetStore());
    localStorage.clear();
    this.props.dispatch(setCurrentLocation('/'));
  };

  routingMethod = (urlRoute) => {
    this.props.dispatch(resetStore());
    switch (urlRoute){
      case '/':
        window.history.pushState({}, "new state", urlRoute);
        this.props.dispatch(setCurrentLocation(urlRoute));
        break;
      case '/create-event':
        this.props.dispatch(setCurrentLocation(urlRoute));
        break;
      case '/edit-profile':
        this.props.dispatch(setCurrentLocation(urlRoute));
        break;
      case '/all-events':
        this.props.dispatch(setCurrentLocation(urlRoute));
        break;
      default:
        return;
    };
  };

  render() {
    return (
      <div id='navigation'>
        <div id='nav-logo' onClick={() => this.routingMethod('/')}></div>
        <Link to='/' className='navLink' onClick={() => this.routingMethod('/')} >Home</Link>
        <Link to='/create-event' className='navLink' onClick={() => this.routingMethod('/create-event')} >Create Event</Link>
        <Link to='/all-events' className='navLink' onClick={() => this.routingMethod('/all-events')} >Explore Events</Link>
        <Link to='/edit-profile' className='navLink' onClick={() => this.routingMethod('/edit-profile')} >Edit Profile</Link>
        <Link to='/' className='navLink' onClick={this.logOut} >Log Out</Link>
        <EventSearch/>
        <div className='divider'></div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser
  };
};

export default connect(mapStateToProps)(Navigation);