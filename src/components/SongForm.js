import React from 'react';
import { connect } from 'react-redux';

import YouTubeSearch from '../components/YouTubeSearch';

class SongForm extends React.Component {

  state = {
    song_title: '',
    song_artist: '',
    video_url: '',
    video_id: '',
    user_id: this.props.activeUser.id,
    event_id: this.props.activeEvent.id
  };

  inputControl = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <form>
        <input type='text' name='song_title' placeholder='Song Title' value={this.state.song_title} onChange={this.inputControl} />
        <input type='text' name='song_artist' placeholder='Song Artist' value={this.state.song_artist} onChange={this.inputControl} />
        <YouTubeSearch/>
        <input type='submit'/>
      </form>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    activeUser: state.activeUser,
    activeEvent: state.activeEvent
  };
};

export default connect(mapStateToProps)(SongForm);