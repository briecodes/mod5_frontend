import React from 'react';
import { connect } from 'react-redux';

import SignIn from './SignIn';
import SignUp from './SignUp';

class UserEntry extends React.Component {

  render() {
    return (
      <div id='entryFormContainer'>
      <div id='entry-logo'></div>
        <div id='formInnerContainer'>
          {window.location.pathname === '/' ? <SignIn/> : <SignUp /> }
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