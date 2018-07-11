import React from 'react';
import { connect } from 'react-redux';

class EventMainVideo extends React.Component {
  state = {
    height: ''
  };
  
  componentDidMount() {
    this.calculateHeight();
  };

  calculateHeight = () => {
    this.setState({
      height: (window.innerWidth * .7) * 9/16
    });
  };

  render() {
    return (
      <iframe id='mainPlayer' height={this.state.height} title='Admin Player' type='text/html' src={`http://www.youtube.com/embed/${this.props.performerList[0].video_id}`} frameBorder='0'></iframe>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeEvent: state.activeEvent
  };
};

export default connect(mapStateToProps)(EventMainVideo);