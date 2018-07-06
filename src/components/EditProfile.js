import React from 'react';
import { connect } from 'react-redux';

import { setUser } from '../actions/index';

class EditProfile extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    success: false
  };

  componentDidMount(){
    this.getUser();
  }

  inputControl = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  getUser = () => {
    fetch('http://localhost:3000/api/v1/users/' + parseInt(localStorage.getItem('user_id'), 10), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then( res => res.json() )
    .then( response => {
      if (response.errors || response.error){
        console.log(response.errors);
        console.log(response.error);
      }else{
        this.setState({
          name: response.name,
          username: response.username
        });
      }
    })
  }

  save = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/v1/users/' + parseInt(localStorage.getItem('user_id'), 10), {
      method: 'PATCH',
      body: JSON.stringify({username: this.state.username, name: this.state.name, password: this.state.password}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then( res => res.json() )
    .then( response => {
      // console.log('response:', response);
      if (response.errors || response.error){
        console.log(response.errors);
        console.log(response.error);
      }else{
        this.props.dispatch(setUser(response));
        localStorage.setItem('user_id', response.id);
        this.setState({
          success: true
        });
      }
    });
  };

  render() {
    return (
      <form onSubmit={this.save}>
        <h1>Edit {this.state.name}'s Profile:</h1>
        {this.state.success ? <h3>Changes Saved!</h3> : null }
        <input type='text' name='username' placeholder='Username' value={this.state.username} onChange={this.inputControl} />
        <input type='text' name='name' placeholder='Name' value={this.state.name} onChange={this.inputControl} />
        <input type='password' name='password' placeholder='Password' value={this.state.password} onChange={this.inputControl} />
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