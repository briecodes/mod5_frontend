import React from 'react';
import { connect } from 'react-redux';

import { loggedInUserId } from '../actions/index';

class EventGuestPerformersList extends React.Component {

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