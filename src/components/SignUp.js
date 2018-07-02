import React from 'react';

class SignUp extends React.Component {

  state = {
      username: '',
      name: '',
      password: '',
      password_retype: ''
  }

  createUser = (e) => {
    e.preventDefault();
    if (this.state.password === this.state.password_retype){
        console.log('new user accepted');
        fetch('http://localhost:3000/api/v1/users', {
            method: 'POST',
            body: JSON.stringify({username: this.state.username, name: this.state.name, password: this.state.password}),
            headers: {'Content-Type': 'application/json'}
        })
        .then( res => res.json() )
        .then( response => console.log('success:', response ));
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
        this.props.handleOnSubmit();
    }else{
        console.log('Warning! password does not match.');
    };
  };

  render() {
    return (
      <form onSubmit={this.createUser}>
        <h1>Sign Up Below:</h1>
          <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.inputControl} />
          <input type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.inputControl} />
          <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.inputControl} />
          <input type='password' name='password_retype' placeholder='Password Confirmation' value={this.state.password_retype} onChange={this.checkPassword} />
          <input type='submit'/>
      </form>
    );
  };
};

export default SignUp;