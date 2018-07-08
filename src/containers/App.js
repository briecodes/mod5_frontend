import React, { Component } from 'react';
import { connect } from 'react-redux';

import UserEntry from '../components/UserEntry';
import Content from './Content';

class App extends Component {
  componentDidMount() {
      // document.getElementsByTagName('body')[0].style.backgroundImage='url(/assets/bg.jpg)';
  };
  
  render() {
    return (
      <React.Fragment>
        <div id="App">
          {parseInt(localStorage.getItem('user_id'), 10) && this.props.user_id ? <Content/> : <UserEntry/>}
        </div>
        {!localStorage.getItem('user_id') && !this.props.user_id ? <div id='welcome' style={{height: window.innerHeight}}></div> : null}
      </React.Fragment>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    user_id: state.user_id
  };
};

export default connect(mapStateToProps)(App);
