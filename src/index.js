import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './assets/index.css';
import App from './containers/App';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

const initialState = {
  user_id: null,
  activeUser: null,
  activeEvent: null,
  performerList: [],
  currentLocation: '/',
  video_url: undefined,
  video_id: undefined,
  token: null
}

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_USER'){
    return {...state, activeUser: action.payload.user}
  }else if (action.type === 'SET_USER_ID'){
    return {...state, user_id: action.payload.user_id}
  }else if (action.type === 'FAKED_USER'){
    return {...state, activeUser: action.payload.user}
  }else if (action.type === 'ACTIVE_EVENT'){
    return {...state, activeEvent: action.payload.event}
  }else if (action.type === 'LOGOUT'){
    return {...state, activeUser: action.payload.user}
  }else if (action.type === 'SET_LOCATION'){
    return {...state, currentLocation: action.payload.currentLocation}
  }else if (action.type === 'VIDEO_FORM_SELECTION'){
    return {...state, video_id: action.payload.video_id, video_url: action.payload.video_url}
  }else if (action.type === 'ADD_PERFORMER_TO_LIST'){
    return {...state, performerList: [...state.performerList, action.payload.performer]}
  }else if (action.type === 'LOAD_PERFORMERS'){
    return {...state, performerList: action.payload.performerList}
  }else if (action.type === 'RESET_STORE'){
    return {...state, performerList: initialState.performerList, video_url: initialState.video_url, video_id: initialState.video_id}
  }else if (action.type === 'RESET_APP'){
    console.log('state:', state);
    console.log('action:', action);
    return { initialState }
  }else if (action.type === 'RESET_ACTIVE_EVENT'){
    return {...state, activeEvent: null}
  }else if (action.type === 'SET_TOKEN'){
    return {...state, token: action.payload.token}
  }
  return state;
};

const store = createStore(reducer);

ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));