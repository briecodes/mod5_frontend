import React from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { setActiveEvent } from '../actions/index';

class HomePage extends React.Component {

  state = {
    myCurrentEvents: [],
    myPastEvents: [],
    visitedEvents: []
  };

  componentDidMount(){
    this.getMyEvents();
  }
  
  getMyEvents = () => {
    fetch('http://localhost:3000/api/v1/events').then( response => response.json() ).then(array => {
      array.forEach(event => {
        if (event.user_id === this.props.activeUser.id){
          if (event.active){
            // console.log('active event', event);
            this.setState({
              myCurrentEvents: [...this.state.myCurrentEvents, event]
            });
          }else{
            // console.log('else event', event);
            this.setState({
              myPastEvents: [...this.state.myPastEvents, event]
            });
          };

          event.song_entries.forEach(song => {
            if (song.user_id === this.props.activeUser.id){
              this.setState({
                visitedEvents: [...this.state.visitedEvents, event]
              });
            };
          });

        };
      });
    });
  };

  checkEvents = () => {
    console.log('event state', this.state.myEvents[0].title);
  };

  exploreEvent = (event) => {
    this.props.dispatch(setActiveEvent(event));
  };

  render() {
    return (
      <div>
        <h1 onClick={this.checkEvents}>HomePage</h1>
        <ul>
          <h3>Current Events:</h3>
          {this.state.myCurrentEvents.map(event => <li key={event.id} ><Link to={'/events/' + event.id} onClick={() => this.exploreEvent(event)} >{event.title} ></Link></li>)}
        </ul>
        <ul>
          <h3>Past Events:</h3>
          {this.state.myPastEvents.map(event => <li key={event.id} >{event.title} ></li>)}
        </ul>
        <ul>
          <h3>Visited Events:</h3>
          {this.state.visitedEvents.map(event => <li key={event.id} >{event.title} > {event.song_entries.map(song => <p key={song.id}>{song.song_title}</p>)}</li>)}
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