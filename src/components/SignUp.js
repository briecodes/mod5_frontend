import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setUserId, setCurrentLocation, setToken } from '../reducers/index';
import { HURL } from '../actions/index';

class SignUp extends React.Component {

  state = {
    username: '',
    name: '',
    password: '',
    password_retype: ''
  }

  componentDidMount() {
    this.props.dispatch(setCurrentLocation(window.location.pathname));
  };

  createUser = (e) => {
    e.preventDefault();
    e.persist();
    if (this.state.password === this.state.password_retype){
      console.log('new user accepted');
      fetch(HURL('/api/v1/users'), {
        method: 'POST',
        body: JSON.stringify({username: this.state.username, name: this.state.name, password: this.state.password}),
        headers: {'Content-Type': 'application/json'}
      })
      .then( res => res.json() )
      .then( response => {
        if (response.errors || response.error){
          alert(response.errors[0]);
        }else{
          this.props.dispatch(setUserId(response.user.id));
          this.props.dispatch(setToken(response.token));
          localStorage.setItem('token', response.token);
          localStorage.setItem('user_id', response.user.id);
          e.target.reset();
          this.props.dispatch(setCurrentLocation('/'));
        }
      });
    }else {
      console.log('error: password does not match');
    };
  };

  inputControl = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  checkPassword = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.value === this.state.password){
    }else{
      console.log(`Warning! Password does not match.`);
    };
  };

  render() {
    return (
      <div className='formContainer'>
        <form onSubmit={this.createUser}>
          <h1 className='light'>Sign Up Below:</h1>
          <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.inputControl} />
          <input type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.inputControl} />
          <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.inputControl} />
          <input type='password' name='password_retype' placeholder='Password Confirmation' value={this.state.password_retype} onChange={this.checkPassword} />
          <input type='submit' className='submit'/>
        </form>
        <Link exact='true' to='/' onClick={() => this.props.dispatch(setCurrentLocation('/'))} >Already have an account? Sign in ></Link>
      </div>
    );
  };
};

export default connect()(SignUp);