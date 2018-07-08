import React from 'react';
import { connect } from 'react-redux';

class Octothorps extends React.Component {
  render() {
    return (
      <div>Octothot!!</div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser
  };
};

export default connect(mapStateToProps)(Octothorps);