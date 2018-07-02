import React from 'react';

import SignUp from './SignUp';

class UserEntry extends React.Component {

  createUser = (e) => {
    console.log('create user');
  }

  render() {
    return (
      <SignUp handleOnSubmit={this.createUser} />
    );
  };
};

export default UserEntry;