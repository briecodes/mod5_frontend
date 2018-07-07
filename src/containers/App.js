import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserEntry from '../components/UserEntry';
import Content from './Content';

class App extends Component {
  render() {
    return (
      <div id="App">
        {parseInt(localStorage.getItem('user_id'), 10) && this.props.user_id ? <Content/> : <UserEntry/>}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    user_id: state.user_id
  };
};

export default connect(mapStateToProps)(App);
