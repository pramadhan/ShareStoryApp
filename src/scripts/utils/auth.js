// Helper untuk token auth di localStorage
export function saveToken(token) {
  localStorage.setItem('dicoding_story_token', token);
}

export function getToken() {
  return localStorage.getItem('dicoding_story_token');
}

export function removeToken() {
  localStorage.removeItem('dicoding_story_token');
}
