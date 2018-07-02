import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { setUser } from '../actions/index';

class Navigation extends React.Component {

  logOut = () => {
    this.props.dispatch(setUser(''));
  };

  render() {
    return (
      <div id='navigation'>
        <div id='nav-logo'>logo</div>
        <NavLink to="/" exact >Home</NavLink>
        <NavLink to="/create-event" exact >Create Event</NavLink>
        <NavLink to="/" exact >Log Out</NavLink>
        <form>
          <input type='text' name='search_events' placeholder='Search Events' />
        </form>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId
  };
};

export default connect(mapStateToProps)(Navigation);