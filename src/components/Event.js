import React from 'react';
import { connect } from 'react-redux';

import SongForm from '../components/SongForm';
import EventAdminConsole from '../components/EventAdminConsole';
import EventGuestPerformersList from './EventGuestPerformersList';
import EventData from '../components/EventData';
import { HURL, loggedInUserId, localToken, pathEventId, setActiveEvent, setPerformerList, setAttending, inputControl } from '../actions/index';

class Event extends React.Component {

  state = {
    keyCode: '',
    error: ''
  }

  componentDidMount() {
    this.getEventDetails();
    this.getEventPerformerList();
    this.fetchInterval = window.setInterval( () => this.compareList(), 2000);
  };

  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  getEventDetails = () => {
    fetch(HURL('/api/v1/events/') + pathEventId(), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
      }
    }).then(response => response.json() )
    .then(eve => {
      this.props.dispatch(setActiveEvent(eve));
      this.eventAttendanceCheck(eve.user_events);
    });
  };

  eventAttendanceCheck = () => {
    let theResult = this.props.activeEvent.user_events.find(userEvent => {
      return userEvent.user_id === loggedInUserId();
    });
    theResult = theResult ? true : false;
    this.props.dispatch(setAttending(theResult));
  };

  getEventPerformerList = () => {
    fetch(HURL('/api/v1/song_entries/'), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
      }
    }).then(response => response.json() )
    .then(performerList => {
      const list = []
      performerList.forEach(entry => {
        if (entry.event_id === pathEventId() && entry.played === false && entry.passed === false){
          list.push(entry);
        };
      });
      this.props.dispatch(setPerformerList(list));
    });
  };

  compareList = () => {
    fetch(HURL('/api/v1/song_entries/'), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
      }
    }).then(response => response.json() )
    .then(performerList => {
      const list = []
      performerList.forEach(entry => {
        if (entry.event_id === pathEventId() && entry.played === false && entry.passed === false){
          list.push(entry);
        };
      });
      if (list.length !== this.props.performerList.length){
        this.getEventPerformerList();
      }
    });
  };

  getUserEvents = () => {
    fetch(HURL('/api/v1/user_events'), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
      }
    }).then( response => response.json() )
    .then(array => {
      array.find(userEvent => {
        return userEvent.event_id === this.props.activeEvent
      });
    });
  };

  createUserEvent = () => {
    fetch(HURL('/api/v1/user_events'), {
        method: 'POST',
        body: JSON.stringify({user_id: loggedInUserId(), event_id: this.props.activeEvent.id}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localToken()
        }
      })
      .then( res => res.json() )
      .then( response => {
      }).then(() => this.getEventDetails() );
  };

  deleteUserEvent = (id) => {
    fetch(HURL('/api/v1/user_events/') + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localToken()
        }
    })
    .then( res => res.json() )
    .then( () => this.getEventDetails() );
  };

  validateKeyCode = (e) => {

    if(this.state.keyCode === ''){
      this.setState({
        error: 'Key Code missing.'
      });
    }else if (this.state.keyCode !== this.props.activeEvent.key_code){
      this.setState({
        error: 'Key Code is incorrect.'
      });
    }else if (this.state.keyCode === this.props.activeEvent.key_code){
      this.attendButton(e);
    };
  };

  attendButton = (e) => {
    if (e.target.name === 'join'){
      this.createUserEvent();
    }else{
      const uev = this.props.activeEvent.user_events.find(userevent => userevent.user_id === loggedInUserId());
      this.deleteUserEvent(uev.id);
    }
  };

  markAsPerformed = (id) => {
    fetch(HURL('/api/v1/song_entries/') + id, {
      method: 'PATCH',
      body: JSON.stringify({played: true}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
      }
    })
      .then( res => res.json() )
      .then( response => {
        this.getEventPerformerList();
      });
  };

  render() {
    console.log('state key', this.state.keyCode);
    return (
      <React.Fragment>
        { loggedInUserId() === this.props.activeEvent.user_id ? <EventAdminConsole/> : null }
        
        {this.props.activeEvent.title && loggedInUserId() !== this.props.activeEvent.user_id ? <EventData/> : null}

        {this.props.attending ? <React.Fragment> <EventGuestPerformersList/> <SongForm/> </React.Fragment> : null}

        <div className='divider'></div>
        <center>
          {this.props.attending ? <input type='submit' name='leave' value='Leave Event' className='submit leave-event light' onClick={this.attendButton} /> : this.props.activeEvent.user_id !== loggedInUserId() ? <React.Fragment>
            This event is private. Please enter key code to join:<br />
            <span className='error-message'>{this.state.error}</span><br />
            <input type='text' name='keyCode' placeholder='Key Code' value={this.state.keyCode} onChange={inputControl.bind(this)} className='input' /><br/>
            <input type='submit' name='join' value='Join Event' className='submit join-event light' onClick={this.validateKeyCode} />
            </React.Fragment> : null}
        </center>
      </React.Fragment>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeEvent: state.activeEvent,
    performerList: state.performerList,
    attending: state.attending
  };
};

export default connect(mapStateToProps)(Event);