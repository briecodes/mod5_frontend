import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { HURL, inputControl, setUserId, setCurrentLocation } from '../actions/index';

class SignUp extends React.Component {

  state = {
    username: '',
    name: '',
    password: '',
    password_retype: '',
    errors: [],
    verified: false
  }

  componentDidMount() {
    this.props.dispatch(setCurrentLocation(window.location.pathname));
  };

  verifyData = () => {

  };

  createUser = (e) => {
    e.preventDefault();
    e.persist();
    if (this.state.password === this.state.password_retype){
      fetch(HURL('/api/v1/users'), {
        method: 'POST',
        body: JSON.stringify({username: this.state.username, name: this.state.name, password: this.state.password}),
        headers: {'Content-Type': 'application/json'}
      })
      .then( res => res.json() )
      .then( response => {
        if (response.errors || response.error){
          this.setState({
            errors: response.errors
          });
        }else{
          localStorage.setItem('user_id', response.user.id);
          localStorage.setItem('token', response.token);
          this.props.dispatch(setUserId(response.user.id));
          window.history.pushState({}, "new state", "/");
          this.props.dispatch(setCurrentLocation('/'));
          e.target.reset();
        }
      });
    }else {
      this.setState({
        errors: ['Password does not match.']
      });
    };
  };

  checkPassword = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    if (e.target.value === this.state.password){
      this.setState({ errors: [] });
    }else{
      this.setState({ errors: ['Password does not match.'] });
    };
  };

  render() {
    const renderErrors = this.state.errors.map(error => error + '. ')
    return (
      <div className='formContainer'>
        <form onSubmit={this.createUser}>
          <h1 className='light'>Sign Up Below:</h1>
          {this.state.errors ? <React.Fragment>
            <span className='error-message'>{renderErrors}</span>
            <div className='divider spacer'></div>
            <div className='divider spacer'></div>
          </React.Fragment> : null }
          <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={inputControl.bind(this)} />
          <input type='text' name='name' placeholder='Name' value={this.state.name} onChange={inputControl.bind(this)} />
          <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={inputControl.bind(this)} />
          <input type='password' name='password_retype' placeholder='Password Confirmation' value={this.state.password_retype} onChange={this.checkPassword} />
          <input type='submit' className='submit'/>
        </form>
        <Link exact='true' to='/' onClick={() => this.props.dispatch(setCurrentLocation('/'))} >Already have an account? Sign in ></Link>
      </div>
    );
  };
};

export default connect()(SignUp);