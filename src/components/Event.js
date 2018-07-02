import React from 'react';
import { connect } from 'react-redux';

class Event extends React.Component {
  render() {
    return (
      <div>
        {this.props.activeEvent ? <React.Fragment> <h1>{this.props.activeEvent.title}</h1> </React.Fragment> : null}
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser,
    activeEvent: state.activeEvent
  };
};

export default connect(mapStateToProps)(Event);