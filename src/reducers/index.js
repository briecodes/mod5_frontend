export function setUserId(user_id) {
  return {
    type: 'SET_USER_ID',
    payload: {user_id}
  };
};

export function setToken(token) {
  return {
    type: 'SET_TOKEN',
    payload: {token}
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