import React from 'react';
import { Route } from 'react-router-dom';

import Navigation from '../components/Navigation';
import HomePage from '../components/HomePage';
import Footer from '../components/Footer';

class Content extends React.Component {

  homePage = () => {
    return <HomePage />
  };
  
  render() {
    return (
      <div id='content'>
        <Navigation/>
        <Route exact path="/" render={this.homePage} />
        <Footer/>
      </div>
    );
  };
};

export default Content;