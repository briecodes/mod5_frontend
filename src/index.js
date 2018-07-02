import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/index.css';
import App from './containers/App';

import { createStore } from 'redux';

const initialState = {
  userId: null,
  songList: ['song1', 'song2']
}

const reducer = (state = initialState, action) => {
  console.log('state', state);
  console.log('action', action);
  
  if (action.type === 'LOG_IN'){
    return {...state, userId: 1}
  }else{
    return state;
  };
};

const store = createStore(reducer);

const myAction = {
  type: 'LOG_IN'
};

store.dispatch(myAction);
console.log('store', store);
console.log('getState', store.getState());

ReactDOM.render(<Router><App /></Router>, document.getElementById('root'));