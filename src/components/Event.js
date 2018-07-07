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
            {this.props.performerList.map(perf => <div key={perf.id} className='admin-performer current'><span className='admin-performer-name heavy'>{perf.user.name} <button className='admin-next-button' onClick={() => this.markAsPerformed(perf.id)} >></button></span> {perf.song_title} by {perf.song_artist}</div>)[0]}
            {this.props.performerList.slice(1).map(perf => <div key={perf.id} className='admin-performer'><span className='admin-performer-name medium'>{perf.user.name}</span> Performing <em>{perf.song_title}</em> by {perf.song_artist}</div>)}
          </div>
          <div id='mainPlayerDetails'>
            <h3 className='medium float-left'>{this.props.activeEvent.title}</h3>
            <h3 className='light float-right'>Est. wait time: {this.props.performerList.length * 3.5}mins</h3>
          </div>
        </React.Fragment> : null}

          {this.props.activeEvent.title ? <React.Fragment>
              <div className='col-half float-left'>
                <h1 className='medium'>{this.props.activeEvent.title} {this.state.attending ? <button type='button' name='leave' onClick={this.attendButton}>Leave</button> : this.props.activeEvent.user_id !== this.localUserId ? <button type='button' name='join' onClick={this.attendButton}>Join</button> : null}</h1>
                <p>
                  <span className='heavy'>Location:</span> {this.props.activeEvent.location}<br />
                  <span className='heavy'>Description:</span> {this.props.activeEvent.description}<br />
                  <span className='heavy'>Hosted by:</span> {this.props.activeEvent.user.name}
                </p>
              </div>
              <div className='divider'></div>
            </React.Fragment> : null}

          {this.state.attending ? <React.Fragment>
            <div className='col-half float-left'>
              <h3>Songlist:</h3>
              <ul>
                {this.props.performerList.map((perf, index) => {
                  return (
                    <li key={perf.id} className='user-performer'>
                      <span className='heavy'>{perf.user.name}</span> up {index > 0 ? ('in ' + index * 3.5 + ' mins') : 'now' }<br />
                      performing <em>{perf.song_title}</em> by {perf.song_artist}
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className='col-half float-right'>
              <h3>Submit a song:</h3>
              <SongForm/>
            </div>
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