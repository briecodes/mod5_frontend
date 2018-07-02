import React from 'react';
import { Route } from 'react-router-dom';

import Navigation from '../components/Navigation';
import HomePage from '../components/HomePage';
import CreateEvent from '../components/CreateEvent';
import Footer from '../components/Footer';

class Content extends React.Component {

  homePage = () => {
    return <HomePage />
  };

  createEvent = () => {
    return <CreateEvent/>
  };
  
  render() {
    return (
      <div id='content'>
        <Navigation/>
          <Route exact path='/' component={HomePage} />
          <Route exact path='/' component={CreateEvent} />
        <Footer/>
      </div>
    );
  };
};

export default Content;