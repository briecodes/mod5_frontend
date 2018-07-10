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
};

export function localToken() {
  return localStorage.getItem('token');
};

export function fetchSomething(path) {
  console.log('fetching...');
  fetch(HURL(path), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localToken()
    }
  }).then( response => response.json() )
  .then( response => {
    if (response.error || response.errors){
      console.log('Error!', response);
      return response;
    }else{
      console.log('returning', response);
      if(response){
        return response;
      }
    }
  })
};