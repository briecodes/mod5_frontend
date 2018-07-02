import React from 'react';
import { Route } from 'react-router-dom';

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
        <Route exact path='/' component={HomePage} />
        <Route exact path='/create-event' component={CreateEvent} />
        <Route path='/events' component={Event}/>
        <Footer/>
      </div>
    );
  };
};

export default Content;