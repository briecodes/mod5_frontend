import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { HURL, loggedInUserId, localToken, setActiveEvent, setCurrentLocation } from '../actions/index';

class HomePage extends React.Component {

  state = {
    myCurrentEvents: [],
    myPastEvents: [],
    visitedEvents: []
  };

  componentDidMount() {
    this.getMyEvents();
  }
  
  getMyEvents = () => {
    fetch(HURL('/api/v1/events'), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
      }
    }).then( response => response.json() ).then(array => {
      array.forEach(event => {
        if (event.user_id === loggedInUserId() ){
          if (event.active){
            this.setState({
              myCurrentEvents: [...this.state.myCurrentEvents, event]
            });
          }else{
            this.setState({
              myPastEvents: [...this.state.myPastEvents, event]
            });
          };
        };
        event.user_events.forEach(usrEvt => {
          if (usrEvt.user_id === loggedInUserId() ){
            this.setState({
              visitedEvents: [...this.state.visitedEvents, event]
            });
          };
        });
      });
    });
  };

  checkEvents = () => {
    console.log('event state', this.state.myEvents[0].title);
  };

  exploreEvent = (event) => {
    this.props.dispatch(setActiveEvent(event));
    this.props.dispatch(setCurrentLocation('/events/'+event.id));
  };

  editEvent = (event) => {
    this.props.dispatch(setCurrentLocation('/edit-event/' + event.id));
    this.props.dispatch(setActiveEvent(event));
  };

  render() {
    return (
      <div>
        <div className='col-third float-left'>
          <ul>
            <span className='home-text light line-light'>Hosting Events:</span>
            {this.state.myCurrentEvents.map(event => <li key={event.id} >{event.title} {event.public ? '(public)' : '(private)' }<br /><Link to={'/events/' + event.id} onClick={() => this.exploreEvent(event)} >view</Link> | <Link to={'/edit-event/' + event.id} onClick={() => this.editEvent(event)} >edit</Link></li>)}
          </ul>
        </div>
        <div className='col-third float-left'>
          <ul>
            <span className='home-text light line-light'>Closed Events:</span>
            {this.state.myPastEvents.map(event => <li key={event.id} >{event.title} {event.public ? '(public)' : '(private)' }<br /><Link to={'/events/' + event.id} onClick={() => this.exploreEvent(event)} >view</Link> | <Link to={'/edit-event/' + event.id} onClick={() => this.editEvent(event)} >edit</Link></li>)}
          </ul>
        </div>
        <div className='col-third float-left'>
          <ul>
            <span className='home-text light line-light'>Attending Events:</span>
            {this.state.visitedEvents.map(event => <li key={event.id} ><Link to={'/events/' + event.id} onClick={() => this.exploreEvent(event)} >{event.title} ></Link></li>)}
          </ul>
        </div>
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

export default connect(mapStateToProps)(HomePage);