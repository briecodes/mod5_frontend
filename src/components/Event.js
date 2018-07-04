import React from 'react';
import { connect } from 'react-redux';

import SongForm from '../components/SongForm';
import { setActiveEvent, addPerformerToList } from '../actions/index';



class Event extends React.Component {

  state = {
    attending: false,
    attending_id: null
  };

  componentDidMount() {
    this.getEventDetails();
    this.getEventPerformerList();
  };

  eventAttendanceCheck = (arr) => {
    let theResult = arr.find(userEvent => {
      return userEvent.user_id === this.props.activeUser.id;
    });
    theResult = theResult ? true : false;
    this.setState({
      attending: theResult
    });
  };

  getEventDetails = () => {
    fetch('http://localhost:3000/api/v1/events/' + this.props.activeEvent.id).then(response => response.json() )
    .then(activeEvent => {
      this.props.dispatch(setActiveEvent(activeEvent));
      this.eventAttendanceCheck(activeEvent.user_events);
    });
  };

  getEventPerformerList = () => {
    fetch('http://localhost:3000/api/v1/song_entries/').then(response => response.json() )
    .then(performerList => {
      performerList.forEach(entry => {
        if (entry.event_id === this.props.activeEvent.id){
          this.props.dispatch(addPerformerToList(entry));
        };
      });
    });
  };

  getUserEvents = () => {
    fetch('http://localhost:3000/api/v1/user_events').then( response => response.json() )
    .then(array => {
      array.find(userEvent => {
        return userEvent.event_id === this.props.activeEvent
      });
    });
  };

  deleteUserEvent = (id) => {
    fetch('http://localhost:3000/api/v1/user_events/' + id, {
        method: 'DELETE'
    })
    .then( res => res.json() )
    .then( response => console.log('response:', response ))
    .then( () => this.getEventDetails() );
  };

  attendButton = (e) => {
    if (e.target.name === 'join'){

    }else{
      const uev = this.props.activeEvent.user_events.find(userevent => userevent.user_id === this.props.activeUser.id);
      this.deleteUserEvent(uev.id);
    }
  };

  render() {
    return (
      <div>
        {this.props.activeEvent ? <React.Fragment>
            <h1>{this.props.activeEvent.title} {this.props.activeEvent.user_id} {this.state.attending ? <button type='button' name='leave' onClick={this.attendButton}>Leave</button> : this.props.activeEvent.user_id !== this.props.activeUser.id ? <button type='button' name='join' onClick={this.attendButton}>Join</button> : null}</h1>
            <p>Location: {this.props.activeEvent.location}</p>
            <p>{this.props.activeEvent.description}</p>
          </React.Fragment> : null}

          {this.state.attending ? <React.Fragment>
            <ul>
              {this.props.performerList.map(perf => <li key={perf.id}>{perf.user.name} Sings {perf.song_artist}'s {perf.song_title}</li>)}
            </ul>
            <SongForm/>
            </React.Fragment> : null}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser,
    activeEvent: state.activeEvent,
    performerList: state.performerList
  };
};

export default connect(mapStateToProps)(Event);