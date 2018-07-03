import React from 'react';

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

class YouTubeSearch extends React.Component {

  state = {
    search_term: '',
    video_results: []
  }

  inputControl = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    this.searchYouTube();
  };

  searchYouTube = () => {
    if (this.state.search_term.includes('karaoke')){
      search(this.state.search_term, opts, this.youTubeSearchCallback)
    }else{
      search(this.state.search_term + ' karaoke', opts, this.youTubeSearchCallback)
    };
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

  render() {
    return (
      <React.Fragment>
        <input type='text' name='search_term' value={this.state.search_term} placeholder='Search YouTube' onChange={this.inputControl}/>
        <YouTubeSearchResults results={this.state.video_results} />
      </React.Fragment>
    );
  };
};

export default YouTubeSearch;