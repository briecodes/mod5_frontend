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

export function setActiveEvent(event) {
  return {
    type: 'ACTIVE_EVENT',
    payload: {event}
  };
};