import React from 'react';
import { connect } from 'react-redux';

class EventPlaceholder extends React.Component {

  render() {
    return (
      <React.Fragment>
        <img src='/assets/party.jpg' className='placeholder-image' alt='Waiting for song entries...' />
        <h3 className='medium float-left'>{this.props.activeEvent.title} {this.props.activeEvent.key_code ? <span className='light'> / Code: {this.props.activeEvent.key_code}</span> : null}</h3>
        <h3 className='light float-right'>Est. wait time: {this.props.performerList.length * 3.5}mins</h3>
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

export default connect(mapStateToProps)(EventPlaceholder);