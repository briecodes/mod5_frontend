import React from 'react';
import { connect } from 'react-redux';

import { addPerformerToList } from '../actions/index';
import YouTubeSearch from '../components/YouTubeSearch';

class SongForm extends React.Component {

  state = {
    song_title: '',
    song_artist: '',
    user_id: this.props.activeUser.id,
    event_id: this.props.activeEvent.id
  };

  inputControl = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  resetForm = () => {
    console.log('resetting form');
    this.setState({
      song_title: '',
      song_artist: ''
    });
    console.log('state:', this.state);
  };

  submitEntry = (e) => {
    e.preventDefault();
    e.persist();
    if (this.validateData()){
      fetch('http://localhost:3000/api/v1/song_entries', {
        method: 'POST',
        body: JSON.stringify({...this.state, video_id: this.props.video_id, video_url: this.props.video_url}),
        headers: {'Content-Type': 'application/json'}
    })
      .then( res => res.json() )
      .then( response => {
        // console.log('success:', response);
        this.resetForm();
        e.target.reset();
        this.props.dispatch(addPerformerToList(response));
      });
    }else{
      alert('Form incomplete!');
    }
  };

  validateData = () => {
    if (this.state.song_title !== '' & this.state.song_artist !== '' & this.props.video_id !== undefined & this.props.video_url !== undefined){
      return true;
    }else{
      return false;
    }
  };

  render() {
    return (
      <form onSubmit={this.submitEntry}>
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
    activeEvent: state.activeEvent,
    video_id: state.video_id,
    video_url: state.video_url
  };
};

export default connect(mapStateToProps)(SongForm);