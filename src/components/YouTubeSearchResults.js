import React from 'react';
import { connect } from 'react-redux';

import { selectVideoInForm } from '../reducers/index';

class YouTubeSearchResults extends React.Component {
  state = {
    selectedVideo: ''
  };

  selectVideo = (video_id, video_link) => {
    this.setState({
      selectedVideo: video_id
    });
    this.props.dispatch(selectVideoInForm(video_id, video_link));
  };

  calculateHeight = () => {
    return (window.innerWidth * .37) * 9/16;
  };

  calculateWidth = () => {
    // return window.innerWidth * .37;
    return '100%';
  }

  render() {
    return (
      <div id='video-results'>
        {this.props.results.map(video => 
          <div key={video.id} className='video-result'>
            <iframe id='player' width={this.calculateWidth()} height={this.calculateHeight()} title={video.title} type='text/html' src={`http://www.youtube.com/embed/${video.id}`} frameBorder='0'></iframe>
            <div className='float-left video-detail'>
              {video.title}
              <div className='divider'></div>
              {this.state.selectedVideo === video.id ? <input id={video.id} type='button' className='active' value='Selected' onClick={()=> this.selectVideo(video.id, video.link) } /> : <input id={video.id} type='button' value='Select Video' onClick={()=> this.selectVideo(video.id, video.link) } />}
            </div>
            <div className='divider'></div>
          </div>
        )
        }
      </div>
    );
  };
};

export default connect()(YouTubeSearchResults);