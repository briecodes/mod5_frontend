import React from 'react';
import { connect } from 'react-redux';

import { setUser } from '../actions/index';

class EditProfile extends React.Component {
  state = {
    name: this.props.activeUser.name,
    username: this.props.activeUser.username,
    success: false
  };

  inputControl = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  save = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/v1/users/' + this.props.activeUser.id, {
      method: 'PATCH',
      body: JSON.stringify({username: this.state.username, name: this.state.name}),
      headers: {'Content-Type': 'application/json'}
    })
    .then( res => res.json() )
    .then( response => {
      // console.log('response:', response);
      this.props.dispatch(setUser(response));
      this.setState({
        success: true
      });
    });
  };

  render() {
    return (
      <form onSubmit={this.save}>
        <h1>{this.props.activeUser.id}Edit {this.props.activeUser.name}'s Profile:</h1>
        {this.state.success ? <h3>Changes Saved!</h3> : null }
        <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.inputControl} />
        <input type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.inputControl} />
        <input type='submit'/>
      </form>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser
  };
};

export default connect(mapStateToProps)(EditProfile);