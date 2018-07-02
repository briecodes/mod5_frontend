import React from 'react';

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
      
    }else{
      alert('Username/Password needed.');
    }
  };

  render() {
    return (
      <form onSubmit={this.logIn}>
        <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.inputControl} />
        <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.inputControl} />
        <input type='submit'/>
      </form>
    );
  };
};

export default SignIn;