import React from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp';

class UserEntry extends React.Component {

  createUser = (e) => {
    console.log('create user');
  }

  render() {
    return (
      <React.Fragment>
        <SignUp handleOnSubmit={this.createUser} />
        <SignIn/>
      </React.Fragment>
    );
  };
};

export default UserEntry;