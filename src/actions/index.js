export function parseUrl(url) {
  return url.split('/').pop();
};

export function baseURL() {
  return 'http://192.168.5.132:8000/api/v1/'
};