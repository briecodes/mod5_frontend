import React from 'react';
import { connect } from 'react-redux';

import { setUser } from '../actions/index';

class CreateEvent extends React.Component {

  state = {
    title: '',
    location: '',
    description: '',
    key_code: ''
  }

  createUser = (e) => {
    e.preventDefault();
    e.persist();
    if (this.state.password === this.state.password_retype){
      console.log('new user accepted');
      fetch('http://localhost:3000/api/v1/events', {
        method: 'POST',
        body: JSON.stringify({user_id: this.props.userId, title: this.state.title, location: this.state.location, description: this.state.description, key_code: this.state.key_code, active: true}),
        headers: {'Content-Type': 'application/json'}
      })
      .then( res => res.json() )
      .then( response => {
        console.log('response:', response );
        if (response.errors){
          alert(response.errors[0]);
        }else{
          this.stateReset();
          e.target.reset();
        }
      });
    }else {
      console.log('error: password does not match');
    };
  };

  stateReset = () => {
    this.setState({
      title: '',
      location: '',
      description: '',
      key_code: ''
    });
  }

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
      console.log(`Warning! Password does not match.`);
    };
  };

  render() {
    return (
      <form onSubmit={this.createUser}>
        <h1>Create a Karaoke Event!</h1>
        <input type='text' name='title' placeholder='Title' value={this.state.title} onChange={this.inputControl} />
        <input type='text' name='location' placeholder='Location' value={this.state.location} onChange={this.inputControl} />
        <input type='text' name='description' placeholder='Brief Description' value={this.state.description} onChange={this.inputControl} />
        <input type='text' name='key_code' placeholder='key_code' value={this.state.key_code} onChange={this.inputControl} />
        <input type='submit'/>
      </form>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.userId
  }
}

export default connect(mapStateToProps)(CreateEvent);