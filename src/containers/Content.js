import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Navigation from '../components/Navigation';
import HomePage from '../components/HomePage';
import CreateEvent from '../components/CreateEvent';
import Event from '../components/Event';
import Footer from '../components/Footer';

class Content extends React.Component {
  
  render() {
    return (
      <div id='content'>
        <Navigation/>
        <Switch>
          {/* <Route exact path='/' component={HomePage}/> */}
          {this.props.currentLocation === '/' ? <HomePage/> : null}
          {this.props.currentLocation === '/create-event' ? <CreateEvent/> : null}
          {/* <Route exact path='/create-event' component={CreateEvent}/> */}
          <Route path='/events' component={Event}/>
        </Switch>
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