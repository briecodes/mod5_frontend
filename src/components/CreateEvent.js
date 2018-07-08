import React from 'react';
import { connect } from 'react-redux';

import { setActiveEvent, setCurrentLocation } from '../reducers/index';

class CreateEvent extends React.Component {

  state = {
    title: '',
    location: '',
    description: '',
    key_code: ''
  }

  createEvent = (e) => {
    e.preventDefault();
    e.persist();
    if (this.state.password === this.state.password_retype){
      fetch('http://localhost:3000/api/v1/events', {
        method: 'POST',
        body: JSON.stringify({user_id: localStorage.getItem('user_id'), title: this.state.title, location: this.state.location, description: this.state.description, key_code: this.state.key_code, active: true}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
      .then( res => res.json() )
      .then( response => {
        // console.log('response:', response );
        if (response.errors){
          alert(response.errors[0]);
        }else{
          this.stateReset();
          e.target.reset();
          this.exploreEvent(response);
          return response;
        }
      }).then(response => {
        window.history.pushState({}, "new state", '/events/' + response.id);
        this.props.dispatch(setCurrentLocation('/events/' + response.id))
      });
    }else {
      console.log('Error! Something is amiss...');
    };
  };

  exploreEvent = (event) => {
    this.props.dispatch(setActiveEvent(event));
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

  render() {
    return (
      <div id='form-container'>
        <form onSubmit={this.createEvent}>
          <h1>Create a Karaoke Event!</h1>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' name='title' className='form-input' placeholder='Title' value={this.state.title} onChange={this.inputControl} /><br />
          <label htmlFor='location'>Location</label>
          <input type='text' id='location' name='location' className='form-input' placeholder='Location' value={this.state.location} onChange={this.inputControl} /><br />
          <label htmlFor='description'>Description</label>
          <input type='text' id='description' name='description' className='form-input' placeholder='Brief Description' value={this.state.description} onChange={this.inputControl} /><br />
          <label htmlFor='key-code'>Key Code</label>
          <input type='text' id='key-code' name='key_code' className='form-input' placeholder='key_code' value={this.state.key_code} onChange={this.inputControl} /><br />
          <center>
            <p>
              <input type='submit' className='submit'/>
            </p>
          </center>
        </form>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser
  };
};

export default connect(mapStateToProps)(CreateEvent);