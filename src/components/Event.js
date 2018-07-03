import React from 'react';
import { connect } from 'react-redux';

import SongForm from '../components/SongForm';
import { setActiveEvent } from '../actions/index';



class Event extends React.Component {

  state = {
    attending: false,
    performerList: []
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
          this.setState({
            performerList: [...this.state.performerList, entry]
          });
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

  render() {
    return (
      <div>
        {this.props.activeEvent ? <React.Fragment>
            <h1>{this.props.activeEvent.title}</h1>
            <p>Location: {this.props.activeEvent.location}</p>
            <p>{this.props.activeEvent.description}</p>
          </React.Fragment> : null}
          <ul>
            {this.state.performerList.map(perf => <li key={perf.id}>{perf.user.name} Sings {perf.song_artist}'s {perf.song_title}</li>)}
          </ul>
          <SongForm/>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser,
    activeEvent: state.activeEvent
  };
};

export default connect(mapStateToProps)(Event);