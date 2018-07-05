import React from 'react';
import { connect } from 'react-redux';

import SignIn from './SignIn';
import SignUp from './SignUp';

class UserEntry extends React.Component {

  createUser = (e) => {
    console.log('create user');
  };

  render() {
    return (
      <div id='entryFormContainer'>
      <div id='entry-logo'></div>
        <div id='formInnerContainer'>
          {this.props.currentLocation === '/' ? <SignIn/> : <SignUp handleOnSubmit={this.createUser} /> }
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    currentLocation: state.currentLocation
  };
};

export default connect(mapStateToProps)(UserEntry);