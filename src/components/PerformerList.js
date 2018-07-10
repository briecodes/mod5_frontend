import React from 'react';
import { connect } from 'react-redux';

import { loggedInUserId } from '../actions/index';

class PerformerList extends React.Component {
  render() {
    return (
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
    );
  };
};

const mapStateToProps = (state) => {
  return {
    performerList: state.performerList
  };
};

export default connect(mapStateToProps)(PerformerList);