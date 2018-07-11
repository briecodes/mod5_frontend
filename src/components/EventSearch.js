import React from 'react';
import { connect } from 'react-redux';

import { HURL, setActiveEvent, setCurrentLocation, setAttending, loggedInUserId } from '../actions/index';

class EventSearch extends React.Component {
  state = {
    searchTerm: '',
    foundEvents: []
  };

  inputControl = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.searchEvents(e);
  };

  clearState = () => {
    this.setState({
      searchTerm: '',
      foundEvents: []
    });
  };

  fetchEvents = (searchTerm) => {
    fetch(HURL('/api/v1/events'), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then( response => response.json() ).then(array => {
      const foundEvents = array.filter(event => event.title.toLowerCase().includes(searchTerm.toLowerCase()) && event.user_id !== parseInt(localStorage.getItem('user_id'), 10));
      this.setState({
        foundEvents
      });
    });
  };

  searchEvents = (e) => {
    if (e.target.value === '' || e.target.value === ' '){
      this.clearState(e);
    }else{
      this.fetchEvents(e.target.value);
    };
  };

  exploreEvent = (event) => {
    this.clearState();
    window.history.pushState({}, "new state", '/events/' + event.id);
    this.props.dispatch(setActiveEvent(event));
    this.props.dispatch(setCurrentLocation('/events/' + event.id));
    this.eventAttendanceCheck(event);
  };

  eventAttendanceCheck = (event) => {
    let theResult = event.user_events.find(userEvent => {
      return userEvent.user_id === loggedInUserId();
    });
    theResult = theResult ? true : false;
    this.props.dispatch(setAttending(theResult));
  };

  linkHandler = (path, event) => {
    window.history.pushState({}, "new state", path);
    this.exploreEvent(event);
  };

  render() {
    return (
      <div className='float-right search-bar'>
        <input type='text' name='searchTerm' placeholder='Search Events' value={this.state.searchTerm} onChange={this.inputControl} />
        {this.state.searchTerm !== '' ? <React.Fragment>
          <ul id='searchUl'>
            <div id='partySearchResults'>
              {/* {this.state.foundEvents.map(event => <li key={event.id} onClick={() => this.linkHandler(`/events/${event.id}`, event)}>{event.title}</li>)} */}
              {this.state.foundEvents.map(event => <li key={event.id}  onClick={() => this.exploreEvent(event)}>{event.title}</li>)}
            </div>
          </ul>
        </React.Fragment> : null }
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

export default connect(mapStateToProps)(EventSearch);