import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setActiveEvent, setCurrentLocation, resetStore } from '../reducers/index';
import { parseUrl } from '../actions/index';

class EditEvent extends React.Component {
  state = {
    eventData: {
      title: this.props.activeEvent.title,
      location: this.props.activeEvent.location,
      description: this.props.activeEvent.description,
      key_code: this.props.activeEvent.key_code,
      active: this.props.activeEvent.active
    },
    confirmDelete: false,
    success: false,
    deleted: false
  };

  eventId = parseInt(parseUrl(window.location.pathname), 10);

  componentDidMount() {
    this.getEventData();
  };

  inputControl = (e) => {
    this.setState({
      eventData: {
        ...this.state.eventData,
        [e.target.name]: e.target.value
      }
    });
  };

  resetState = () => {
    this.setState({
      eventData: {
        title: this.props.activeEvent.title,
        location: this.props.activeEvent.location,
        description: this.props.activeEvent.description,
        key_code: this.props.activeEvent.key_code,
        active: this.props.activeEvent.active
      },
      confirmDelete: false,
      success: false
    });
  };

  getEventData = () => {
    fetch('http://localhost:3000/api/v1/events/' + this.eventId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then ( res => res.json() )
    .then( response => {
      if (response.error || response.errors){
        console.log('Warning! Error!', response);
      }else{
        this.setState({
          eventData: response
        });
      };
    } )
  };

  submitEvent = (e) => {
    e.preventDefault();
    e.persist();
    fetch('http://localhost:3000/api/v1/events/' + this.eventId, {
      method: 'PATCH',
      body: JSON.stringify(this.state.eventData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
      })
      .then( res => res.json() )
      .then( response => {
        if (response.errors || response.error){
          console.log('error!', response);
        }else{
          this.props.dispatch(setActiveEvent(response));
          this.setState({
            success: true
          });
        };
      });
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
    this.setState({
      confirmDelete: false
    });
  };

  confirmDeletion = () => {
    this.deleteSongEntries();
  };

  deleteSongEntries = () => {
    const entryURL = 'http://localhost:3000/api/v1/song_entries';
    fetch(entryURL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then( response => response.json() )
    .then(array => {
      console.log('delete songEntries');
      array.forEach(se => {
        if (se.event_id === this.eventId){
          this.deleteHelper(entryURL, se.id);
        };
      });
    })
    .then(this.deleteUserEvents);
  };

  deleteUserEvents = () => {
    const userEventsURL = 'http://localhost:3000/api/v1/user_events';
    fetch(userEventsURL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then( response => response.json())
    .then(array => {
      console.log('delete userEvents');
      array.forEach(uev => {
        if (uev.event_id === this.eventId){
          this.deleteHelper(userEventsURL, uev.id);
        };
      });
    })
    .then(this.deleteTheEvent() );
  };

  deleteTheEvent = () => {
    fetch('http://localhost:3000/api/v1/events/'+ this.eventId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then(response => response.json() )
    .then( response => {
      if(response.errors || response.error){
        console.log('error!', response);
      }else{
        return response
      };
    })
    .then( response => {
      console.log('last delete');
      // this.props.dispatch(setCurrentLocation('/'));
      this.setState({
        deleted: true
      });
      this.props.dispatch(resetStore());
      this.resetState();
      window.history.pushState({}, "new state", window.location.pathname + '/deleted');
    });
  };

  deleteHelper = (url, id) => {
    fetch(url + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
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
        {this.state.deleted ? <React.Fragment>
          <h1>Event Deleted!</h1>
          <h3><Link to='/' onClick={() => this.props.dispatch(setCurrentLocation('/'))} >Go home ></Link></h3>
        </React.Fragment> : null }
        {this.state.eventData.title ? <React.Fragment><form onSubmit={this.submitEvent}>
          <h1>Editing {this.state.eventData.title}</h1>
          {this.state.success ? <h3>Event updated! <Link to={'/events/' + this.eventId} onClick={() => this.props.dispatch(setCurrentLocation('/events/' + this.eventId))}>View ></Link></h3> : null }
          <input type='text' name='title' placeholder='Title' value={this.state.eventData.title} onChange={this.inputControl} />
          <input type='text' name='location' placeholder='Location' value={this.state.eventData.location} onChange={this.inputControl} />
          <input type='text' name='description' placeholder='Description' value={this.state.eventData.description} onChange={this.inputControl} />
          <input type='text' name='key_code' placeholder='Key Code' value={this.state.eventData.key_code} onChange={this.inputControl} />
          {this.state.eventData.active ? <React.Fragment><input type='checkbox' name='active' onChange={this.check} defaultChecked /> Active</React.Fragment> : <React.Fragment><input type='checkbox' name='active' onChange={this.check} /> Active</React.Fragment>}
          <input type='submit'/>
        </form>
        <form onSubmit={this.doNothing} >
          {this.state.confirmDelete ? <React.Fragment><input type='submit' name='cancel-delete-event' value='cancel' onClick={this.deleteEvent} /> <input type='submit' name='confirm-delete-event' value='confirm delete' onClick={this.deleteEvent} /></React.Fragment> : <input type='submit' name='delete-event' value='delete event' onClick={this.deleteEvent} /> }
        </form></React.Fragment> : null }
      </React.Fragment>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeEvent: state.activeEvent
  };
};

export default connect(mapStateToProps)(EditEvent);