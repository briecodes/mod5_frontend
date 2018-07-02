import React from 'react';
import { connect } from 'react-redux';

class EditProfile extends React.Component {
  render() {
    return (
      <form onSubmit={this.createUser}>
        <h1>Edit Profile:</h1>
        <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.inputControl} />
        <input type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.inputControl} />
        <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.inputControl} />
        <input type='password' name='password_retype' placeholder='Password Confirmation' value={this.state.password_retype} onChange={this.checkPassword} />
        <input type='submit'/>
      </form>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId
  };
};

export default connect(mapStateToProps)(EditProfile);