import React from 'react';
import { connect } from 'react-redux';

import SongForm from '../components/SongForm';
import { setActiveEvent, setPerformerList } from '../reducers/index';
import { parseUrl } from '../actions/index';

class Event extends React.Component {

  state = {
    attending: false,
    attending_id: null,
    height: ''
  };

  eventId = parseInt(parseUrl(window.location.pathname), 10);
  localUserId = parseInt(localStorage.getItem('user_id'), 10);

  componentDidMount() {
    window.addEventListener("resize", function(){
      this.calculateHeight();
    }.bind(this), true);

    this.calculateHeight();
    this.getEventDetails();
    this.getEventPerformerList();
  };

  calculateHeight = () => {
    this.setState({
      height: (window.innerWidth * .7) * 9/16
    });
  };

  eventAttendanceCheck = (arr) => {
    // console.log('attendance arr', arr);
    let theResult = arr.find(userEvent => {
      return userEvent.user_id === this.localUserId;
    });
    theResult = theResult ? true : false;
    this.setState({
      attending: theResult
    });
  };

  getEventDetails = () => {
    fetch('http://localhost:3000/api/v1/events/' + this.eventId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then(response => response.json() )
    .then(eve => {
      // console.log('geteventdetails active', eve);
      this.props.dispatch(setActiveEvent(eve));
      this.eventAttendanceCheck(eve.user_events);
    });
  };

  getEventPerformerList = () => {
    fetch('http://localhost:3000/api/v1/song_entries/', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then(response => response.json() )
    .then(performerList => {
      const list = []
      performerList.forEach(entry => {
        if (entry.event_id === this.eventId && entry.played === false && entry.passed === false){
          list.push(entry);
        };
      });
      this.props.dispatch(setPerformerList(list));
    });
  };

  getUserEvents = () => {
    fetch('http://localhost:3000/api/v1/user_events', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then( response => response.json() )
    .then(array => {
      array.find(userEvent => {
        return userEvent.event_id === this.props.activeEvent
      });
    });
  };

  createUserEvent = () => {
    fetch('http://localhost:3000/api/v1/user_events', {
        method: 'POST',
        body: JSON.stringify({user_id: this.localUserId, event_id: this.props.activeEvent.id}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
      })
      .then( res => res.json() )
      .then( response => {
        // console.log('response:', response );
      }).then(() => this.getEventDetails() );
  };

  deleteUserEvent = (id) => {
    fetch('http://localhost:3000/api/v1/user_events/' + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
    })
    .then( res => res.json() )
    // .then( response => console.log('response:', response ))
    .then( () => this.getEventDetails() );
  };

  attendButton = (e) => {
    if (e.target.name === 'join'){
      this.createUserEvent();
    }else{
      const uev = this.props.activeEvent.user_events.find(userevent => userevent.user_id === this.localUserId);
      this.deleteUserEvent(uev.id);
    }
  };

  markAsPerformed = (id) => {
    fetch('http://localhost:3000/api/v1/song_entries/' + id, {
      method: 'PATCH',
      body: JSON.stringify({played: true}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    })
      .then( res => res.json() )
      .then( response => {
        // console.log('success:', response);
        this.getEventPerformerList();
      });
  };

  render() {
    return (
      <React.Fragment>
        { this.localUserId === this.props.activeEvent.user_id ? <React.Fragment>
          {this.props.performerList.length > 0 ? <iframe id='mainPlayer' height={this.state.height} title='Admin Player' type='text/html'
                  src={`http://www.youtube.com/embed/${this.props.performerList[0].video_id}`} frameBorder='0'></iframe> : null}
          <div className='admin-list' style={{height: this.state.height}}>
            {this.props.performerList.map(perf => <div key={perf.id} className='admin-performer current'><span className='admin-performer-name'>{perf.user.name} <button className='admin-next-button' onClick={() => this.markAsPerformed(perf.id)} >></button></span> {perf.song_title} by {perf.song_artist}</div>)[0]}
            {this.props.performerList.slice(1).map(perf => <div key={perf.id} className='admin-performer'><span className='admin-performer-name'>{perf.user.name}</span> {perf.song_title} by {perf.song_artist}</div>)}
          </div>
          <h1>{this.props.activeEvent.title}</h1>
        </React.Fragment> : null}

          {this.state.attending ? <React.Fragment>
            {this.props.activeEvent ? <React.Fragment>
              <h1>{this.props.activeEvent.title} {this.state.attending ? <button type='button' name='leave' onClick={this.attendButton}>Leave</button> : this.props.activeEvent.user_id !== this.localUserId ? <button type='button' name='join' onClick={this.attendButton}>Join</button> : null}</h1>
              <p>Location: {this.props.activeEvent.location}</p>
              <p>{this.props.activeEvent.description}</p>
            </React.Fragment> : null}
            <ul>
              {this.props.performerList.map(perf => <li key={perf.id}>{perf.user.name} Sings {perf.song_artist}'s {perf.song_title}</li>)}
            </ul>
            <SongForm/>
            </React.Fragment> : null}
      </React.Fragment>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser,
    activeEvent: state.activeEvent,
    performerList: state.performerList,
    currentLocation: state.currentLocation
  };
};

export default connect(mapStateToProps)(Event);