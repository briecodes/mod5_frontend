import React from 'react';
import { connect } from 'react-redux';

import { selectVideoInForm } from '../reducers/index';

class YouTubeSearchResults extends React.Component {
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
            <div className='float-left'>
              {video.title} <input type='button' value='Choose Video' onClick={()=> this.props.dispatch(selectVideoInForm(video.id, video.link)) } / >
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