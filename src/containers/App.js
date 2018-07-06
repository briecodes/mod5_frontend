import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserEntry from '../components/UserEntry';
import Content from './Content';

class App extends Component {
  render() {
    return (
      <div id="App">
        {parseInt(localStorage.getItem('user_id'), 10) ? <Content/> : <UserEntry/>}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId
  };
};

export default connect(mapStateToProps)(App);
