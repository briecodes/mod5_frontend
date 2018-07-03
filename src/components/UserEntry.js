import React from 'react';

import SignIn from './SignIn';
import SignUp from './SignUp';

class UserEntry extends React.Component {

  createUser = (e) => {
    console.log('create user');
  }

  render() {
    return (
      <div id='entryFormContainer'>
        <div id='formInnerContainer'>
          <SignUp handleOnSubmit={this.createUser} />
          <SignIn/>
        </div>
      </div>
    );
  };
};

export default UserEntry;