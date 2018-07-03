export const myAction = {
  type: 'LOG_IN',
  payload: {userId: 5}
};

export function setUser(userId) {
  return {
    type: 'USER_ID',
    payload: {userId}
  };
};

export function setUserFake() {
  return {
    type: 'FAKED_USER',
    payload: {user: {id: 1, name: 'THE Shun', username: 'theshun'}}
  };
};

export function logOutUser() {
  return {
    type: 'LOGOUT',
    payload: {user: null}
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

export function selectVideoInForm(video_id, video_url) {
  return {
    type: 'VIDEO_FORM_SELECTION',
    payload: {video_id, video_url}
  };
};

export function addPerformerToList(performer) {
  return {
    type: 'ADD_PERFORMER_TO_LIST',
    payload: {performer}
  }
};