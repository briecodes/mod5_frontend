import React from 'react';
import { connect } from 'react-redux';

import { selectVideoInForm } from '../reducers/index';

class YouTubeSearchResults extends React.Component {

  render() {
    return (
      <div id='video-results'>
        {this.props.results.map(video => 
          <div key={video.id} className='video-result'>
            <iframe id='player' title={video.title} type='text/html' src={`http://www.youtube.com/embed/${video.id}`} frameBorder='0'></iframe>
            {video.title} <button type='button' onClick={()=> this.props.dispatch(selectVideoInForm(video.id, video.link)) } >Choose Video</button>
          </div>
        )
        }
      </div>
    );
  };
};

export default connect()(YouTubeSearchResults);