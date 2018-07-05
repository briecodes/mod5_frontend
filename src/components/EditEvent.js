import React from 'react';
import { connect } from 'react-redux';

import { setActiveEvent, setCurrentLocation } from '../actions/index';

class EditEvent extends React.Component {
  state = {
    eventData: {
      title: this.props.activeEvent.title,
      location: this.props.activeEvent.location,
      description: this.props.activeEvent.description,
      key_code: this.props.activeEvent.key_code,
      active: this.props.activeEvent.active
    }
  };

  inputControl = (e) => {
    this.setState({
      eventData: {
        ...this.state.eventData,
        [e.target.name]: e.target.value
      }
    });
  };

  submitEvent = (e) => {
    e.preventDefault();
    e.persist();
    fetch('http://localhost:3000/api/v1/events/' + this.props.activeEvent.id, {
      method: 'PATCH',
      body: JSON.stringify(this.state.eventData),
      headers: {'Content-Type': 'application/json'}
      })
      .then( res => res.json() )
      .then( response => {
        this.props.dispatch(setActiveEvent(response));
        return response} )
      .then(event => this.props.dispatch(setCurrentLocation('/events/'+event.id)) );
  };

  deleteEvent = (e) => {
    e.preventDefault();
    console.log('delete event..');
  };

  check = () => {
    this.setState({
      eventData: {
        ...this.state.eventData,
        active: !this.state.eventData.active
      }
    });
  };

  render() {
    // console.log('state', this.state.eventData);
    return (
      <React.Fragment>
        <form onSubmit={this.submitEvent}>
          <h1>Editing {this.props.activeEvent.title}</h1>
          <input type='text' name='title' placeholder='Title' value={this.state.eventData.title} onChange={this.inputControl} />
          <input type='text' name='location' placeholder='Location' value={this.state.eventData.location} onChange={this.inputControl} />
          <input type='text' name='description' placeholder='Description' value={this.state.eventData.description} onChange={this.inputControl} />
          <input type='text' name='key_code' placeholder='Key Code' value={this.state.eventData.key_code} onChange={this.inputControl} />
          {this.state.eventData.active ? <React.Fragment><input type='checkbox' name='active' onChange={this.check} defaultChecked /> Active</React.Fragment> : <React.Fragment><input type='checkbox' name='active' onChange={this.check} /> Active</React.Fragment>}
          <input type='submit'/>
        </form>
        <form onSubmit={this.deleteEvent}>
          <input type='submit' value='delete event' />
        </form>
      </React.Fragment>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser,
    activeEvent: state.activeEvent
  };
};

export default connect(mapStateToProps)(EditEvent);