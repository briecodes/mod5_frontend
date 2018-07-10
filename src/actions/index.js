export function parseUrl(url) {
  return url.split('/').pop();
};

export function baseURL() {
  return 'http://192.168.5.132:8000/api/v1/'
};

export function HURL(route = '') {
  return 'https://mod5karaoke.herokuapp.com' + route;
};

export function inputControl(e) {
  this.setState({
    [e.target.name]: e.target.value
  });
};

export function loggedInUserId() {
  return parseInt(localStorage.getItem('user_id'), 10);
}