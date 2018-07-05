import React from 'react';
import { connect } from 'react-redux';

class EditEvent extends React.Component {
  render() {
    return (
      <h1>Edit Event</h1>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser,
    activeEvent: state.activeEvent
  };
};

export default connect(mapStateToProps)(EditEvent);