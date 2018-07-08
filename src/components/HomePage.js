import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { setActiveEvent, setCurrentLocation } from '../reducers/index';

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
    const localUserId = parseInt(localStorage.getItem('user_id'), 10);
    fetch('http://localhost:3000/api/v1/events', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then( response => response.json() ).then(array => {
      array.forEach(event => {
        if (event.user_id === localUserId){
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
          if (usrEvt.user_id === localUserId){
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
        <h1>HomePage</h1>
        <div className='col-third float-left'>
          <ul>
            <h3>My Hosted Events:</h3>
            {this.state.myCurrentEvents.map(event => <li key={event.id} >{event.title} | <Link to={'/events/' + event.id} onClick={() => this.exploreEvent(event)} >view</Link> | <Link to={'/edit-event/' + event.id} onClick={() => this.editEvent(event)} >edit</Link></li>)}
          </ul>
        </div>
        <div className='col-third float-left'>
          <ul>
            <h3>My Past Hosted Events:</h3>
            {this.state.myPastEvents.map(event => <li key={event.id} >{event.title} | <Link to={'/events/' + event.id} onClick={() => this.exploreEvent(event)} >view</Link> | <Link to={'/edit-event/' + event.id} onClick={() => this.editEvent(event)} >edit</Link></li>)}
          </ul>
        </div>
        <div className='col-third float-left'>
          <ul>
            <h3>Attending Events:</h3>
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