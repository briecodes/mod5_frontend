import React from 'react';
import { connect } from 'react-redux';

class Octothorps extends React.Component {
  render() {
    return (
      <div id='thots' style={{height: window.innerHeight * .75}}>
        <div id='fast'></div>
        <div id='prez'></div>
        <span className='with-love light'>
          with love, for the #octothots.
        </span>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser
  };
};

export default connect(mapStateToProps)(Octothorps);