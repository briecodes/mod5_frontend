import React from 'react';
import { connect } from 'react-redux';

import SongForm from '../components/SongForm';
import { setActiveEvent, setPerformerList } from '../reducers/index';
import { parseUrl, HURL, loggedInUserId, localToken } from '../actions/index';

class Event extends React.Component {

  state = {
    attending: false,
    attending_id: null,
    height: ''
  };

  eventId = parseInt(parseUrl(window.location.pathname), 10);

  componentDidMount() {
    window.addEventListener("resize", function(){
      this.calculateHeight();
    }.bind(this), true);

    this.calculateHeight();
    this.getEventDetails();
    this.getEventPerformerList();
    this.fetchInterval = window.setInterval( () => this.compareList(), 2000);
  };


  componentWillUnmount() {
    clearInterval(this.fetchInterval);
  }

  calculateHeight = () => {
    this.setState({
      height: (window.innerWidth * .7) * 9/16
    });
  };

  eventAttendanceCheck = (arr) => {
    let theResult = arr.find(userEvent => {
      return userEvent.user_id === loggedInUserId();
    });
    theResult = theResult ? true : false;
    this.setState({
      attending: theResult
    });
  };

  getEventDetails = () => {
    fetch(HURL('/api/v1/events/') + this.eventId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
      }
    }).then(response => response.json() )
    .then(eve => {
      this.props.dispatch(setActiveEvent(eve));
      this.eventAttendanceCheck(eve.user_events);
    });
  };

  getEventPerformerList = () => {
    fetch(HURL('/api/v1/song_entries/'), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
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

  i = 0;

  compareList = () => {
    fetch(HURL('/api/v1/song_entries/'), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
      }
    }).then(response => response.json() )
    .then(performerList => {
      const list = []
      performerList.forEach(entry => {
        if (entry.event_id === this.eventId && entry.played === false && entry.passed === false){
          list.push(entry);
        };
      });
      if (list.length !== this.props.performerList.length){
        this.getEventPerformerList();
      }
    });
  };



  getUserEvents = () => {
    fetch(HURL('/api/v1/user_events'), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
      }
    }).then( response => response.json() )
    .then(array => {
      array.find(userEvent => {
        return userEvent.event_id === this.props.activeEvent
      });
    });
  };

  createUserEvent = () => {
    fetch(HURL('/api/v1/user_events'), {
        method: 'POST',
        body: JSON.stringify({user_id: loggedInUserId(), event_id: this.props.activeEvent.id}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localToken()
        }
      })
      .then( res => res.json() )
      .then( response => {
      }).then(() => this.getEventDetails() );
  };

  deleteUserEvent = (id) => {
    fetch(HURL('/api/v1/user_events/') + id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localToken()
        }
    })
    .then( res => res.json() )
    .then( () => this.getEventDetails() );
  };

  attendButton = (e) => {
    if (e.target.name === 'join'){
      this.createUserEvent();
    }else{
      const uev = this.props.activeEvent.user_events.find(userevent => userevent.user_id === loggedInUserId());
      this.deleteUserEvent(uev.id);
    }
  };

  markAsPerformed = (id) => {
    fetch(HURL('/api/v1/song_entries/') + id, {
      method: 'PATCH',
      body: JSON.stringify({played: true}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
      }
    })
      .then( res => res.json() )
      .then( response => {
        this.getEventPerformerList();
      });
  };

  deletePerformer = (id) => {
    fetch(HURL('/api/v1/song_entries/') + id, {
      method: 'PATCH',
      body: JSON.stringify({played: true}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localToken()
      }
    }).then (res => res.json() )
    .then (response => {
      if (response.error || response.errors){
        console.log('error!', response);
      }else{
        this.getEventPerformerList();
      }
    })
  }

  renderPerformerList = () => this.props.performerList.map((perf, index) => {
    return (
      <li key={perf.id} className='user-performer'>
        { perf.user.id === loggedInUserId() ? <span className='heavy red'>{perf.user.name}</span> : <span className='heavy'>{perf.user.name}</span>} up {index > 0 ? ('in ' + index * 3.5 + ' mins') : 'now' } {perf.user.id === loggedInUserId() ? <input type='button' value='Cancel' className='cancel' onClick={() => this.deletePerformer(perf.id)} /> : null}<br />
        performing <em>{perf.song_title}</em> by {perf.song_artist}
      </li>
    )
  });

  render() {
    return (
      <React.Fragment>
        { loggedInUserId() === this.props.activeEvent.user_id ? <React.Fragment>
          <div className='divider spacer'></div>
          {this.props.performerList.length > 0 ? <iframe id='mainPlayer' height={this.state.height} title='Admin Player' type='text/html'
                  src={`http://www.youtube.com/embed/${this.props.performerList[0].video_id}`} frameBorder='0'></iframe> : null}
          <div className='admin-list' style={{height: this.state.height}}>
            {this.props.performerList.map(perf => <div key={perf.id} className='admin-performer current'><span className='admin-performer-name heavy'>{perf.user.name} <button className='admin-next-button' onClick={() => this.markAsPerformed(perf.id)} >></button></span> {perf.song_title} by {perf.song_artist}</div>)[0]}
            {this.props.performerList.slice(1).map(perf => <div key={perf.id} className='admin-performer'><span className='admin-performer-name medium'>{perf.user.name}</span> Performing <em>{perf.song_title}</em> by {perf.song_artist}</div>)}
          </div>
          <div id='mainPlayerDetails'>
            <h3 className='medium float-left'>{this.props.activeEvent.title} {this.props.activeEvent.key_code ? <span className='light'> / Code: {this.props.activeEvent.key_code}</span> : null}</h3>
            <h3 className='light float-right'>Est. wait time: {this.props.performerList.length * 3.5}mins</h3>
          </div>
        </React.Fragment> : null}

          {this.props.activeEvent.title && loggedInUserId() !== this.props.activeEvent.user_id ? <React.Fragment>
              <div className='col-half float-left'>
                <span className='home-text light'>{this.props.activeEvent.title}</span>
              </div>
              <div className='col-half float-right'>
                <p className='match-headline'>
                  <span className='heavy'>Hosted by:</span> {this.props.activeEvent.user.name}<br />
                  <span className='heavy'>Location:</span> {this.props.activeEvent.location}<br />
                  <span className='heavy'>Description:</span> {this.props.activeEvent.description}
                </p>
              </div>
              <div className='divider spacer line-light'></div>
              <div className='divider spacer'></div>
            </React.Fragment> : null}

          {this.state.attending ? <React.Fragment>
            <div className='col-half float-left' style={{maxHeight: '400px', overflowY: 'auto'}}>
              <h3>Songlist:</h3>
              <ul>
                {this.renderPerformerList()}
              </ul>
            </div>
            <div className='col-half float-right mobile-col'>
              <h3>Submit a song:</h3>
              <SongForm/>
            </div>
            </React.Fragment> : null}
            <div className='divider'></div>
            <center>
              {this.state.attending ? <input type='submit' name='leave' value='Leave Event' className='submit leave-event light' onClick={this.attendButton} /> : this.props.activeEvent.user_id !== loggedInUserId() ? <input type='submit' name='join' value='Join Event' className='submit join-event light' onClick={this.attendButton} /> : null}
            </center>
      </React.Fragment>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeEvent: state.activeEvent,
    performerList: state.performerList
  };
};

export default connect(mapStateToProps)(Event);