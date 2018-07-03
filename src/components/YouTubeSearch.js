import React from 'react';

import YouTubeSearchResults from '../components/YouTubeSearchResults';

class YouTubeSearch extends React.Component {
  render() {
    return (
      <React.Fragment>
        <input type='text' placeholder='Search YouTube'/>
        <YouTubeSearchResults/>
      </React.Fragment>
    );
  };
};

export default YouTubeSearch;