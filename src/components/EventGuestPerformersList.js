import React from 'react';
import { connect } from 'react-redux';

import { loggedInUserId, HURL, localToken, setPerformerList, pathEventId } from '../actions/index';

class EventGuestPerformersList extends React.Component {


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
      <div className='col-half float-left' style={{maxHeight: '400px', overflowY: 'auto'}}>
        <h3>Songlist:</h3>
        {this.props.performerList.length > 0 ? <React.Fragment>
          <ul>
            {this.props.performerList.map((perf, index) => {
              return (
                <li key={perf.id} className='user-performer'>
                  { perf.user.id === loggedInUserId() ? <span className='heavy red'>{perf.user.name}</span> : <span className='heavy'>{perf.user.name}</span>} up {index > 0 ? ('in ' + index * 3.5 + ' mins') : 'now' } {perf.user.id === loggedInUserId() ? <input type='button' value='Cancel' className='cancel' onClick={() => this.deletePerformer(perf.id)} /> : null}<br />
                  performing <em>{perf.song_title}</em> by {perf.song_artist}
                </li>
              )
              })
            }
          </ul>
        </React.Fragment> : <p>Be the first to sign up!</p> }
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    performerList: state.performerList
  };
};

export default connect(mapStateToProps)(EventGuestPerformersList);