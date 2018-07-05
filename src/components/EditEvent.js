import React from 'react';
import { connect } from 'react-redux';

import { setActiveEvent, setCurrentLocation, resetActiveEvent } from '../actions/index';

class EditEvent extends React.Component {
  state = {
    eventData: {
      title: this.props.activeEvent.title,
      location: this.props.activeEvent.location,
      description: this.props.activeEvent.description,
      key_code: this.props.activeEvent.key_code,
      active: this.props.activeEvent.active
    },
    confirmDelete: false
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
    if (e.target.name === 'delete-event'){
      this.setState({
        confirmDelete: true
      });
    }else if (e.target.name === 'cancel-delete-event'){
      this.setState({
        confirmDelete: false
      });
    }else if (e.target.name === 'confirm-delete-event') {
      this.confirmDeletion();
    };
  };

  cancelDeletion = () => {
    console.log('cancelling deletion');
    this.setState({
      confirmDelete: false
    });
  };

  confirmDeletion = () => {
    console.log('deletion confirmed.');
    this.deleteSongEntries();
  };

  deleteSongEntries = () => {
    console.log('deleteSongEntries..');
    const entryURL = 'http://localhost:3000/api/v1/song_entries';
    fetch(entryURL)
    .then( response => response.json() )
    .then(array => {
      array.forEach(se => {
        if (se.event_id === this.props.activeEvent.id){
          this.deleteHelper(entryURL, se.id);
        };
      });
    })
    .then(this.deleteUserEvents);
  };

  deleteUserEvents = () => {
    console.log('deleteUserEvents..');
    const userEventsURL = 'http://localhost:3000/api/v1/user_events';
    fetch(userEventsURL)
    .then( response => response.json())
    .then(array => {
      array.forEach(uev => {
        if (uev.event_id === this.props.activeEvent.id){
          this.deleteHelper(userEventsURL, uev.id);
        };
      });
    })
    .then(this.deleteTheEvent() );
  };

  deleteTheEvent = () => {
    console.log('about to delete the actual event.');
    fetch('http://localhost:3000/api/v1/events/'+ this.props.activeEvent.id, {
      method: 'DELETE'
    })
    .then(response => response.json() )
    .then(() => {
      this.props.dispatch(setCurrentLocation('/'));
      window.history.pushState({}, "new state", "/");
      this.props.dispatch(resetActiveEvent());
    } );
    // this.deleteHelper('http://localhost:3000/api/v1/events', this.props.activeEvent.id);
    // this.props.dispatch(setCurrentLocation('/'));
    // window.history.pushState({}, "new state", "/");
    // this.props.dispatch(resetActiveEvent());
  };

  deleteHelper = (url, id) => {
    fetch(url + '/' + id, {
      method: 'DELETE'
    })
    .then(response => response.json() );
  };

  doNothing = (e) => {
    e.preventDefault();
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
        <form onSubmit={this.doNothing} >
          {this.state.confirmDelete ? <React.Fragment><input type='submit' name='cancel-delete-event' value='cancel' onClick={this.deleteEvent} /> <input type='submit' name='confirm-delete-event' value='confirm delete' onClick={this.deleteEvent} /></React.Fragment> : <input type='submit' name='delete-event' value='delete event' onClick={this.deleteEvent} /> }
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