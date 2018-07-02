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