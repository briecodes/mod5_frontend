import React from 'react';
import { connect } from 'react-redux'

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
        if (event.user_id === this.props.userId){
          if (event.active){
            this.setState({
              myCurrentEvents: [...this.state.myCurrentEvents, event]
            });
          }else{
            this.setState({
              myPastEvents: [...this.state.myPastEvents, event]
            });
          };

          event.song_entries.forEach(song => {
            if (song.user_id === this.props.userId){
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

  render() {
    return (
      <div>
        <h1 onClick={this.checkEvents}>HomePage</h1>
        <ul>
          <h3>Current Events:</h3>
          {this.state.myCurrentEvents.map(event => <li key={event.id} >{event.title} ></li>)}
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
    userId: state.userId
  };
};

export default connect(mapStateToProps)(HomePage);