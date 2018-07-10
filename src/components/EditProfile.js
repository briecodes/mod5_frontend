import React from 'react';
import { connect } from 'react-redux';

import { HURL, loggedInUserId, localToken, setUserId } from '../actions/index';

class EditProfile extends React.Component {
  state = {
    name: '',
    username: '',
    password: '',
    success: false
  };

  componentDidMount(){
    this.fetchUser();
  }

  inputControl = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  fetchUser = () => {
    fetch(HURL('/api/v1/users/') + loggedInUserId(), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
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
      };
    });
  };

  save = (e) => {
    e.preventDefault();
    fetch(HURL('/api/v1/users/') + loggedInUserId(), {
      method: 'PATCH',
      body: JSON.stringify({username: this.state.username, name: this.state.name, password: this.state.password}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
      }
    })
    .then( res => res.json() )
    .then( response => {
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
          <center>
            <span className='home-text light line-light'>Edit Profile:</span>
            {this.state.success ? <h3>Changes Saved!</h3> : null }
          </center>
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