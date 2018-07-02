import React from 'react';
import { connect } from 'react-redux';

class Event extends React.Component {

  componentDidUpdate() {
    // this.getUserEvents();
    // if (this.props.activeEvent){
    //   this.eventAttendanceCheck(this.getEventUsers());
    // };
  };

  eventAttendanceCheck = (arr) => {
    arr.find(userEvent => {
      return userEvent.user_id === this.props.activeUser.id;
    });
  };

  getEventUsers = () => {
    fetch('http://localhost:3000/api/v1/events/' + this.props.activeEvent.id).then(response => response.json() )
    .then(array => {
      const tim = array.user_events;
      console.log('tim', tim);
      return tim
    });
  };

  getUserEvents = () => {
    fetch('http://localhost:3000/api/v1/user_events').then( response => response.json() )
    .then(array => {
      const tim = array.find(userEvent => {
        return userEvent.event_id === this.props.activeEvent
      });
      // console.log('tim', tim);
    });
  };

  render() {
    // console.log('activeEvent', this.props.activeEvent);
    return (
      <div>
        {this.props.activeEvent ? <React.Fragment>
            <h1>{this.props.activeEvent.title}</h1>
            <p>Location: {this.props.activeEvent.location}</p>
            <p>{this.props.activeEvent.description}</p>
          </React.Fragment> : null}
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