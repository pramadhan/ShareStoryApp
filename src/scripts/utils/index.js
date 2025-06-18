import { getToken, removeToken } from './auth';

export function showFormattedDate(date, locale = 'en-US', options = {}) {
  return new Date(date).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  });
}

export function sleep(time = 1000) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

document.addEventListener('DOMContentLoaded', () => {
  updateAuthNav();
  const logoutNav = document.getElementById('logoutNav');
  if (logoutNav) {
    logoutNav.onclick = (e) => {
      e.preventDefault();
      removeToken();
      updateAuthNav();
      window.location.hash = '/login';
    };
  }
});

export function updateAuthNav() {
  const token = getToken();
  const loginNav = document.getElementById('loginNav');
  const registerNav = document.getElementById('registerNav');
  const logoutNav = document.getElementById('logoutNav');
  if (loginNav) loginNav.style.display = token ? 'none' : '';
  if (registerNav) registerNav.style.display = token ? 'none' : '';
  if (logoutNav) logoutNav.style.display = token ? '' : 'none';
}
