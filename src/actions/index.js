// GENERAL FUNCTIONS
export function parseUrl(url) {
  return url.split('/').pop();
};

export function baseURL() {
  return 'http://192.168.5.132:8000/api/v1/'
};

export function HURL(route = '') {
  return 'https://mod5karaoke.herokuapp.com' + route;
};

// export function HURL(route = '') {
//   return 'http://localhost:3000/' + route;
// };

export function inputControl(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
};

export function loggedInUserId() {
  return parseInt(localStorage.getItem('user_id'), 10);
};

export function pathEventId() {
  return parseInt(parseUrl(window.location.pathname), 10);
};

export function localToken() {
  return localStorage.getItem('token');
};




// FUNCTIONS FOR STORE

export function setUserId(user_id) {
  return {
    type: 'SET_USER_ID',
    payload: {user_id}
  };
};

export function logOutUser() {
  return {
    type: 'LOGOUT',
    payload: {user_id: null}
  };
};

export function setActiveEvent(event) {
  return {
    type: 'ACTIVE_EVENT',
    payload: {event}
  };
};

export function setAttending(attending) {
  return {
    type: 'SET_ATTENDING',
    payload: {attending}
  };
};

export function resetAttending() {
  return {
    type: 'RESET_ATTENDING',
    payload: {attending: false}
  };
};

export function setCurrentLocation(loc) {
  return {
    type: 'SET_LOCATION',
    payload: {currentLocation: loc}
  }
};

export function setPerformerList(entry) {
  return {
    type: 'LOAD_PERFORMERS',
    payload: {performerList: entry}
  }
};

export function addPerformerToList(performer) {
  return {
    type: 'ADD_PERFORMER_TO_LIST',
    payload: {performer}
  }
};

export function selectVideoInForm(video_id, video_url) {
  return {
    type: 'VIDEO_FORM_SELECTION',
    payload: {video_id, video_url}
  };
};

export function resetVideoInForm() {
  return {
    type: 'RESET_VIDEO_IN_FORM',
  }
};

export function resetStore() {
  return {
    type: 'RESET_STORE'
  };
};

export function resetApp() {
  return {
    type: 'RESET_APP',
    payload: {}
  };
};

export function resetActiveEvent() {
  return {
    type: 'RESET_ACTIVE_EVENT',
    payload: {}
  };
};