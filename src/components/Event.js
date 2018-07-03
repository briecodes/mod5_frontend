import React from 'react';
import { connect } from 'react-redux';

class Event extends React.Component {

  state = {
    attending: false
  };

  componentDidMount() {
    // this.getEventUsers();
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

  getEventUsers = () => {
    console.log('getevent...');
    fetch('http://localhost:3000/api/v1/events/' + this.props.activeEvent.id).then(response => response.json() )
    .then(array => {
      const tim = array.user_events;
      this.eventAttendanceCheck(tim);
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