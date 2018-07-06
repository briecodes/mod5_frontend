import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserEntry from '../components/UserEntry';
import Content from './Content';

class App extends Component {
  render() {
    return (
      <div id="App">
        {this.props.activeUser || parseInt(localStorage.getItem('user_id'), 10) ? <Content/> : <UserEntry/>}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId,
    activeUser: state.activeUser
  };
};

export default connect(mapStateToProps)(App);
