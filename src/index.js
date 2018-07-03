import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './assets/index.css';
import App from './containers/App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  userId: null,
  activeUser: null,
  activeEvent: null,
  performerList: [],
  currentLocation: '/'
}

const reducer = (state = initialState, action) => {
  if (action.type === 'USER_ID'){
    console.log('logging in..', action.payload.userId);
    return {...state, userId: action.payload.userId}
  }else if (action.type === 'FAKED_USER'){
    return {...state, activeUser: action.payload.user}
  }else if (action.type === 'ACTIVE_EVENT'){
    return {...state, activeEvent: action.payload.event}
  }else if (action.type === 'LOGOUT'){
    return {...state, activeUser: action.payload.user}
  }else if (action.type === 'SET_LOCATION'){
    // console.log('setting location...', action.payload.currentLocation)
    return {...state, currentLocation: action.payload.currentLocation}
  }
  return state;
};

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));