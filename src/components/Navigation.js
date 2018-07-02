import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { logOutUser } from '../actions/index';

class Navigation extends React.Component {

  logOut = () => {
    this.props.dispatch(logOutUser());
  };

  render() {
    return (
      <div id='navigation'>
        <div id='nav-logo'>logo</div>
        <NavLink to="/" exact >Home</NavLink>
        <NavLink to="/create-event" exact >Create Event</NavLink>
        <NavLink to="/" exact onClick={this.logOut} >Log Out</NavLink>
        <form>
          <input type='text' name='search_events' placeholder='Search Events' />
        </form>
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