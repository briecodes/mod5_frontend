import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { setActiveEvent, setCurrentLocation, resetStore } from '../reducers/index';
import { parseUrl, HURL } from '../actions/index';

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
    fetch(HURL('/api/v1/events/') + this.eventId, {
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
    fetch(HURL('/api/v1/events/') + this.eventId, {
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
    const entryURL = HURL('/api/v1/song_entries');
    fetch(entryURL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then( response => response.json() )
    .then(array => {
      // console.log('delete songEntries');
      array.forEach(se => {
        if (se.event_id === this.eventId){
          this.deleteHelper(entryURL, se.id);
        };
      });
    })
    .then(this.deleteUserEvents);
  };

  deleteUserEvents = () => {
    const userEventsURL = HURL('/api/v1/user_events');
    fetch(userEventsURL, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
    .then( response => response.json())
    .then(array => {
      // console.log('delete userEvents');
      array.forEach(uev => {
        if (uev.event_id === this.eventId){
          this.deleteHelper(userEventsURL, uev.id);
        };
      });
    })
    .then(this.deleteTheEvent() );
  };

  deleteTheEvent = () => {
    fetch(HURL('/api/v1/events/')+ this.eventId, {
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
      // console.log('last delete');
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
      <div id='form-container'>
        {this.state.deleted ? <React.Fragment>
          <h1>Event Deleted!</h1>
          <h3><Link to='/' onClick={() => this.props.dispatch(setCurrentLocation('/'))} >Go home ></Link></h3>
        </React.Fragment> : null }
        {this.state.eventData.title ? <React.Fragment><form onSubmit={this.submitEvent}>
          <center>
            <span className='home-text light'>Editing {this.props.activeEvent.title}</span>
            {this.state.success ? <h3>Event updated! <Link to={'/events/' + this.eventId} onClick={() => this.props.dispatch(setCurrentLocation('/events/' + this.eventId))}>View ></Link></h3> : null }
          </center>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' name='title' className='form-input' placeholder='Title' value={this.state.eventData.title} onChange={this.inputControl} />
          
          <label htmlFor='location'>Location</label>
          <input type='text' id='location' name='location' className='form-input' placeholder='Location' value={this.state.eventData.location} onChange={this.inputControl} />
          <label htmlFor='description'>Description</label>
          <input type='text' id='description' name='description' className='form-input' placeholder='Description' value={this.state.eventData.description} onChange={this.inputControl} />
          <label htmlFor='key-code'>Key Code</label>
          <input type='text' id='key-code' name='key_code' className='form-input' placeholder='Key Code' value={this.state.eventData.key_code} onChange={this.inputControl} /><br />
          <label htmlFor=''></label>
          <center>
            {this.state.eventData.active ? <React.Fragment><input type='checkbox' name='active' onChange={this.check} defaultChecked /> Active</React.Fragment> : <React.Fragment><input type='checkbox' name='active' onChange={this.check} /> Active</React.Fragment>}<br />
          </center>
          <center>
            <p>
              <input type='submit' className='submit' />
            </p>
          </center>
        </form>
        <form onSubmit={this.doNothing} >
        <p>&nbsp;</p>
          <center>
            <p>
              {this.state.confirmDelete ? <React.Fragment>
                  <input type='submit' className='submit' name='cancel-delete-event' value='cancel' onClick={this.deleteEvent} />
                  &nbsp;&nbsp;&nbsp; 
                  <input type='submit' className='submit delete-btn' name='confirm-delete-event' value='confirm delete' onClick={this.deleteEvent} />
                </React.Fragment> : <input type='submit' className='delete-btn' name='delete-event' value='delete event' onClick={this.deleteEvent} /> }
            </p>
          </center>
        </form></React.Fragment> : null }
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeEvent: state.activeEvent
  };
};

export default connect(mapStateToProps)(EditEvent);