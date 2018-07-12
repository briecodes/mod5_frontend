import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { HURL, localToken, setActiveEvent, setCurrentLocation, loggedInUserId } from '../actions/index';

class AllEvents extends React.Component {

  state = {
    events: [],
    count: 0
  };

  componentDidMount() {
    this.fetchEvents();
  };

  fetchEvents = () => {
    fetch(HURL('/api/v1/events'), {
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

  count = () => {
    this.setState({
      count: this.state.count + 1
    });
    console.log('count', this.state.count);
    return this.state.count;
  };

  render() {
    return (
      <React.Fragment>
        <div className='col-half'>
          <span className='home-text light line-light'>Explore Events:</span>
        </div>
        {this.state.events.map((event, index) => <React.Fragment key={event.id}>
            <div key={event.id} className='allevents-event light'>
                <span className='medium explore-event-title'>{event.title}</span> {event.users.map(user => user.id).includes(loggedInUserId()) ? '(attending)' : null }<br/>
                <em className='explore-event-desc'>{event.description}</em>
                <div className='divider spacer'></div>
                <div className='divider line-light'></div>
                <div className='divider spacer '></div>
                Hosted by {event.user.id === loggedInUserId() ? 'me!' : event.user.name } | <Link to={'/events/' + event.id} onClick={() => this.exploreEvent(event)} > view > </Link>
            </div>
            {(index + 1) % 3 === 0 ? <div className='divider line'></div> : null }
            </React.Fragment>)}
      </React.Fragment>
    );
  };
};

export default connect()(AllEvents);