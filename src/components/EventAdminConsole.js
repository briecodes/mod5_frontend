import React from 'react';
import { connect } from 'react-redux';

import EventPlaceholder from '../components/EventPlaceholder';
import { HURL, localToken, pathEventId, setPerformerList } from '../actions/index';

class EventAdminConsole extends React.Component {
  state = {
    height: ''
  };

  componentDidMount() {
    window.addEventListener("resize", function(){
      this.calculateHeight();
    }.bind(this), true);
    
    this.calculateHeight();
  };

  calculateHeight = () => {
    this.setState({
      height: (window.innerWidth * .7) * 9/16
    });
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
        if (entry.event_id === pathEventId() && entry.played === false && entry.passed === false){
          list.push(entry);
        };
      });
      this.props.dispatch(setPerformerList(list));
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className='divider spacer'></div>
        {this.props.performerList.length > 0 ? <React.Fragment>
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
        </React.Fragment> : <EventPlaceholder/> }
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

export default connect(mapStateToProps)(EventAdminConsole);