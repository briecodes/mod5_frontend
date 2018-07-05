import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveEvent, setCurrentLocation } from '../actions/index';

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
    fetch('http://localhost:3000/api/v1/events').then( response => response.json() ).then(array => {
      array.forEach(event => {
        if (event.user_id === this.props.activeUser.id){
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
          if (usrEvt.user_id === this.props.activeUser.id){
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
    this.props.dispatch(setCurrentLocation('/events/'+event.id));
    this.props.dispatch(setActiveEvent(event));
  };

  editEvent = (event) => {
    this.props.dispatch(setCurrentLocation('/edit-event/'+event.id));
    this.props.dispatch(setActiveEvent(event));
  };

  render() {
    return (
      <div>
        <h1>HomePage</h1>
        <ul>
          <h3>My Events:</h3>
          {/* {this.state.myCurrentEvents.map(event => <li key={event.id} ><Link to={'/events/' + event.id} onClick={() => this.exploreEvent(event)} >{event.title} ></Link></li>)} */}
          {this.state.myCurrentEvents.map(event => <li key={event.id} >{event.title} | <Link to={'/events/' + event.id} onClick={() => this.exploreEvent(event)} >view</Link> | <Link to={'/edit-event/' + event.id} onClick={() => this.editEvent(event)} >edit</Link></li>)}
        </ul>
        <ul>
          <h3>My Past Events:</h3>
          {this.state.myPastEvents.map(event => <li key={event.id} >{event.title} | <Link to={'/events/' + event.id} onClick={() => this.exploreEvent(event)} >view</Link> | <Link to={'/edit-event/' + event.id} onClick={() => this.editEvent(event)} >edit</Link></li>)}
        </ul>
        <ul>
          <h3>Attending Events:</h3>
          {this.state.visitedEvents.map(event => <li key={event.id} ><Link to={'/events/' + event.id} onClick={() => this.exploreEvent(event)} >{event.title} ></Link></li>)}
        </ul>
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