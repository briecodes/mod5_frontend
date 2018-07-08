import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

import Navigation from '../components/Navigation';
import HomePage from '../components/HomePage';
import CreateEvent from '../components/CreateEvent';
import Event from '../components/Event';
import EditEvent from '../components/EditEvent';
import EditProfile from '../components/EditProfile';
import Octothorps from '../components/Octothorps';
import Footer from '../components/Footer';

class Content extends React.Component {
  render() {
    return (
      <div id='content'>
        <Navigation/>
        {window.location.pathname === '/' ? <HomePage/> : null}
        {window.location.pathname === '/create-event' ? <CreateEvent/> : null}
        {window.location.pathname.includes('/events/') ? <Event/> : null}
        {window.location.pathname.includes('/edit-event/') ? <EditEvent/> : null}
        {window.location.pathname === '/edit-profile' ? <EditProfile /> : null}
        {window.location.pathname === '/octothots' ? <Octothorps /> : null}
        <Switch>
          {/* <Route exact path='/' component={HomePage}/> */}
          {/* <Route exact path='/create-event' component={CreateEvent}/> */}
          {/* <Route path='/events' component={Event}/> */}
        </Switch>
        <div className='divider'></div>
        <Footer/>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    currentLocation: state.currentLocation
  };
};

export default connect(mapStateToProps)(Content);