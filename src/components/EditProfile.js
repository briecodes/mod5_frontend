import React from 'react';
import { connect } from 'react-redux';

import { setUserId } from '../reducers/index';

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
        this.props.dispatch(setUserId(response.id));
        localStorage.setItem('user_id', response.id);
        this.setState({
          success: true
        });
      }
    });
  };

  render() {
    return (
      <div id='form-container'>
        <form onSubmit={this.save}>
          <h1>Edit Profile:</h1>
          {this.state.success ? <h3>Changes Saved!</h3> : null }
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' name='username' className='form-input' placeholder='Username' value={this.state.username} onChange={this.inputControl} />
          <label htmlFor='name'>Name</label>
          <input type='text' id='name' name='name' className='form-input' placeholder='Name' value={this.state.name} onChange={this.inputControl} />
          <label htmlFor='password'>Confirm Password</label>
          <input type='password' id='password' name='password' className='form-input' placeholder='Password' value={this.state.password} onChange={this.inputControl} />
          <center>
            <p>
              <input type='submit' className='submit' />
            </p>
          </center>
        </form>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    user_id: state.user_id
  };
};

export default connect(mapStateToProps)(EditProfile);