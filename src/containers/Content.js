import React from 'react';
import { connect } from 'react-redux';
import { Switch } from 'react-router-dom';

import Navigation from '../components/Navigation';
import HomePage from '../components/HomePage';
import CreateEvent from '../components/CreateEvent';
import Event from '../components/Event';
import EditEvent from '../components/EditEvent';
import EditProfile from '../components/EditProfile';
import Footer from '../components/Footer';

class Content extends React.Component {
  
  render() {
    return (
      <div id='content'>
        <Navigation/>
        {this.props.currentLocation === '/' ? <HomePage/> : null}
        {this.props.currentLocation === '/create-event' ? <CreateEvent/> : null}
        {this.props.currentLocation.includes('/events/') ? <Event/> : null}
        {this.props.currentLocation.includes('/edit-event/') ? <EditEvent/> : null}
        {this.props.currentLocation === '/edit-profile' ? <EditProfile /> : null}
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