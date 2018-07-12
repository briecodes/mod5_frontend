import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { HURL, localToken, setActiveEvent, setCurrentLocation, loggedInUserId } from '../actions/index';

class AllEvents extends React.Component {

  state = {
    events: []
  };

  componentDidMount() {
    this.fetchEvents();
  };

  fetchEvents = () => {
    fetch(HURL('api/v1/events'), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
      }
    }).then( res => res.json() )
    .then( events => {
      if (events.error || events.errors){
        console.log('error!', events);
      }else{
        events.forEach(event => {
          if (event.public){
            this.setState({
              events: [...this.state.events, event]
            });
          };
        });
      };
    });
  };

  exploreEvent = (event) => {
    this.props.dispatch(setActiveEvent(event));
    this.props.dispatch(setCurrentLocation('/events/'+event.id));
  };

  render() {
    console.log('state', this.state);
    return (
      <React.Fragment>
        <div className='col-half'>
          <span className='home-text light line-light'>Explore Events:</span>
        </div>
        {this.state.events.map(event => <React.Fragment key={event.id}>
            <div key={event.id} className='allevents-event light'>
                <span className='medium explore-event-title'>{event.title}</span>, hosted by {event.user.id === loggedInUserId() ? 'me!' : event.user.name }<br />
                <em>{event.description}</em><br />
                <Link to={'/events/' + event.id} onClick={() => this.exploreEvent(event)} > view > </Link>
            </div>
            </React.Fragment>)}
      </React.Fragment>
    );
  };
};

export default connect()(AllEvents);