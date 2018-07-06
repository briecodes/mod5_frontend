import React from 'react';
import { connect } from 'react-redux';

import SongForm from '../components/SongForm';
import { setActiveEvent, setPerformerList } from '../reducers/index';



class Event extends React.Component {

  state = {
    attending: false,
    attending_id: null
  };

  componentDidMount() {
    this.getEventDetails();
    this.getEventPerformerList();
  };

  eventAttendanceCheck = (arr) => {
    let theResult = arr.find(userEvent => {
      return userEvent.user_id === parseInt(localStorage.getItem('user_id'), 10);
    });
    theResult = theResult ? true : false;
    this.setState({
      attending: theResult
    });
  };

  getEventDetails = () => {
    fetch('http://localhost:3000/api/v1/events/' + this.props.activeEvent.id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      }
    }).then(response => response.json() )
    .then(activeEvent => {
      this.props.dispatch(setActiveEvent(activeEvent));
      this.eventAttendanceCheck(activeEvent.user_events);
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
        if (entry.event_id === this.props.activeEvent.id && entry.played === false && entry.passed === false){
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
        body: JSON.stringify({user_id: parseInt(localStorage.getItem('user_id'), 10), event_id: this.props.activeEvent.id}),
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
      const uev = this.props.activeEvent.user_events.find(userevent => userevent.user_id === parseInt(localStorage.getItem('user_id'), 10));
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
      <div>

        {parseInt(localStorage.getItem('user_id'), 10) === this.props.activeEvent.user_id ? <React.Fragment>
          {this.props.performerList.length > 0 ? <iframe id='player' title='Admin Player' type='text/html'
                  src={`http://www.youtube.com/embed/${this.props.performerList[0].video_id}`} frameBorder='0'></iframe> : null}
          <div className='admin-list'>
          {this.props.performerList.map(perf => <div key={perf.id} className='admin-performer current'><span className='admin-performer-name'>{perf.user.name} <button className='admin-next-button' onClick={() => this.markAsPerformed(perf.id)} >></button></span> {perf.song_title} by {perf.song_artist}</div>)[0]}
            {this.props.performerList.map(perf => <div key={perf.id} className='admin-performer'><span className='admin-performer-name'>{perf.user.name}</span> {perf.song_title} by {perf.song_artist}</div>)}
          </div>
        </React.Fragment> : null}

        {this.props.activeEvent ? <React.Fragment>
            <h1>{this.props.activeEvent.title} {this.props.activeEvent.user_id} {this.state.attending ? <button type='button' name='leave' onClick={this.attendButton}>Leave</button> : this.props.activeEvent.user_id !== parseInt(localStorage.getItem('user_id'), 10) ? <button type='button' name='join' onClick={this.attendButton}>Join</button> : null}</h1>
            <p>Location: {this.props.activeEvent.location}</p>
            <p>{this.props.activeEvent.description}</p>
          </React.Fragment> : null}

          {this.state.attending ? <React.Fragment>
            <ul>
              {this.props.performerList.map(perf => <li key={perf.id}>{perf.user.name} Sings {perf.song_artist}'s {perf.song_title}</li>)}
            </ul>
            <SongForm/>
            </React.Fragment> : null}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser,
    activeEvent: state.activeEvent,
    performerList: state.performerList
  };
};

export default connect(mapStateToProps)(Event);