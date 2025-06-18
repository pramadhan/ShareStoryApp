import CONFIG from '../config';

const ENDPOINTS = {
  REGISTER: `${CONFIG.BASE_URL}/register`,
  LOGIN: `${CONFIG.BASE_URL}/login`,
  STORIES: `${CONFIG.BASE_URL}/stories`,
  STORY_DETAIL: (id) => `${CONFIG.BASE_URL}/stories/${id}`,
  POST_STORY: `${CONFIG.BASE_URL}/stories`,
};

// Register user
export async function register({ name, email, password }) {
  const response = await fetch(ENDPOINTS.REGISTER, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
}

// Login user
export async function login({ email, password }) {
  const response = await fetch(ENDPOINTS.LOGIN, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

// Get all stories (with token)
export async function getStories(token) {
  const response = await fetch(ENDPOINTS.STORIES, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

// Get story detail by id (with token)
export async function getStoryDetail(id, token) {
  const response = await fetch(ENDPOINTS.STORY_DETAIL(id), {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.json();
}

// Post new story (with token, multipart/form-data)
export async function postStory({ description, photo, lat, lon }, token) {
  const formData = new FormData();
  formData.append('description', description);
  if (photo) formData.append('photo', photo);
  if (lat) formData.append('lat', lat);
  if (lon) formData.append('lon', lon);
  const response = await fetch(ENDPOINTS.POST_STORY, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  return response.json();
}