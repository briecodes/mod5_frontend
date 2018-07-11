import React from 'react';
import { connect } from 'react-redux';

class EventData extends React.Component {

  render() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeEvent: state.activeEvent
  };
};

export default connect(mapStateToProps)(EventData);