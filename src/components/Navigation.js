import React from 'react';
import { NavLink } from 'react-router-dom';

class Navigation extends React.Component {
  render() {
    return (
      <div id='navigation'>
        <div id='nav-logo'>logo</div>
        <NavLink to="/" exact className='nav-link' >Home</NavLink>
        <NavLink to="/create-event" exact className='nav-link' >Create Event</NavLink>
        <NavLink to="/my-profile" exact className='nav-link' >Edit Profile</NavLink>
      </div>
    );
  };
};

export default Navigation;