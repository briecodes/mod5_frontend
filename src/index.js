import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/index.css';
import App from './containers/App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  userId: null,
  songList: ['song1', 'song2']
}

const reducer = (state = initialState, action) => {
  if (action.type === 'USER_ID'){
    console.log('logging in..', action.payload.userId);
    return {...state, userId: action.payload.userId}
  }
  return state;
};

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));