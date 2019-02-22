export function authenticate(jwt) {
  if (jwt.error) {
    return jwt;
  }
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('jwt', JSON.stringify(jwt));
    return { authstatus: 'success' };
  }
}

export function isAuthenticated() {
  if (typeof window == 'undefined') return false;
  if (sessionStorage.getItem('jwt'))
    return JSON.parse(sessionStorage.getItem('jwt'));
  else return false;
}

export function signout() {
  if (typeof window !== 'undefined') sessionStorage.removeItem('jwt');
  //signout().then(data => {
  //  document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  //});
}
