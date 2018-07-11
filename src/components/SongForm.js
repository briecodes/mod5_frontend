import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { HURL, addPerformerToList, selectVideoInForm  } from '../actions/index';
// import YouTubeSearch from '../components/YouTubeSearch';

// YOUTUBE SEARCH API
import API_KEY from '../api';
import YouTubeSearchResults from '../components/YouTubeSearchResults';
const search = require('youtube-search');
const opts = {
  maxResults: 10,
  key: API_KEY,
  type: 'video',
  videoEmbeddable: true
};

class SongForm extends React.Component {

  state = {
    song_title: '',
    song_artist: '',
    user_id: parseInt(localStorage.getItem('user_id'), 10),
    event_id: this.props.activeEvent.id,
    video_results: []
  };

  inputControl = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.searchCheck();
  };

  runSearch = _.debounce(() => this.searchYouTube(), 100);

  searchCheck = () => {
    if (this.state.song_title && this.state.song_artist){
      this.runSearch();
    }
  };

  resetForm = () => {
    this.setState({
      song_title: '',
      song_artist: '',
      video_results: []
    });
    this.props.dispatch(selectVideoInForm('', ''))
  };

  searchYouTube = () => {
    search('karaoke ' + this.state.song_title + this.state.song_artist, opts, this.youTubeSearchCallback)
  };

  youTubeSearchCallback = (err, results) => {
    let arr = []
    if(err) return console.log(err);
    results.forEach(item =>{
        arr.push(item);
    });
    this.setState({
      video_results: arr
    });
  };

  submitEntry = (e) => {
    e.preventDefault();
    e.persist();
    if (this.validateData()){
      fetch(HURL('/api/v1/song_entries'), {
        method: 'POST',
        body: JSON.stringify({...this.state, video_id: this.props.video_id, video_url: this.props.video_url}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        }
    })
      .then( res => res.json() )
      .then( response => {
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
      <div className='col-half float-right mobile-col'>
        <h3>Submit a song:</h3>
        <form onSubmit={this.submitEntry} className='boxed'>
          <input type='text' className='songInput' name='song_artist' placeholder='Song Artist' value={this.state.song_artist} onChange={this.inputControl} />
          <input type='text' className='songInput' name='song_title' placeholder='Song Title' value={this.state.song_title} onChange={this.inputControl} />
          <div className='divider'></div>
          {this.state.video_results.length > 0 ? <YouTubeSearchResults results={this.state.video_results} /> : null}
          <div className='divider'></div>
          <center>
            {this.props.video_id ? <input type='submit' className='submit'/> : null }
          </center>
        </form>
      </div>
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