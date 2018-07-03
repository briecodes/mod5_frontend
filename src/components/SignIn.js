import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setUserFake } from '../actions/index';

class SignIn extends React.Component {
  state = {
    username: '',
    password: ''
  }

  inputControl = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  logIn = (e) => {
    e.preventDefault();
    if (this.state.username && this.state.password){
      this.props.dispatch(setUserFake());
      this.setState({
        username: '',
        password: ''
      });
      window.history.pushState({}, "new state", "/");
      e.currentTarget.reset();
    }else{
      alert('Username/Password needed.');
    }
  };

  render() {
    return (
      <div className='formContainer'>
        <form onSubmit={this.logIn}>
        <h1>{this.props.userId} Sign In Below:</h1>
          <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.inputControl} />
          <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.inputControl} />
          <input type='submit'/>
        </form>
        <Link exact='true' to='/sign-up'>Don't have an account? Sign up ></Link>
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

export default connect(mapStateToProps)(SignIn);